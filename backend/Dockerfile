# ----------- STAGE 1: Build the app using Maven -----------
FROM maven:3.9.4-eclipse-temurin-17 AS build

# Set working directory in builder container
WORKDIR /app

# Copy project files
COPY backend .

# Build the JAR file (skip tests to speed up)
RUN mvn clean package -DskipTests


# ----------- STAGE 2: Run the built JAR -----------
FROM eclipse-temurin:21-jdk-alpine

# Set working directory in final container
WORKDIR /app

# Copy only the built JAR from the previous stage
COPY --from=build /app/target/*.jar app.jar

# Expose port (Render will inject PORT env variable)
EXPOSE 8080

# Run the app using injected or fallback port
CMD ["sh", "-c", "java -Dserver.port=${PORT:-8080} -jar app.jar"]
d