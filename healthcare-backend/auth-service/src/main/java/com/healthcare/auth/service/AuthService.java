package com.healthcare.auth.service;

import com.healthcare.auth.dto.*;
import com.healthcare.auth.model.User;
import com.healthcare.auth.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RedisTemplate<String, String> redisTemplate;

    @Value("${jwt.secret}")
    private String jwtSecret;

    private static final long ACCESS_EXPIRY = 1000 * 60 * 60;       // 1 hour
    private static final long REFRESH_EXPIRY = 1000 * 60 * 60 * 24 * 7; // 7 days

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, RedisTemplate<String, String> redisTemplate) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.redisTemplate = redisTemplate;
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String accessToken = generateToken(user, ACCESS_EXPIRY);
        String refreshToken = generateToken(user, REFRESH_EXPIRY);

        redisTemplate.opsForValue().set(
                "refresh:" + user.getId(), refreshToken, 7, TimeUnit.DAYS
        );

        return new AuthResponse(accessToken, refreshToken, user.getRole().name());
    }

    public AuthResponse register(RegisterRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setRole(User.Role.valueOf(request.getRole().toUpperCase()));
        userRepository.save(user);

        String accessToken = generateToken(user, ACCESS_EXPIRY);
        String refreshToken = generateToken(user, REFRESH_EXPIRY);

        return new AuthResponse(accessToken, refreshToken, user.getRole().name());
    }

    public void logout(String token) {
        redisTemplate.opsForValue().set(
                "blacklist:" + token, "true", ACCESS_EXPIRY, TimeUnit.MILLISECONDS
        );
    }

    private String generateToken(User user, long expiry) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole().name());
        claims.put("name", user.getName());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiry))
                .signWith(SignatureAlgorithm.HS256, jwtSecret.getBytes())
                .compact();
    }
}
