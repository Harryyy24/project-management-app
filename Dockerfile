# Use OpenJDK 17 as the base image
FROM maven:3.8.6-jdk-17 AS build

# Set working directory
WORKDIR /app

# Copy only the files needed for the build
COPY pom.xml .
COPY mvnw .
COPY .mvn/ .mvn/
COPY src ./src

# Build the application
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# Use a smaller base image for the final container
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port your app runs on
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]