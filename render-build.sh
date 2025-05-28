#!/bin/bash
# Install Java 17
sudo apt-get update
sudo apt-get install -y openjdk-17-jdk

# Verify Java installation
java -version
javac -version

# Set Java home
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

# Run Maven build
cd backend
chmod +x mvnw
./mvnw clean package -DskipTests