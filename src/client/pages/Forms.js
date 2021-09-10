import React from 'react';
import { Helmet } from 'react-helmet';

import { useCollection } from 'react-firebase-hooks/firestore';
import {
  TEST_DOCUMENTS,
  createAnimal,
  updateAnimal,
} from '../../firebase';
import firebase from '../../firebase/clientApp';

import Form from '../components/Form';

const Forms = () => {
  // Fetching data from Firestore
  const db = firebase.firestore();
  const [value, loading, error] = useCollection(
    db.collection(TEST_DOCUMENTS).where('animal', '!=', false), // Exclude documents where the field 'animal' does not exist
    { snapshotListenOptions: { includeMetadataChanges: true } },
  );

  if (error) console.error(new Error(JSON.stringify(error)));

  return (
    <>
      <Helmet>
        <title>Form - React & Firebase Starter</title>
        <meta name="description" content="This is a default page from React & Firebase Starter. Change this content by editing App.js." />
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <main>
        <div className="bg-white shadow rounded-lg w-11/12 sm:w-6/12 mx-auto my-4 z-10">
          <div className="px-4 py-5 sm:p-6">
            {loading && (
              <>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Just a sec
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Loading data from Firebase...</p>
                </div>
              </>
            )}
            {error && (
              <>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Oops
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Can&apos;t fetch the data. Open the console to see details</p>
                </div>
              </>
            )}
            {value && value.length && (
              <>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Your favourite animal is:
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  {value.forEach((animal) => <p>{animal}</p>)}
                  {value.length > 1 && (
                    <p>If you see more than one animal here, document creation did not go as planned</p>
                  )}
                </div>
              </>
            )}
            {value && !value.length && (
              <>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Enter the data below
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>to save it to Firestore and see it appear here</p>
                </div>
              </>
            )}
          </div>
        </div>

        <Form
          handleData={createAnimal}
          text={{
            h3: 'What is your favourite animal?',
            p: 'Enter its name to create a document in Firestore',
            button: 'Create',
          }}
          disabled={false}
        />
        <Form
          handleData={updateAnimal}
          text={{
            h3: 'Changed your mind?',
            p: 'Enter a different animal to update a document in Firestore',
            button: 'Update',
          }}
          disabled
        />
      </main>
    </>
  );
};

export default Forms;
