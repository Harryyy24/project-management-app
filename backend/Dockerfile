FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src

# Create a custom application-prod.properties file
RUN mkdir -p src/main/resources
RUN echo 'spring.datasource.driver-class-name=org.postgresql.Driver' > src/main/resources/application-prod.properties
RUN echo 'spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect' >> src/main/resources/application-prod.properties
RUN echo 'spring.jpa.hibernate.ddl-auto=update' >> src/main/resources/application-prod.properties
RUN echo 'spring.jpa.show-sql=false' >> src/main/resources/application-prod.properties
RUN echo 'server.port=${PORT:8080}' >> src/main/resources/application-prod.properties

# Build the application
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/project-management-app-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080

# Create startup script
RUN echo '#!/bin/bash\n\
# Extract database connection info from DATABASE_URL\n\
if [ -n "$DATABASE_URL" ]; then\n\
  # Parse the URL\n\
  REGEX="postgresql://([^:]+):([^@]+)@([^:]+):([^/]+)/(.*)"\n\
  if [[ $DATABASE_URL =~ $REGEX ]]; then\n\
    DB_USER="${BASH_REMATCH[1]}"\n\
    DB_PASS="${BASH_REMATCH[2]}"\n\
    DB_HOST="${BASH_REMATCH[3]}"\n\
    DB_PORT="${BASH_REMATCH[4]}"\n\
    DB_NAME="${BASH_REMATCH[5]}"\n\
    # Build the JDBC URL\n\
    JDBC_URL="jdbc:postgresql://$DB_HOST:$DB_PORT/$DB_NAME"\n\
    echo "Connecting to: $JDBC_URL"\n\
    # Run the application with the parsed connection details\n\
    exec java -jar app.jar --spring.profiles.active=prod \\\n\
              --spring.datasource.url=$JDBC_URL \\\n\
              --spring.datasource.username=$DB_USER \\\n\
              --spring.datasource.password=$DB_PASS\n\
  else\n\
    echo "Invalid DATABASE_URL format"\n\
    exit 1\n\
  fi\n\
else\n\
  echo "DATABASE_URL not set"\n\
  exec java -jar app.jar --spring.profiles.active=prod\n\
fi' > /app/start.sh

RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]
