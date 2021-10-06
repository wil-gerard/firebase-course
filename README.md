# 3 - Interacting With Firestore

This tutorial is based on the **React and Firebase Starter💞** that we created. You can read more about it in its [readme](https://github.com/codebusters-ca/react-firebase-starter#react--firebase-starter).

## Prerequisites 

In the [first](https://github.com/codebusters-ca/firebase-course/tree/01-project-setup#1---setting-up-a-react-and-firebase-project) tutorial, we set up a brand new React and Firebase app, initialized a local Firebase directory with Emulators, and connected it to a Firebase project. You should have all of that working to use this branch's code.

## Use

Check this branch out with `git checkout 03-create-read-update`.

Install new dependencies with `cd firebase-course && npm install`.

Start Firebase Emulators with `npm run emulators`.

Then open a new terminal and start the app in development mode with `npm start`. It should open in your browser at [http://localhost:3000/](http://localhost:3000/).

Sign into the app using the `Sign In` button. Since we are using the Authentication Emulator, you will have mock Google accounts available to you for testing purposes. The Firestore security rules in this branch will only allow authenticated users to interact with the database.

Inside, you will find a home page and `/my-list` page. The latter is the place from which our app interacts with the database. Use it to create, update and delete Firestore documents and see the data from your Firestore displayed there.

## What's Next?

Next tutorial is coming soon!

## Contribute

We ❤️ feedback and help from fellow devs! Check out [open issues](https://github.com/codebusters-ca/react-firebase-starter/issues), create a [new one](https://github.com/codebusters-ca/react-firebase-starter/issues/new?labels=bug), or send us a [pull request](https://github.com/codebusters-ca/react-firebase-starter/compare).

## Licence

This project is licensed under the [MIT license](https://github.com/codebusters-ca/firebase-course/blob/main/LICENSE).
