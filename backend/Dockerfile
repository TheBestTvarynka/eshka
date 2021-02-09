FROM openjdk:14.0.2-jdk-oracle

COPY target/eshka-0.0.1-SNAPSHOT-spring-boot.jar app.jar

EXPOSE 443
ENTRYPOINT ["java", "-jar", "/app.jar"]
