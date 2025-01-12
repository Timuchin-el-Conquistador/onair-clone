// useVisibility.ts
import { useState, useEffect, useRef } from "react";

export const useVisibility = (
  reset: () => void,
  error: null | Error,
  loading: boolean,
  message: null | string
) => {
  const [isDangerAlertVisible, setDangerAlertVisibility] = useState(false);
  const [isSuccessAlertVisible, setSuccessAlertVisibility] = useState(false);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const isFirstRender = useRef(true); // Declare useRef outside the useEffect

  useEffect(() => {
    // Skip the effect on the first render
    if (isFirstRender.current && reset != null) {
      isFirstRender.current = false;
      reset(); // Call reset function on mount
      return;
    }
    const targetElement = document.getElementById("spinner");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // Avoid redundant state updates
    if (
      (isDangerAlertVisible && error != null) ||
      (!isDangerAlertVisible && error == null)
    ) {
      return;
    }

    // Update state based on error
    setDangerAlertVisibility(error != null);
  }, [error, loading]); // Include all dependencies

  useEffect(() => {
    // Skip the effect on the first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      reset(); // Call reset function on mount
      return;
    }

    const targetElement = document.getElementById("spinner");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // Update state based on error
    setSuccessAlertVisibility(message != null);
  }, [message, loading]); // Include all dependencies

  return {
    isDangerAlertVisible,
    setDangerAlertVisibility,
    isPasswordVisible,
    setPasswordVisibility,
    isSuccessAlertVisible,
    setSuccessAlertVisibility,
  };
};
