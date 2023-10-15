(function (window) {
    window["env"] = window["env"] || {};

    // Environment variables
    window["env"]["BACKEND_URL"] = "${BACKEND_URL}";
    window["env"]["BACKEND_OAUTH_URL"] = "${BACKEND_OAUTH_URL}";
})(this);
