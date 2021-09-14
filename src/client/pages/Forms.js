import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { useCollection } from 'react-firebase-hooks/firestore';
import {
  ANIMALS,
  createAnimal,
  updateAnimal,
} from '../../firebase';
import firebase from '../../firebase/clientApp';

import Form from '../components/Form';

const Forms = () => {
  // Fetching data from Firestore
  const db = firebase.firestore();
  const [value, loading, error] = useCollection(
    db.collection(ANIMALS)
      .where('animal', '!=', false), // Exclude documents where the field 'animal' does not exist
    { snapshotListenOptions: { includeMetadataChanges: true } },
  );

  if (error) console.error(new Error(JSON.stringify(error)));

  // Change the UI when the value is updated in Firestore
  const [created, setCreated] = useState(false);

  useEffect(() => {
    if (value) {
      const createdStatus = value.docs.length > 0;
      setCreated(createdStatus);
    } else {
      setCreated(false);
    }
  }, [value]);

  // Invoke different API functions based on state
  const handleData = (animal) => {
    if (!created) return createAnimal(animal);

    return updateAnimal(
      value.docs[0].data().id,
      animal,
    );
  };

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
            {value && value.docs.length > 0 && (
              <>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Your favourite animal is:
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  {value.docs.map((doc) => (
                    <p key={doc.data().id}>{doc.data().animal}</p>
                  ))}
                  {value.docs.length > 1 && (
                    <div className="rounded-md bg-yellow-50 p-4">
                      <h3 className="text-sm font-medium text-yellow-800">This looks suspicious</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          If you see more than one animal here,
                          document creation did not go as planned
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            {value && !value.docs.length && (
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
          handleData={handleData}
          text={{
            h3: 'What is your favourite animal?',
            p: 'Enter its name to create a document in Firestore',
            button: 'Create',
          }}
          disabled={created || loading || error}
        />
        <Form
          handleData={handleData}
          text={{
            h3: 'Changed your mind?',
            p: 'Enter a different animal to update a document in Firestore',
            button: 'Update',
          }}
          disabled={!created || loading || error}
        />
      </main>
    </>
  );
};

export default Forms;
