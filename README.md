# MtG Accountant

## About
Originally made as a research project for school and further continued as my thesis work. <br>
The project itself is a web-application that works as an accountant service for Magic the Gathering-card series. The main motivation for the project was that the existing apps that do the same thing didn't have all the functionality that I wanted/needed or they had a lot of unnecessary functionalities. This app is supposed to focus on collector point of view.
## Example views
### Home & dialog

![login view](/images/register.png)

### Collection

![my-collection view](/images/collection.png)


### Sets list

![sets view](/images/sets.png)

### Set

![set cards view](/images/set.png)

### Single card view

![single card view](/images/single_card.png)

### Search & results
Search:
![single card view](/images/search.png)
Results:
![single card view](/images/results.png)

### Profile
![single card view](/images/profile.png)

## Setting up the environment
### <ins>Client</ins>
<b>Node 19.5.0</b>

Navigate to client folder and install npm dependencies
``` bash
cd ~/client
npm install -g @angular/cli
npm install
```
Run the client
``` bash
ng serve
```
Client uses the Angulars default port: 4200

### <ins>Server</ins>
<b>Uses Java 17</b>

Navigate to server folder
``` bash
cd ~/server
```

Create a <code>.env</code> file on projects root level and add following properties:

```bash
MAIL_USER=[user]
MAIL_PASSWORD=[email password]

MONGO_USERNAME=[MongoDB username]
MONGO_PASSWORD=
MONGO_CLUSTER=[MongoDB cluster]
DATABASE_NAME=[Name of the database]
```

Create <code>application.properties</code> file under <code>src/main</code> and add following lines:

```bash
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=${env.MAIL_USER}
spring.mail.password==${env.MAIL_PASSWORD}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

spring.data.mongodb.uri=mongodb+srv://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@${env.MONGO_CLUSTER}.ie0p3lh.mongodb.net/?retryWrites=true&w=majority
spring.data.mongodb.database=${env.DATABASE_NAME}
```

To run the application, run command <code>mvn spring-boot:run</code> on server root.