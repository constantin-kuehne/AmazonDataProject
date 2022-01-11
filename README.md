# README #

## This is a university project ##

HDBW Munich 2021/22 - Big Data, Digital Technology & Data Visualization

### What is this project for ###

This project is about dealing with complex and big data, visualize them with D3 or other visualization tools 
and display them in a webapp built in an react environment. 

### How do I get set up? ###

* Run npm install
* Run npm audit fix --force
* Run "npm run start" -> Starts the webapp on your localhost. 
* This app is designed to run on a linux server environment and is able to handle various requests through eclipse APIs to our online database.
* The access is limited and not public domain.

### How to run in docker ###

* Build docker image:
``docker build . -t adp:release``

* Build docker image for linux/amd64:
``docker buildx build --platform linux/amd64 . -t adp:linux``

* Run docker image:
``docker run --volume ${PWD}/backend/.env:/server/.env --rm -dp 3000:3000 adp:release``

please make sure to specify the right path to the .env file after the volume flag

### Contribution guidelines ###

* Elastic, APIs, Data-Stuff, Dashboard Data -> Constantin Kühne
* D3 & Data Visualization-Stuff, Dashboard Design -> Valentin Kieslinger
* React App Development, Design, D3 implementing -> Tim Muscholl

### Who do I talk to? ###

* constantin.kuehne@student.hdbw-hochschule.de
* valentin.kieslinger@student.hdbw-hochschule.de
* tim.muscholl@student.hdbw-hochschule.de
* HDBW Munich
