# ChatApp
## Table of Contents
1. Introduction
2. Demonstration Images
3. Dependencies
4. Setup and User Guide
5. Contributors

***

# 1. Introduction

In this project we created web client chat.
The web site allows the client to send texts messages to multiply contacts.

***

# 2. Demonstration Images
### Login page:
![login](https://user-images.githubusercontent.com/92301625/170509560-acbbfc56-74f8-457e-bb8c-e320d867b747.png)
***
### Register page:
![Register](https://user-images.githubusercontent.com/92301625/170510048-f8706586-cd96-4af9-bb89-d51e4ccc4673.png)
***
### Openning chat page:
![Openingchatspage](https://user-images.githubusercontent.com/92301625/170509926-3d645fb0-dece-473f-b06b-617b89dbe857.png)
***
### Specific chat conversion:
![specificchat](https://user-images.githubusercontent.com/92301625/170509943-50ea727c-e67d-4801-94a7-2420ea833b6f.png)

***

# 3. Dependencies

This site uses:
* React
* React router
* Bootstrap
* microsoft/signalr

***

# 4. Setup and User Guide
## 4.1 Setup

* Download Node.js : `https://nodejs.org/en/` which includes NPM package manager for Node.js.
* Clone the repo: 
  ```bash
  git clone https://github.com/NoamGini/web_client_resumption.git
  ```
* **Important note:** With the approval of the teaching staff, **please add the letter "s" at the end of the word "invitation"** <br />
 in the `.\app2\src\ChatPage\ChatPage.js` file in line `64` when calling the invitations server operation. <br />
 The call to the path in line `64` should look like this:
 ![image](https://user-images.githubusercontent.com/92301625/175650090-b155fe10-e61e-49ff-934c-7c9e38eac6da.png)
* Install the requied dependencies by using: 
   ```bash
   npm install
   ```
    ```bash
   npm i @microsoft/signalr
   ```
* Run the site by using: 
  ```bash
  npm start
  ```
* Open `http://localhost:3000/` with a browser
* Open also the Web-Api server project in the repository: [Web-Api Server](https://github.com/noaziv55/web_development) <br/>
  and run it as well.
* Open also the Rating-Page ASP.net project in the repository: [Rating-Page](https://github.com/noaziv55/web_rating_page) <br/>
  and run it as well.
* In Case you want to change the domain of `Web-Api Server` go to `Domain\Domain.js` file and change the server and port values.
* In Case you want to change the domain of the `rating page` go to `LoginPage\LoginPage.js` file and change the domain part only.

## 4.2 User Guide

### How to enter the chat:
* To enter with a new user please click on the registration link below the fields.
* After you register:
  *  Click on the login link below.
  *  Fill again the required fileds to log in.

### How to use the chat:
* To add new chat:
  * Click on the message icon on the top left of the side bar chat.
  * Enter a contact by filling the required fields: the contact username, contect nickname and his server address.
* Sending messages: click on the "type a message" bar, write your text and press enter.

***

# 5. Contributors

* [Noam Gini](https://github.com/NoamGini)
* [Noa Ziv](https://github.com/noaziv55)

***
