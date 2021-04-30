# oauth-test

This project was created to be able to test the response sent by an OAuth provider following the Authorization Code Flow.

## Requirements
* Node.js


## Creating Oauth Application
The first step is you create an application profile with your oauth provider. This application has been tested with openid-providers (gitlab). You should create the application with the callbackUrl of `http://localhost:4000/callback` if being run locally. For the the Gitlab Oauth provider you will need to use these scopes:
* read_user
* openid
* profile
* email

After creating the application you should be given a client id and a secret that you will use to configure this client application.

## Configuration
There are 6 configuration values you will need to set in order to setup this client, all of which can be found in the config.js.sample file. You just need to create a config.js file from this sample file and place it in the root directory of the project.
* clientId - the client id you get when you register an application with your oauth provider
* clientSecret - the secret you get when you register an application with your oauth provider
* oauthTokenUrl - the url your client application will use to query the oauth provider for a token (used on client application side)
* oauthUserInfoUrl - the url your client application will use to query the oauth provider for additional user information (used on client application side)
* oauthAuthorizeUrl - the url your application will redirect the user to in order to authorize with the oauth provider (used in client browser)
* oauthScope - set of scope permissions required for your client application (example for gitlab oauth: "openid+profile+email")

## Using oauth-test
In order to use oauth-test, you should already have node.js installed. Any version should work. You must run `npm install` from the root directory of the application to install the dependencies. The start the application with `node index.js`. You should see `Listening on port 4000` if it is working.

Next visit http://localhost:4000, where it will load a page with button "Get OAuth Results". Clicking the button should redirect you to the oauth application you are testing, where you can authorize the application to use your information. After that, the browser should display the results that were used by your application. 

The values included in the results are:
* authorization code - values returned by the oauth application and sent to the configured callback, this is used to fetch an access token
* access token - value used by the client application to fetch privileged information from the oauth provider
* JWT - the jwt token that is probably used by the client application
* User Info - the additional info the client application gets from the oauth provider
