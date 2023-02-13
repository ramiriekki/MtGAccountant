# MtG Accountant

## About
Originally made as a research project for school and further continued as my thesis work. <br>
The project itself is a web-application that works as an accountant service for Magic the Gathering-card series. The main motivation for the project was that the existing apps that do the same thing didn't have all the functionality that I wanted/needed or they had a lot of unnecessary functionalities. This app is supposed to focus on collector point of view.<br><br>
Current version has all the basic functionalities working.  
## Example views
### Profile

![single card view](/images/dashboard.png)
### Home & dialog

![login view](/images/dialog.png)

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
Navigate to client folder and install npm dependencies
``` bash
cd ~/client
npm install
```
Run the client
``` bash
ng serve
```
Client uses the Angulars default port: 4200

### <ins>Server</ins>
Navigate to server folder
``` bash
cd ~/server
```

Create a <code>.env</code> file on projects root level and add following properties:

```
MAIL_USER=[user]
MAIL_PASSWORD=[email password]

MONGO_USERNAME=[MongoDB username]
MONGO_PASSWORD=[MongoDB password]
MONGO_CLUSTER=[MongoDB cluster]
```