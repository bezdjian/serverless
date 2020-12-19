import React from "react";
import Loader from "react-loader-spinner";
import {usePromiseTracker} from "react-promise-tracker";

const LoadingIndicator = () => {
  const {promiseInProgress} = usePromiseTracker();

  return (
    promiseInProgress && (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000",
          opacity: 0.7,
          zIndex: 1000,
        }}
      >
        <Loader type="Audio" color="#2BAD60" width={100} height={100} />
      </div>
    )
  );
};

export default LoadingIndicator;
