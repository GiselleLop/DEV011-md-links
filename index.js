#!/usr/bin/env node

const fs = require("fs").promises;
const fs1 = require('fs'); 
const path = require("path");
const {
  validatePathOrDirectory,
  readingDirectory,
  convertPaths,
  extractLinksFromFile,
  accessPath,
  verifyFileMarckdown,
  readFileMd,
  arrayOfObjectForEveryLinkFound,
} = require("./functions");

module.exports = () => {
  function mdLinks(filePath, validate) {
  return new Promise((resolve, reject) => {
     let rutaAbsoluta;
      validatePathOrDirectory(filePath)
      .then((result)=> {
        if (result.type === 'directory') {
          // Realiza acciones específicas para directorios
          return readingDirectory(result.name)
        } else if (result.type === 'file'){          
          // Realiza acciones específicas para archivos
          return result.name
        }
      })
      .then((result)=> {
        console.log(typeof result);
        if(typeof result === "string") {
          return convertPaths(result)    
          .then((ruta) => {
            // console.log("RUTA RUTA " + ruta);
            rutaAbsoluta = ruta;
             // console.log("Ruta absoluta:", ruta);
              return accessPath(ruta); // Comprueba si la ruta existe en el ordenador
            })
            .then((ruta) => {
              // console.log(`La ruta ${ruta} existe.`);
              return verifyFileMarckdown(ruta);
            })
            .then((rutaAbsoluta) => {
             // console.log("El archivo tiene una extensión permitida.");
              return readFileMd(rutaAbsoluta);
            })
            .then((data) => {
              // console.log("El archivo se leyo exitosamente.");
              return extractLinksFromFile(data);
            })
            .then((file) => {
              // console.log("se extrajeron los links del archivo");
              // console.log(file);
              return arrayOfObjectForEveryLinkFound(
                file,
                validate,
                rutaAbsoluta
              );
            })
            .then((arrayLinks) => {
              resolve(arrayLinks)
              console.log("array creado correctamente");
            })
            .catch((error) => {
              reject(error)
            });
        }
        else{
          const arr =  Object.values(result);
          arr.forEach((ell)=> {
          // console.log("FOREACH "+ ell);
          // console.log( convertPaths(ell));
          return convertPaths(ell)     
        .then((ruta) => {
         // console.log("Ruta absoluta:", ruta);
          return accessPath(ruta); // Comprueba si la ruta existe en el ordenador
        })
        .then((ruta) => {
          // console.log(`La ruta ${ruta} existe.`);
          return verifyFileMarckdown(ruta);
        })
        .then((rutaAbsoluta2) => {
         // console.log("El archivo tiene una extensión permitida.");
          return readFileMd(rutaAbsoluta2);
        })
        .then((data) => {
         // console.log("El archivo se leyo exitosamente.");
          return extractLinksFromFile(data);
        })
        .then((file) => {
         // console.log("se extrajeron los links del archivo");
          //console.log(file);
          return arrayOfObjectForEveryLinkFound(
            file,
            validate,
            ell
          );
        })
        .then((arrayLinks) => {
          resolve(arrayLinks)
          console.log("array creado correctamente");
        })
        .catch((error) => {
          reject(error)
        });
          })
        }
      })

  })
};
return {
  mdLinks: mdLinks,
};
}

exports.printMsg = function() {
  console.log("This is a message from the demo package");
}