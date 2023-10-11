(function (window) {
    window['env'] = window['env'] || {};

    // Environment variables
    window['env']['backendPath'] = '${BACKEND_URL}';
    window['env']['backendOAuthPath'] = '${BACKEND_OAUTH_URL}';
})(this);
