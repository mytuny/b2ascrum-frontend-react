export default class Http {

    intercept(response) {
        // Raise an error in case response status is not success
        if (response.status >= 200 && response.status < 300) {
            // Success status lies between 200 and 300
            return response;
        } else {
            throw response;
        }
    }

    call(url, method = "GET", body = null) {
        // API headers
        const headers = {
            "Accept": "application/json",
            "Content-Type": "applicaton/json"
        };
        
        return fetch(url, {
            method: method,
            // mode: 'cors',
            headers,
            body
        })
            .then(this.intercept)
            .then(response => response.json());
    }

    get(url, body = null) {
        return this.call(url, "GET", body);
    }

    post(url, body = null) {
        return this.call(url, "POST", JSON.stringify(body));
    }

    put(url, body = null) {
        return this.call(url, "PUT", JSON.stringify(body));
    }

    delete(url, body = null) {
        return this.call(url, "DELETE", JSON.stringify(body));
    }
}