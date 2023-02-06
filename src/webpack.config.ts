import { EnvironmentPlugin } from 'webpack'


module.exports = {
    plugins: [
        new EnvironmentPlugin({
            'BACKEND_URL': 'https://api.hideyoshi.com.br', 
            'BACKEND_OAUTH_URL': 'https://api.hideyoshi.com.br'
        })
    ]
}