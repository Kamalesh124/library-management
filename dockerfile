# Build stage
FROM maven:3.8.4-openjdk-17 as build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the built jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Environment variable for the port (allows override from platform)
ENV PORT=9090

# Expose the port
EXPOSE ${PORT}

# Command to run the application
CMD ["sh", "-c", "java -jar app.jar --server.port=${PORT}"]