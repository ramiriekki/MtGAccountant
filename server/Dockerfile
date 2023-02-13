# Base image
FROM openjdk:17-oracle as build
# Make folder to put our files in
# RUN mkdir -p /usr/src/mtgacc
# RUN mkdir -p /usr/src/mtgacc/server
# Set working directory so that all subsequent command runs in this folder
WORKDIR /mtgacc/server

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src
RUN chmod +x mvnw

RUN ./mvnw install -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

FROM openjdk:17-oracle
VOLUME /tmp
ARG DEPENDENCY=/mtgacc/server/target/dependency
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /server/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /server
ENTRYPOINT ["java","-cp","server:server/lib/*","com.github.mtgaccountant.server.ServerApplication"]
