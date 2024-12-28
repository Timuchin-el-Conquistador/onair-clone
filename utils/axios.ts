import axios from "axios";
export function handleAxiosError(error: any): Error {
  // Check if the error is an AxiosError
  if (axios.isAxiosError(error)) {
    // Handle errors with a response

    if (error.response) {
      // Server responded with a status code outside the 2xx range
      const status = error.response.status;
      const message =
        error.response.data?.message || "An error occurred during the request.";

      console.error(`Server Error: Status ${status}, Message: ${message}`, {
        responseData: error.response.data,
        headers: error.response.headers,
      });

      return new Error(message); // Wrap the message in an Error object
    }

    // Handle errors without a response (e.g., network issues)
    if (error.request) {
      console.error("Server Error: No response received from server.", {
        requestDetails: error.request,
      });
      return new Error(
        "No response from server. Please check your internet connection."
      );
    }

    // Handle other axios-related errors
    console.error("Server Error: Axios internal error.", {
      message: error.message,
      stack: error.stack,
    });

    return new Error(error.message);
  }

  // Handle non-Axios errors
  console.error("Server Error: Unexpected error.", {
    errorDetails: error,
  });
  return new Error("An unexpected error occurred.");
}
