FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/project-management-app-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080

# Add a script to fix the database URL format
RUN echo '#!/bin/sh\n\
if [ -n "$DATABASE_URL" ]; then\n\
  # Convert postgresql:// URL to jdbc:postgresql:// URL\n\
  JDBC_DATABASE_URL=$(echo $DATABASE_URL | sed "s|^postgresql://|jdbc:postgresql://|")\n\
fi\n\
exec java -jar app.jar --spring.profiles.active=prod --spring.datasource.url="$JDBC_DATABASE_URL" --spring.datasource.username="$POSTGRES_USER" --spring.datasource.password="$POSTGRES_PASSWORD" --spring.datasource.driver-class-name=org.postgresql.Driver --spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect --spring.jpa.hibernate.ddl-auto=update' > /app/start.sh

RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]
