
const axios = require('axios'); // Import Axios library

export async function AxiosInstance(requestType, url, headers = {}, errorHandler = null, requestBody = null) {
    try {
        // Create Axios config object with the request type, URL, headers, and request body
        const config = {
        method: requestType,
        url,
        headers,
        data: requestBody, // Include the request body for POST requests
        };

        // Make the HTTP request using Axios
        const response = await axios(config);

        // Return the response data
        return response.data;
    } catch (error) {
        // Handle errors if provided errorHandler function is defined
        
        if (errorHandler && typeof errorHandler === 'function') {
        errorHandler(error);
        } else {
        // If no errorHandler is provided, simply rethrow the error
            return error;
        }
    }
}
