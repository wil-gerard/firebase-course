# 2 - Interacting With Firestore and Testing

This tutorial is based on a React and Firebase Starter that we created. You can read more about it in its [readme](https://github.com/codebusters-ca/react-firebase-starter#react--firebase-starter).

## Prerequisites 

In the [first](https://github.com/codebusters-ca/firebase-course/tree/01-project-setup#1---setting-up-a-react-and-firebase-project) and [second](https://github.com/codebusters-ca/firebase-course/tree/02-firebase-configs) tutorials, we set up a brand new React and Firebase app, initialized a local Firebase directory with Emulators, connected it to a Firebase project, and put our app config in the local `.env` file. You need to have all of that working in order to use this branch's code.

## Use

Check this branch out with `git checkout 03-create-read-update`.

Install new dependencies with `cd firebase-course && npm install`.

Start Firebase Emulators with `npm run emulators`.

Then open a new terminal and start the app in development mode with `npm start`. It will open in your browser at [http://localhost:3000/](http://localhost:3000/).

Sign into the app using the `Sign In` button. Since we are using the Authentication Emulator, you will have mock Google accounts available to you for testing purposes. The Firestore security rules in this app will only allow authenticated users to interact with the database.

Inside, you will find a home page and `/forms` page. Forms are the place from which the client interacts with the database. Use it to create and update a Firestore document and see the data from your Firestore displayed there. 

> If you run into errors while creating or updating documents (like `Cannot read properties of null (reading 'uid')...` or `"permission-denied"`), make sure you have signed into the app.

## What's Next?

Move on to the next tutorial with `git checkout 03-test` and follow instructions in its Readme to start interacting with Firestore and testing your app.

## Contribute

We ❤️ feedback and help from fellow devs! Check out [open issues](https://github.com/codebusters-ca/react-firebase-starter/issues), create a [new one](https://github.com/codebusters-ca/react-firebase-starter/issues/new?labels=bug), or send us a [pull request](https://github.com/codebusters-ca/react-firebase-starter/compare).

## Licence

This project is licensed under the [MIT license](https://github.com/codebusters-ca/firebase-course/blob/main/LICENSE).
