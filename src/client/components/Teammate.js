import React from 'react';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { USERS } from '../../firebase/index';
import firebase from '../../firebase/clientApp';
import TodoList from './TodoList';
import Card from './Card';

const Teammate = ({ uid, teamId }) => {
  const db = firebase.firestore();

  const [teammate, loading, error] = useDocumentDataOnce(
    db.collection(USERS).doc(uid),
  );

  if (!loading && error) console.error(error);

  return (
    <>
      {teammate && (
        <li key={teammate}>
          <Card>
            <div className="pb-5 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {teammate.displayName}
              </h3>
            </div>
            <TodoList
              uid={uid}
              teamId={teamId}
            />
          </Card>
        </li>
      )}
    </>
  );
};

export default Teammate;
