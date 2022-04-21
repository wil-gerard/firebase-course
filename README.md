# Setting up a React And Firebase Project

## Prerequisites

You will need to have the following installed to use this course: 

* [Node](https://nodejs.org/en/)
* [Java DK](https://docs.oracle.com/en/java/javase/16/install/overview-jdk-installation.html#GUID-8677A77F-231A-40F7-98B9-1FD0B48C346A)
* [Firebase CLI](https://github.com/firebase/firebase-tools)

## Setup Guide

### Setting Up React

Clone this repo:
```git clone https://github.com/codebusters-ca/firebase-course.git```

Checkout this branch:
```git checkout 01-project-setup```

Install the dependencies:
```cd .\firebase-course\ && npm ci```

Do the same in the `/functions` folder to use Firebase cloud functions:
```cd functions && npm ci```

At this point, the client side should work. You can launch it with:
```cd .. && npm start``` 

### Setting Up Firebase

You may have noticed that data isn't yet being fetched from Firebase. We need to connect our code to Firebase to make it work.

> In this course, we will be using a demo Firebase project. If you want to know how to connect a real project, see [React and Firebase Starter docs](https://github.com/codebusters-ca/react-firebase-starter#react--firebase-starter).

In your code editor, leave the client app running and open a new terminal. Log into Firebase CLI:
```cd .\firebase-course\ && firebase login```

Start connecting your Firebase project: ```firebase init```

To choose the features we will be using, choose the following answers when prompted by the CLI:

```
* ? Which Firebase features do you want to set up for this directory?
  Firestore
  Functions
  Emulators

* First, let's associate this project directory with a Firebase project.
? Please select an option:
  Don't set up a default project
  
* ? What file should be used for Firestore Rules? firestore.rules
? File firestore.rules already exists. Do you want to overwrite it with the Firestore Rules from the Firebase Console? No

? What file should be used for Firestore indexes? firestore.indexes.json
? File firestore.indexes.json already exists. Do you want to overwrite it with the Firestore Indexes from the Firebase Console? No

? File functions/package.json already exists. Overwrite? No

? Which Firebase emulators do you want to set up?
  Authentication Emulator
  Functions Emulator
  Firestore Emulator
```

Now that we've initialized the local Firebase directory, we can start using the demo project. Run Firebase Emulators with `npm run emulators` at the root directory. 
If your client app is still running, you will see `Hello from Firestore Emulator` appear there.

Congratulations! The setup process is now complete.

## Contribute

🚧 This tutorial is a work in progress 🚧 We ❤️ feedback and help from fellow devs! If you found a bug, create an [issue](https://github.com/codebusters-ca/firebase-course/issues/new?labels=bug) or send us a [pull request](https://github.com/codebusters-ca/firebase-course/compare).

## Licence

This project is licensed under the [MIT license](https://github.com/codebusters-ca/firebase-course/blob/main/LICENSE).
