FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

COPY . .

RUN mvn -pl appointment-service clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY appointment-service/target/*.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]