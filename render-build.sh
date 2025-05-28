#!/bin/bash
# Set execute permissions
chmod +x backend/mvnw

# Set Java home (for Render)
export JAVA_HOME=/usr/lib/jvm/temurin-17-jdk-amd64

# Run the Maven build
cd backend && ./mvnw clean package