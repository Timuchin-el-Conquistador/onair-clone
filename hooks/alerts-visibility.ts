
import { useState, useEffect, useRef } from "react";

export const useVisibility = (
  reset: () => void,
  error: null | Error,
  loading: boolean,
  success: null | string
) => {
  const [isDangerAlertVisible, setDangerAlertVisibility] = useState(false);
  const [isSuccessAlertVisible, setSuccessAlertVisibility] = useState(false);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  //const isFirstRender = useRef(true); // Declare useRef outside the useEffect

  useEffect(() => {
    setDangerAlertVisibility(error != null);
    
    if (error != null) {
      setTimeout(() => {
        reset();
      }, 3000);
    }
  }, [error, loading]); // Include all dependencies

  useEffect(() => {
    setSuccessAlertVisibility(success != null);

    if (success != null) {
      setTimeout(() => {
        reset();
      }, 3000);
    }
  }, [success, loading]); // Include all dependencies

  return {
    isDangerAlertVisible,
    setDangerAlertVisibility,
    isPasswordVisible,
    setPasswordVisibility,
    isSuccessAlertVisible,
    setSuccessAlertVisibility,
  };
};
