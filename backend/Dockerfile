FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/project-management-app-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080

# Use environment variables to override Spring Boot properties at runtime
CMD ["java", "-jar", "app.jar", \
     "--spring.profiles.active=prod", \
     "--spring.datasource.url=${JDBC_DATABASE_URL}", \
     "--spring.datasource.username=${JDBC_DATABASE_USERNAME}", \
     "--spring.datasource.password=${JDBC_DATABASE_PASSWORD}", \
     "--spring.datasource.driver-class-name=org.postgresql.Driver", \
     "--spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect", \
     "--spring.jpa.hibernate.ddl-auto=update"]
