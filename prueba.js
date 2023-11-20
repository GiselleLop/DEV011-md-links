const mdLinksModule = require('./index.js');
const fs = require('fs'); 
const path = require('path');
const { validatePathOrDirectory, readingDirectory, convertPaths, extractLinksFromFile, solicitudHTTPFetch, solicitudHTTP, accessPath, verifyFileMarckdown, readFileMd, arrayOfObjectForEveryLinkFound } = require('./CLI');

const mdLinksFunction = mdLinksModule().mdLinks;
mdLinksFunction("README.md", true)

// readingDirectory("./Prueba_directorio");
//validatePathOrDirectory("./Prueba_directorio")
