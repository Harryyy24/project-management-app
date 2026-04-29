# ===============================
# STAGE 1: BUILD
# ===============================
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests


# ===============================
# STAGE 2: RUN
# ===============================
FROM eclipse-temurin:17-jre

WORKDIR /app
COPY --from=build /app/target/project-management-app-0.0.1-SNAPSHOT.jar app.jar

# Expose port (for clarity)
EXPOSE 8080

# Start app (ONLY THIS — clean)
CMD ["sh", "-c", "java -jar app.jar --server.port=${PORT}"]
