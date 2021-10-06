import React from 'react';
import { Helmet } from 'react-helmet';

import { useUser } from '../components/user-context';
import Form from '../components/Form';
import List from '../components/List';

const MyList = () => {
  const { user } = useUser();

  return (
    <>
      <Helmet>
        <title>My List - React & Firebase Starter</title>
        <meta name="description" content="This is a default page from React & Firebase Starter. Change this content by editing MyList.js." />
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <main>
        {user ? (
          <>
            <List />
            <Form />
          </>
        ) : (
          <div className="bg-white shadow rounded-lg w-11/12 sm:w-6/12 mx-auto my-4 z-10">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                ⚠️ You need to sign in to view this page
              </h3>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default MyList;
