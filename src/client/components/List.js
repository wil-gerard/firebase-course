import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { TODOS } from '../../firebase';
import firebase from '../../firebase/clientApp';
import { useUser } from './user-context';
import Todo from './Todo';

const text = {
  loading: {
    h3: 'Just a sec',
    p: 'Loading data from Firebase...',
  },
  error: {
    h3: 'Oops',
    p: 'Can\'t fetch the data. Open the console to see details',
  },
  noItems: {
    h3: 'Enter the data below',
    p: 'to save it to Firestore and see it appear here',
  },
  items: {
    h3: 'Your to-do list:',
  },
};

const List = () => {
  const { user } = useUser();
  const db = firebase.firestore();

  const [items, loading, error] = useCollection(
    db.collection(TODOS).where('createdBy', '==', user.uid),
    { snapshotListenOptions: true },
  );

  return (
    <div className="bg-white shadow rounded-lg w-11/12 sm:w-6/12 mx-auto my-4 z-10">
      <div className="px-4 py-5 sm:p-6">

        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {loading && text.loading.h3}
          {error && text.error.h3}
          {items && !items.docs.length && text.noItems.h3}
          {items && items.docs.length > 0 && text.items.h3}
        </h3>

        <div className="mt-2 max-w-xl text-sm text-gray-500">
          {loading && <p>{text.loading.p}</p>}
          {error && <p>{text.error.p}</p>}
          {items && !items.docs.length && <p>{text.noItems.p}</p>}
          {items && items.docs.length > 0 && (
            <form>
              {items.docs.map((item) => (
                <Todo key={item.data().id} item={item.data()} />
              ))}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
