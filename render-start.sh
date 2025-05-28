#!/bin/bash
# Set Java home and path
export JAVA_HOME=/usr/lib/jvm/temurin-17-jdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

# Start the application
java -jar backend/target/*.jar