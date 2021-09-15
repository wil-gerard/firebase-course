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
import DataCard from '../components/DataCard';

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
        <DataCard
          value={value}
          loading={loading}
          error={error}
        />
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
