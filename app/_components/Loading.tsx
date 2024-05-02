// app/components/LoadingAnimation.tsx
import React from "react";
import classes from "../styles/loading.module.css";

const LoadingAnimation = () => {
  return (
    <div className={classes.loadingAnimation}>
      <div className={classes.spinner}></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingAnimation;
