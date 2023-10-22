
const axios = require('axios'); // Import Axios library
const axiosInstance = axios.create();
// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
      // Do something before request is sent, for example setting the authorization headers
      const token = typeof window !== 'undefined' && localStorage.getItem('token'); // Replace 'your token' with the actual token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  
  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      // Do something with response data
      return response;
    },
    (error) => {
      // Do something with response error
      return Promise.reject(error);
    }
  );
  
export async function AxiosHeadersInstance(requestType, url, headers = {}, errorHandler = null, requestBody = null) {
    try {
        // Create Axios config object with the request type, URL, headers, and request body
        const config = {
        method: requestType,
        url,
        headers,
        data: requestBody, // Include the request body for POST requests
        };

        // Make the HTTP request using Axios
        const response = await axiosInstance(config);

        // Return the response data
        return response.data;
    } catch (error) {
        // Handle errors if provided errorHandler function is defined
        
        if (errorHandler && typeof errorHandler === 'function') {
        errorHandler(error);
        } else {
            console.log('=== error ===' , error)
            if(error.response.status === 401){
              window.location.href = '/'
            }
        // If no errorHandler is provided, simply rethrow the error
            return error;
        }
    }
}
