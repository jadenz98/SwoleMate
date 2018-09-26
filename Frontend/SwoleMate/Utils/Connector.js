export default class Connector {
    // Paste your local IP here for local dev
    static IP = "";
    static url = "http://" + this.IP + ":3000";

    static post (endpoint, body, flags, callback) {
        this.connect(endpoint, "POST", body, flags, callback);
    }

    static get (endpoint, flags, callback) {
        this.connect(endpoint, "GET", null, flags, callback);
    }

    static connect (endpoint, method, body, flags, callback) {
        const request = {
            method: method,
            ...flags
        };

        if (body) {
            request.body = body;
        }

        return fetch(this.url + endpoint, request).then((response) => response.json())
        .then((responseJson) => {
            callback(responseJson);
        })
        .catch((error) => {
            console.error(error);
        });
    }
}