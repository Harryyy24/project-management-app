FROM maven:3.8.6-openjdk-17-slim

WORKDIR /app

# Copy the project files
COPY . .

# Build the application
RUN mvn clean package -DskipTests

# Show the contents of target directory for debugging
RUN ls -la target/

# Set the startup command
EXPOSE 8080
CMD ["java", "-jar", "target/project-management-app-0.0.1-SNAPSHOT.jar", "--spring.profiles.active=prod"]
