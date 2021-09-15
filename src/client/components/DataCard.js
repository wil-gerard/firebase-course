import React from 'react';

const DataCard = ({ value, loading, error }) => {
  const text = {
    loading: {
      h3: 'Just a sec',
      p: 'Loading data from Firebase...',
    },
    error: {
      h3: 'Oops',
      p: 'Can\'t fetch the data. Open the console to see details',
    },
    noValue: {
      h3: 'Enter the data below',
      p: 'to save it to Firestore and see it appear here',
    },
    oneValue: {
      h3: 'Your favourite animal is:',
    },
    manyValues: {
      h3: 'This looks suspicious',
      p: 'If you see more than one animal here, document creation did not go as planned',
    },
  };

  return (
    <div className="bg-white shadow rounded-lg w-11/12 sm:w-6/12 mx-auto my-4 z-10">
      <div className="px-4 py-5 sm:p-6">

        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {loading && text.loading.h3}
          {error && text.error.h3}
          {value && !value.docs.length && text.noValue.h3}
          {value && value.docs.length > 0 && text.oneValue.h3}
        </h3>

        <div className="mt-2 max-w-xl text-sm text-gray-500">
          {loading && <p>{text.loading.p}</p>}
          {error && <p>{text.error.p}</p>}
          {value && !value.docs.length && <p>{text.noValue.p}</p>}
          {value && value.docs.length > 0 && (
            <>
              {value.docs.map((doc) => (
                <p key={doc.data().id}>{doc.data().animal}</p>
              ))}

              {value.docs.length > 1 && (
                <div className="rounded-md bg-yellow-50 p-4">
                  <h3 className="text-sm font-medium text-yellow-800">
                    {text.manyValues.h3}
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>{text.manyValues.p}</p>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default DataCard;
