# Capstone Weather App Frontend
## Table of contents
- [About (start here)](#about)
- [Overview](#overview)
- [Technologies](#technologies)
- [Requirements](#requirements)
- [Documentation](#documentation)
  - [Sitemap](#sitemap)   
  - [Logical Diagram](#logical-diagram)
  - [Physical Diagram](#physical-diagram)
  - [User Interface](#user-interface)

## About

This is the frontend repository of my Weather app project that is interconnected with another repository [The Frontend](https://github.com/Oneshot369/play-springboot-api). This was for my capstone project for my senior year at GCU, so please explore it and enjoy :). 

---

## Overview

This is the frontend so all documentation will be related to the frontend. If you want to see the complete documentation for the front and backend, I suggest you visit my [project design document](https://1drv.ms/w/c/0f720a2bdf7ca902/Ect8zp6QuXVAjUKLloeDHOAB5pt0DCs30U6u0vzoaCLVQw?e=in1t7l) which holds the entirety of my documentation. This project is complete and I have no outstanding issues. 

This project is coded using VUE.js and is purely a frontend application. Meaning there is no business logic handled here (besides simple input form validation). All of its api calls go through the backend, and the backend handles the business logic. 

---

### Running the project

To run this project, just make a fork and in the terminal use the command `npm run start` this starts the application in dev mode and runs it locally on your computer. You MUST be running the backend for this application to run properly. If you have not set the backend up yet, then you will need to start there first. 

In your .env and .env.dev folders you will need to point the `VITE_SPRING_API_URL` to your own backend url or the requests won't work. 

---

## Technologies

These technologies are only for the frontend project, for the backend technologies please visit the backend repository. 

| Name   | Justification | 
|--------|---------------|
| Visual Studio Code (1.94.0v) | Visual Studio Code is an IDE used for the development of both front and backend technologies.  |
| Vue (3.4.29v) | This is the frontend framework that will utilize JavaScript.   |
| Node (18.17.1v) | This will be the Java runtime environment we will be using for development. |
| Node Package Manager (10.1.0) | This is the package manager we will be using in the frontend. |
| AWS Amplify (Vue.js, Branch main) | We switched from Elastic beanstalk to Amplify because this service is designed for Vue, and it automatically handles CI/CD for us. |


---

## Requirements
For this project I outlined 99 user stories for the requirements. As of 4/14/2025 they are all completed with 181.5 work hours recorded to achieve all of them. For the entire list of them please visit the following document:

[Sprint backlog](https://1drv.ms/x/c/0f720a2bdf7ca902/EWoqQukujrhBr4GsGu1vBuUBKRZgiGI2Cv-mG9eX-f13pQ?e=XyQx0b)

---

## Documentation
As previously stated the [project design document](https://1drv.ms/w/c/0f720a2bdf7ca902/Ect8zp6QuXVAjUKLloeDHOAB5pt0DCs30U6u0vzoaCLVQw?e=in1t7l) has all of my documentation so I suggest viewing this if you want a complete overview. But in this section I will outline some notable sections of my documentation for the frontend.

### Sitemap
![sitemap image](https://github.com/Oneshot369/play-springboot-api/blob/main/Share%20pics/sitemap.drawio.png?raw=true)
The following is a sitemap design to show how each page will “flow” (or route) to each other page. As you can see the Nav bar in orange will be visible at all times for every page. Now there are three different forms the navbar can take depending on the state of the user. The states a user can be is anonymous, logged in, logged in with admin privileges.

### Logical Diagram
![Logical diagram image](https://github.com/Oneshot369/play-springboot-api/blob/main/Share%20pics/logical.drawio.png?raw=true)
The logical solution design is meant to be our high-level view of how our software will use each other. We use an N-layered design with four layers: Presentation, Business logic, Data Access, and Data source. We have two separate apps: the frontend with Vue and the backend with springboot. While they are both in the presentation layer the Vue app is our primary presentation layer with springboot’s presentation layer just REST controllers that will be accessed by the Vue app. In our springboot app, we will have an MVC design pattern with model, views (JSON), and controllers. The Views will be what our Vue app consumes to get data from our springboot app.

### Physical Diagram
![Physical diagram image](https://github.com/Oneshot369/play-springboot-api/blob/main/Share%20pics/Physical.drawio.png?raw=true)
The Physical solution Design is for our hosting architecture we have three items we need to host a database, our API, and our frontend. We are using AWS for our hosting and CI/CD needs. For the database we will be using the Amazon RDS, the API will be hosted on Elastic Beanstalk, and finally, the frontend will be hosted in AWS Amplify. As for our CI/CD needs, AWS Amplify automatically handles this for us, and for the API we are using CodeBuild with a .yml file to build our code and CodePipeline is for managing the deployment. 

### User Interface

For our frontend, we are using the Vue.js framework. Vue is a component-based framework. In the wireframe document, each component is outlined in green dotted lines and has the component's name next to it. To view more information about any components, simply find the component with the matching name in the component document. In said component document we list the values passed from the parent to the child components called props. We also document the calls the child component passes up to the parent component, called emitters. And finally, any global variables, called Veux. Also, in the component document, we show any calls this component will make and the API response we will expect. To view more information about each response, view the UML document and find the corresponding model name.

#### Wireframes
![wireframe image](https://github.com/user-attachments/assets/8e167de0-d8d6-4490-a51d-846c0f2d2680)
This image holds the wireframe to every single page in our frontend, to view this image in more detail access it [HERE](https://github.com/Oneshot369/play-springboot-api/blob/main/Share%20pics/Wireframes.drawio.png)

#### Component design
![component image](https://github.com/Oneshot369/play-springboot-api/blob/main/Share%20pics/components.drawio.png?raw=true)
This is the component design referenced in the wireframe to view this image in more detail access it [HERE](https://github.com/Oneshot369/play-springboot-api/blob/main/Share%20pics/components.drawio.png)

## Backend
To explore how this application interacts with its backend counterpart, view the backend repository [HERE](https://github.com/Oneshot369/play-springboot-api). 

[Back to top](#table-of-contents)



