FROM maven:3.8.3-openjdk-17 AS build
WORKDIR /home/app

COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 \
    mvn dependency:go-offline -B

COPY src ./src
RUN --mount=type=cache,target=/root/.m2 \
    mvn clean package -DskipTests -B

FROM eclipse-temurin:17-jre-alpine
WORKDIR /application

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=build /home/app/target/*.jar app.jar

USER appuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD wget -qO- http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", \
    "-XX:MaxRAMPercentage=75.0", \
    "-XX:+UseContainerSupport", \
    "-jar", "app.jar"]
