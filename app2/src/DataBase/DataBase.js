import Avatar1 from './Avatar1.jpeg'
import Avatar2 from './Avatar2.jpeg'
import Avatar3 from './Avatar3.jpeg'
import Avatar4 from './Avatar4.jpeg'
import Avatar5 from './Avatar5.jpeg'
import Avatar6 from './Avatar6.jpeg'

export const userDataBase = new Map([["Admin", { username: "Admin", nickname: "Admin", password: "12345678", image: Avatar6 }],
["Noa", { username: "Noa", nickname: "Noa", password: "12345678", image: Avatar1 }],
["Noam", { username: "Noam", nickname: "Noam", password: "12345678", image: Avatar2 }],
["Mor", { username: "Mor", nickname: "Mor", password: "12345678", image: Avatar3 }],
["Dani", { username: "Dani", nickname: "Dani", password: "12345678", image: Avatar4 }],
["Shai", { username: "Shai", nickname: "Shai", password: "12345678", image: Avatar5 }]]);

export const adminChats = [{ username: "Noa", messages: [{ message: "hello!", type: "text", from: "Me", time: new Date() },
{ message: "https://media2.giphy.com/media/3ogwFGEHrVxusDbDjO/giphy.gif", type: "image", from: "Noa", time: new Date() }] },
{ username: "Noam", messages: [{ message: "hi", type: "text", from: "Noam", time: new Date() },
{ message: "hi", type: "text", from: "Me", time: new Date() },
{ message: "what's up?", type: "text", from: "Noam", time: new Date() },
{ message: "https://thumbs.gfycat.com/CleverUniqueGalapagostortoise-size_restricted.gif", type: "image", from: "Me", time: new Date() }] }];

export const contactsDataBase = new Map([["Admin", { username1: "Admin", chats: adminChats }]]);

export function addToContactsDataBase(username) {
    let userChats = [];
    contactsDataBase.set(username, { username1: username, chats: userChats });
}

export function getUserNickname(username) {
    return userDataBase.get(username).nickname;
}

export function getUserImage(username) {
    return userDataBase.get(username).image;
}

/*function that add new message to the current chat*/
export function addNewMessage(newMessage, loggedInUser, contactUsername, messageTime) {
    let messageToSend = { message: newMessage[0], type: newMessage[1], from: "Me", time: messageTime }
    let currentChats = contactsDataBase.get(loggedInUser).chats;

    for (let i = 0; i < currentChats.length; i++) {
        if (currentChats[i].username === contactUsername) {
            contactsDataBase.get(loggedInUser).chats[i].messages.push(messageToSend);
            return contactsDataBase.get(loggedInUser).chats;
        }
    }
}

/*funtion that creates a chat between two users*/
export function addChat(username2, currentChats) {
    if (currentChats !== undefined) {
        for (let i = 0; i < currentChats.length; i++) {
            if (currentChats[i].username === username2) {
                alert("you already have a chat with this contact");
                return currentChats;

            }
        }
    }
    currentChats.push({ username: username2, messages: [] });
    return currentChats;
}

export function addUserToData(username, nickname, password, image) {
    userDataBase.set(username, { username, nickname, password, image });
}

export function getUser(username) {
    return userDataBase.get(username);
}

export function validateUser(username, password) {
    if (userDataBase.has(username)) {
        return userDataBase.get(username).password === password;
    }
    return false;
}



