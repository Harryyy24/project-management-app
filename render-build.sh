
#!/bin/bash
# Set execute permissions
chmod +x backend/mvnw

# Run the Maven build
cd backend && ./mvnw clean package