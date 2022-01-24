# README #

## This is a university project ##

HDBW Munich 2021/22 - Big Data, Digital Technology & Data Visualization

### What is this project for ###

This project is about dealing with complex and big data through an elastic database, visualize them with D3 or other visualization tools 
and display them in a webapp built in a react environment. 

### How do I get set up? ###

Install the frontend:

* Run ``cd frontend``
* Run ``npm install``
* Run ``npm audit fix --force``
* Run ``npm run start`` -> Starts the webapp on your localhost. 

Install the backend:

* Run ``cd backend``
* Run ``npm install``
* Run ``npm audit fix --force``
* Run ``npm run start`` -> Starts the backend.

This app is designed to run on a linux server environment and is able to handle various requests through elastic APIs to our online database.
The access is limited and not public domain.

### How to run in docker ###

* Build docker image:
``docker build . -t adp:release``

* Build docker image for linux/amd64:
``docker buildx build --platform linux/amd64 . -t adp:linux``

* Run docker image:
``docker run --volume ${PWD}/backend/.env:/server/.env --rm -dp 3000:3000 adp:release``

please make sure to specify the right path to the .env file after the volume flag

### Contribution & Team ###

* Elastic, APIs, Data-Stuff, Dashboard Data -> Constantin Kuehne
* D3 & Data Visualization-Stuff, Dashboard Design -> Valentin Kieslinger
* React App Development, Design, Components -> Tim Muscholl

### Who do I talk to? ###

* constantin.kuehne@student.hdbw-hochschule.de
* valentin.kieslinger@student.hdbw-hochschule.de
* tim.muscholl@student.hdbw-hochschule.de
* HDBW Munich

### There is more documentation about this project!

* Web App

dd a comment to this line
You'll find this documents in the "Further Documentation" directory.
