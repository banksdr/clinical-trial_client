# AER Clinical Trial Repository

This is the top-level repository for a clinical trial web application, serving as both the client/server repositories.  It houses the server file configuration, and references submodules that contain the react application. The UI is developed with `React` for the architecture and `Redux` to manage the global state. The backend uses `Nodejs` on the server with `Express` as the framework to process pdf downloads and serve them to the client.

## Prerequisites

- Node >= v10.12.0
- Npm >= 6.4.1
- Gulp >= local version 3.9.1
- React >= 15.6.2

## Running Locally

### Client

The Client can be accessed at:

- Host: http://localhost:3000
- Run `npm run client` to load the app and migrate directories to the build directory

### Server

- Host: http://localhost:5000
- Run `npm run server` to start the server
