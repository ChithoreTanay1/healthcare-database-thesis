FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

COPY . .

RUN mvn -pl api-gateway clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY api-gateway/target/*.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]