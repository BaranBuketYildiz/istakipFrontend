// apiHelpers.js

export function fetchData(url, method, data, onSuccess) {
    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: data ? JSON.stringify(data) : null,
    }).then(res => res.json())
        .then(result => {
            onSuccess(result);
        });
}

export function loadResource(resourceURL, onSuccess) {
    fetchData(resourceURL, "GET", null, onSuccess);
}

export function deleteResource(resourceURL, resourceId) {
    fetchData(`${resourceURL}/delete/${resourceId}`, "DELETE", null, (result) => {
        console.log(result);
    });
}

export function saveOrUpdateResource(resourceURL, data) {
    const url = data.id ? `${resourceURL}/${data.id}` : resourceURL;
    fetchData(url, "POST", data, (result) => {
        console.log(result);
    });
}
