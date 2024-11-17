import React from 'react';
import { Audio } from 'react-loader-spinner';
import { usePromiseTracker } from 'react-promise-tracker';

const LoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000000',
          opacity: 0.7,
          zIndex: 1000,
        }}
      >
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    )
  );
};

export default LoadingIndicator;
