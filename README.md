# Introduction

This is the Digital Enterprise SNA UI. This is a React based web application.

## Required software:

| Software | Version | Link                            | Comments                                                           |
| -------- | ------- | ------------------------------- | ------------------------------------------------------------------ |
| Node.js  | 14.15.3 | https://nodejs.org/en/download/ | npm packaged with Node.js. At the time of writing, 14.15.3 was LTS |
|          |         |                                 | make sure npm version is 6.x and not above                         |

## Optional software:

-   Consider using a node version manager (nvm, n) for switching between versions of node.
-   IDEs of choice:
    -   Webstorm
    -   Visual Studio Code (recommended)
-   Chrome with the following extensions:
    -   React Developer Tools
    -   Redux DevTools

# NPM commands

## Setup all the dependencies

`npm install`

## Launch Browser App In Development Mode
To run the source in development mode, perform the following steps:

-   Run: `npm run start`
-   Open Chrome with the following parameters to prevent errors when loading the app (e.g. `CORS errors retrieving data`): `--disable-web-security --user-data-dir=<pathToEmptyDirectory>`
-   Navigate to: http://localhost:3000/dashboard