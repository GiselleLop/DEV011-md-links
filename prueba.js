const mdLinksModule = require('./index.js');
const fs = require('fs'); 
const path = require('path');
const { validatePathOrDirectory, readingDirectory, convertPaths, extractLinksFromFile, solicitudHTTPFetch, solicitudHTTP, accessPath, verifyFileMarckdown, readFileMd, arrayOfObjectForEveryLinkFound } = require('./CLI');
const { log } = require('util');

const mdLinksFunction = mdLinksModule().mdLinks;
mdLinksFunction("README.md", true)
.then(res => {
console.log(res)
})
.catch(err=> {
console.log(err);
})
// prueba.js


// ("./Prueba_directorio");
//validatePathOrDirectory("./Prueba_directorio")
