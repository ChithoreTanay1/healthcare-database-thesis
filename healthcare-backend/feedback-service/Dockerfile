FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .
COPY eureka-server/pom.xml eureka-server/
COPY api-gateway/pom.xml api-gateway/
COPY auth-service/pom.xml auth-service/
COPY appointment-service/pom.xml appointment-service/
COPY feedback-service/pom.xml feedback-service/
COPY analytics-service/pom.xml analytics-service/
COPY notification-service/pom.xml notification-service/
COPY patient-service/pom.xml patient-service/

COPY feedback-service/src feedback-service/src

RUN mvn -pl feedback-service -am clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/feedback-service/target/*.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]