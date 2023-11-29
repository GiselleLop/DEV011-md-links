
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
   // console.log(filePath, validate, 8888);
   return new Promise((resolve, reject) => {
      let resultPathOrdDirectory = [];
     // let arrayFinal =[];
      const result = validatePathOrDirectory(filePath)
      //console.log(result, 689);
        if (result.type === 'directory') {
          resultPathOrdDirectory =  readingDirectory(result.name)
        } else if (result.type === 'file'){
          resultPathOrdDirectory.push(result.name)
        }

      const promises = resultPathOrdDirectory.map((path) => {
          const routeAbsolute = convertPaths(path) 
          const routeAcces = accessPath(routeAbsolute)
          return verifyFileMarckdown(routeAcces)
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
                routeAbsolute
              );
            })
            .catch((error) => {
              reject(error)
            });
        })
      Promise.all(promises)
      .then((results) => {
        const arrayFinal = results.flat(); 
       // console.log(arrayFinal);
        resolve(arrayFinal);
      })
      .catch((error) => {
        reject(error);
      });

      })
};


return {
  mdLinks: mdLinks,
};
}
