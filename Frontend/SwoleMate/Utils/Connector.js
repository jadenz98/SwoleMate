export default class Connector {
    // Paste your local IP here for local dev
    //static url = "http://10.192.40.66:3000";
    static url = "http://10.186.122.194:8000";

    /**
     * Use this to send a post request to the server
     *
     * @param endpoint The endpoint to send the post to
     * @param body The body of the post request (should be a JSON object)
     * @param flags The optional extra headers you want to add on
     * @param callback The callback to execute after the response has been recieved
     */
    static post (endpoint, body, flags, callback) {
        this.connect(endpoint, "POST", body, flags, callback);
    }

    /**
     * Use this to send a get request to the server
     *
     * @param endpoint The endpoint to send the get to
     * @param flags The optional extra headers you want to add on
     * @param callback The callback to execute after the response has been recieved
     */
    static get (endpoint, flags, callback) {
        this.connect(endpoint, "GET", null, flags, callback);
    }

    /**
     * Treat this as a private method
     * To be used by the other abstracted methods in this class to connect to the server
     *
     * @param endpoint The endpoint to connect to
     * @param method The method to use
     * @param body The body to send
     * @param flags The optional extra headers you want to add on
     * @param callback The function to be executed after the response has been recieved
     */
    static connect (endpoint, method, body, flags, callback) {
        // Build out the request to be sent
        const request = {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...flags
            }
        };

        // If the body is not null, attach it to the request
        if (body != null) {
            request.body = JSON.stringify(body);
        }

        // Send the request to the server
        fetch(this.url + endpoint, request).then((response) => response.json())
        .then((responseJson) => {
            // Execute the callback function with the response JSON data
            callback(responseJson);
        })
        .catch((error) => {
            console.error(error);
        });
    }
}
