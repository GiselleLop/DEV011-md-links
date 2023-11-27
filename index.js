
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
            rutaAbsoluta = ruta;
              return accessPath(ruta);
            })
            .then((ruta) => {
              return verifyFileMarckdown(ruta);
            })
            .then((rutaAbsoluta) => {
              return readFileMd(rutaAbsoluta);
            })
            .then((data) => {
              return extractLinksFromFile(data);
            })
            .then((file) => {
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
        else if (typeof result === 'object'){
          const arr =  Object.values(result);
          /*arr.forEach((ell)=> {

          // console.log("FOREACH "+ ell);
           //console.log( convertPaths(ell));
          convertPaths(ell)     
           .then((ruta) => {
          // console.log("Ruta absoluta:", ruta);
            return accessPath(ruta); // Comprueba si la ruta existe en el ordenador
          })
          .then((ruta) => {
          // console.log(`La ruta ${ruta} existe.`);
          return verifyFileMarckdown(ruta);
          })
          .then((rutaAbsoluta2) => {
           // console.log("El archivo tiene una extensión permitida." + rutaAbsoluta2);
          return readFileMd(rutaAbsoluta2);
          })
          .then((data) => {
           // console.log("El archivo se leyo exitosamente.");
           return extractLinksFromFile(data);
          })
          .then((fileFound) => {
          return arrayOfObjectForEveryLinkFound(fileFound, validate, ell);
          })
        .then((arrayLinks) => {
          //console.log(arrayLinks);
          resolve(arrayLinks) 
        })
         .catch((error) => {
          reject(error)
        });
          })*/
          
          Promise.all([arr.map((ell)=> {
              convertPaths(ell)     
               .then((ruta) => {
                return accessPath(ruta); 
              })
              .then((ruta) => {
              // console.log(`La ruta ${ruta} existe.`);
              return verifyFileMarckdown(ruta);
              })
              .then((rutaAbsoluta2) => {
               // console.log("El archivo tiene una extensión permitida." + rutaAbsoluta2);
              return readFileMd(rutaAbsoluta2);
              })
              .then((data) => {
               // console.log("El archivo se leyo exitosamente.");
               return extractLinksFromFile(data);
              })
              .then((fileFound) => {
              return arrayOfObjectForEveryLinkFound(fileFound, validate, ell);
              })
            .then((arrayLinks) => {
             // console.log(arrayLinks);
             return resolve(arrayLinks)
              //resolve(arrayLinks)
            })
             .catch((error) => {
              reject(error)
            });
          })])
        }

      })

  })
};


return {
  mdLinks: mdLinks,
};
}
