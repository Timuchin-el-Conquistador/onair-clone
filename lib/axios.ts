import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class FakeBackend {
  private static instance: FakeBackend | null = null;

  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  }

  // Singleton getter to ensure only one instance
  public static getInstance(baseURL: string): FakeBackend {
    if (!FakeBackend.instance) {
      FakeBackend.instance = new FakeBackend(baseURL);
    }
    return FakeBackend.instance;
  }

  //public getAxiosInstance(): AxiosInstance {
  //   return this.axiosInstance;
  // }

  // Generic GET request method
  async get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(
        url,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleAxiosError(error);
    }
  }

  // Generic POST request method
  async post<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleAxiosError(error);
    }
  }

  // Generic PUT request method
  async put<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleAxiosError(error);
    }
  }
  // Generic PUT request method
  async patch<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleAxiosError(error);
    }
  }
  // Generic DELETE request method
  async delete<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(
        url,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleAxiosError(error);
    }
  }
  private handleAxiosError(error: any): Error {
    // Check if the error is an AxiosError
    if (axios.isAxiosError(error)) {
      // Handle errors with a response

      if (error.response) {
        // Server responded with a status code outside the 2xx range
        const status = error.response.status;
        const message =
          error.response.data?.message ||
          "An error occurred during the request.";

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
}

const isProduction = process.env.NODE_ENV === "production";
const productionUrl =
  typeof window !== undefined
    ? "https://" + process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL!
    : "https://" + process.env.PRODUCTION_BACKEND_URL!;

const localhost =
  typeof window !== undefined
  ? "http://" + process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL!
  : "http://" + process.env.LOCAL_BACKEND_URL!;

const fakeBackend = FakeBackend.getInstance(
  isProduction ? productionUrl : localhost
);
//const axiosInstance = backend.getAxiosInstance();

export { fakeBackend };
