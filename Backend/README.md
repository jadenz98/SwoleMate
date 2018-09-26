## Setup
```
npm install
npm start
```

## Debugging
[Postman](https://www.getpostman.com/) is a great tool for testing the different endpoints of our api. To test an endpoint, you would just send a request to ```<server URL/IP>/<endpoint>```. For local dev, the IP will be your IPV4 address followed by :3000 The /hello GET endpoint is a good basic test point to make sure everything is working.

## Creating Endpoints
To create an endpoint,
1. Create a new js file in the "routes" folder based off of another route file (i.e. hello.js)
2. Add these two lines to app.js where ```<name>``` is the name of the file you created
```
var <name>Router = require('./routes/<name>');
app.use('/<name>', <name>Router);
```
3. Add whatever functionality you need to the new js file. For GET requests, use ```router.get()```. For POST requests, use ```router.post()```.
