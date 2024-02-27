export const environment = {
    production: true,
    backendPath: (<any>window)['env']['BACKEND_URL'],
    backendOAuthPath: (<any>window)['env']['BACKEND_OAUTH_URL'],
    messageApiPath: (<any>window)['env']['MESSAGE_URL'],
    githubUser: (<any>window)['env']['GITHUB_USER'],
}
