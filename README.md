# MtG Accountant

## About
Originally made as a research project for school and further continued as my thesis work. <br>
The project itself is a web-application that works as an accountant service for Magic the Gathering-card series. The main motivation for the project was that the existing apps that do the same thing didn't have all the functionality that I wanted/needed or they had a lot of unnecessary functionalities. This app is supposed to focus on collector point of view.
<br><br>
Made with Angular 14 and Spring Boot 3.
<br><br>
Now works as a playground to test and learn new technologies and further study Angular and Spring Boot. 
<br><br>

## Example views
### Home & dialog (28.06.23)

![login view](/images/register.png)

### Collection (28.06.23)

![my-collection view](/images/collection.png)


### Sets list (28.06.23)

![sets view](/images/sets.png)

### Set

![set cards view](/images/set.png)

### Single card view

![single card view](/images/single_card.png)

### Search & results
Search:  (28.06.23)
![single card view](/images/search.png)
Results:
![single card view](/images/results.png)

### Profile
![single card view](/images/profile.png)

<br><br>
## Legacy views
![login](/images/MtGAcc_login.png)
![collection](/images/MtGAcc_mycollection.png)
![search](/images/MtGAcc_search.png)
![results](/images/MtGAcc_searchresults.png)
![set](/images/MtGAcc_sets_cards.png)
![sets](/images/MtGAcc_sets.png)
![single](/images/MtGAcc_singlecard.png)

<br><br>
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
<br><br>
### <ins>Server</ins>
<b>Java 17</b>

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

To populate the database:
1. first navigate to file ***/server/src/main/java/com/github/mtgaccountant/server/ScheduledTasks.java***
2. Modify @Scheduled annotation on lines ***49*** and ***95*** to: 
```bash
@Scheduled(cron = "0/30 * * * * *")
```
3. Run the server application
4. Change the annotations back to original

To run the application, run command <code>mvn spring-boot:run</code> on server root.