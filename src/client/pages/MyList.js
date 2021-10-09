import React from 'react';
import { Helmet } from 'react-helmet';

import { useUser } from '../components/user-context';
import Form from '../components/Form';
import List from '../components/List';
import Card from '../components/Card';

const MyList = () => {
  const { user, teamId } = useUser();

  return (
    <>
      <Helmet>
        <title>My List - React & Firebase Starter</title>
        <meta name="description" content="This is a default page from React & Firebase Starter. Change this content by editing MyList.js." />
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <main>
        <Card>
          <h1 className="text-2xl leading-6 font-medium text-gray-900">
            Your to-do list
          </h1>
        </Card>

        <Card>
          <List
            uid={user.uid}
            teamId={teamId}
          />
        </Card>

        <Form />

      </main>
    </>
  );
};

export default MyList;
