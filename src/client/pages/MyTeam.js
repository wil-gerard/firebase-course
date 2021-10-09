import React from 'react';
import { Helmet } from 'react-helmet';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { TEAMS } from '../../firebase/index';
import firebase from '../../firebase/clientApp';

import LoadingError from '../components/LoadingError';
import Teammate from '../components/Teammate';
import { useUser } from '../components/user-context';
import Card from '../components/Card';

const MyTeam = () => {
  const { user, teamId } = useUser();

  const db = firebase.firestore();

  const [teamDoc, loading, error] = useDocumentData(
    db.collection(TEAMS).doc(teamId),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  return (
    <>
      <Helmet>
        <title>My Team - React & Firebase Starter</title>
        <meta name="description" content="This is a default page from React & Firebase Starter. Change this content by editing Team.js." />
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <main>
        <Card>
          <h1 className="text-2xl leading-6 font-medium text-gray-900">
            Here is what your team is up to
          </h1>
        </Card>

        <LoadingError
          data={teamDoc}
          loading={loading}
          error={error}
        >
          {!teamDoc ? (
            <Card>
              <p className="mt-2 max-w-xl text-sm text-gray-700">
                You haven&apos;t been added to any teams yet
              </p>
            </Card>
          ) : (
            <ul className="pb-8">

              {teamDoc.users.map((teammate) => {
                if (teammate === user.uid) return null;
                return (
                  <Teammate
                    key={`teammate-${teammate}`}
                    uid={teammate}
                    teamId={teamId}
                  />
                );
              })}

            </ul>
          )}
        </LoadingError>
      </main>
    </>
  );
};

export default MyTeam;
