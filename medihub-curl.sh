#!/bin/bash
# MediHub API Test Commands
# Run from Git Bash inside healthcare-backend directory

# ── 1. Login & grab token ─────────────────────────────────────────────────────
TOKEN=$(curl -s -X POST http://localhost:9080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin2@hospital.com","password":"password123"}' \
  | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)
echo "TOKEN: $TOKEN"

# ── 2. Patients ───────────────────────────────────────────────────────────────
curl -X POST http://localhost:9080/api/patients \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"John Doe","age":45,"email":"john@example.com","phone":"555-1234","lastVisit":"2026-06-01","condition":"Hypertension","department":"Cardiology"}'

curl -X POST http://localhost:9080/api/patients \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Jane Smith","age":34,"email":"jane@example.com","phone":"555-5678","lastVisit":"2026-06-10","condition":"Diabetes","department":"Endocrinology"}'

curl http://localhost:9080/api/patients \
  -H "Authorization: Bearer $TOKEN"

# ── 3. Appointments ───────────────────────────────────────────────────────────
curl -X POST http://localhost:9080/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"patient":"John Doe","doctor":"Dr. Sarah Chen","date":"2026-07-01","time":"10:00 AM","type":"Consultation","status":"CONFIRMED"}'

curl -X POST http://localhost:9080/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"patient":"Jane Smith","doctor":"Dr. James Wilson","date":"2026-07-02","time":"2:30 PM","type":"Follow-up","status":"PENDING"}'

curl http://localhost:9080/api/appointments \
  -H "Authorization: Bearer $TOKEN"

# ── 4. Feedback ───────────────────────────────────────────────────────────────
curl -X POST http://localhost:9080/api/feedback \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"category":"Company Culture","content":"Great workplace!","status":"NEW"}'

curl -X POST http://localhost:9080/api/feedback \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"category":"Team Leader","content":"Leadership is very supportive","status":"NEW"}'

curl -X POST http://localhost:9080/api/feedback \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"category":"Benefits","content":"Health insurance is very competitive","status":"NEW"}'

curl http://localhost:9080/api/feedback \
  -H "Authorization: Bearer $TOKEN"

# ── 5. Analytics - Team Pulse ─────────────────────────────────────────────────
curl -X POST http://localhost:9080/api/analytics/team-pulse \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"team":"Cardiology","overall":8.5,"collaboration":9.0,"communication":8.0,"development":8.5,"impact":9.0,"innovation":7.5,"inclusivity":8.0,"workBalance":8.5}'

curl -X POST http://localhost:9080/api/analytics/team-pulse \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"team":"Endocrinology","overall":7.8,"collaboration":8.0,"communication":7.5,"development":8.0,"impact":7.5,"innovation":8.0,"inclusivity":7.5,"workBalance":8.0}'

curl http://localhost:9080/api/analytics/team-pulse \
  -H "Authorization: Bearer $TOKEN"

# ── 6. Analytics - Goals ──────────────────────────────────────────────────────
curl -X POST http://localhost:9080/api/analytics/goals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"team":"Cardiology","title":"Reduce wait times by 20%","status":"ACTIVE","progress":65}'

curl -X POST http://localhost:9080/api/analytics/goals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"team":"Endocrinology","title":"Implement diabetes protocol","status":"ACTIVE","progress":45}'

curl -X POST http://localhost:9080/api/analytics/goals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"team":"Cardiology","title":"Improve patient satisfaction scores","status":"ACTIVE","progress":80}'

curl http://localhost:9080/api/analytics/goals \
  -H "Authorization: Bearer $TOKEN"
