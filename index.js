
const fs = require('fs').promises;
const path = require('path');
const { convertPaths, extractLinksFromFile, solicitudHTTPFetch, solicitudHTTP, accessPath, verifyFileMarckdown, readFileMd, arrayOfObjectForEveryLinkFound } = require('./CLI');
/*
module.exports = () => {
  function mdLinks(filePath, validate) {
    const rutaRelativa = filePath;
    const rutaAbsoluta = path.resolve(rutaRelativa);
  console.log(rutaAbsoluta);
    // Comprueba si la ruta existe
    return fs.access(rutaAbsoluta)
      .then(() => {
        // Verifica si la extensión del archivo es una de las permitidas
        const extensionesPermitidas = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
        const extension = path.extname(rutaAbsoluta).toLowerCase();

        if (!extensionesPermitidas.includes(extension)) {
          throw new Error('El archivo no tiene una extensión permitida: ' + extensionesPermitidas.join(', '));
        }

        // Leer el archivo y procesar los enlaces MD
        return fs.readFile(filePath, 'utf8');
      })
      .then(data => {
        const enlacesMD = extraerEnlacesMD(data);
      if (validate = false || undefined ) {
     // Crear un arreglo de objetos con la información de los enlaces
     const arregloDeObjetos = enlacesMD.map(enlace => {
      const match = enlace.match(/\[(.*?)\]\((.*?)\)/);
      return {
        href: match[2], // Suponiendo que el enlace es la URL
        texto: match[1], // Puedes modificar esto según tus necesidades
        file: rutaAbsoluta,  // Usa la ruta original, no la relativa
      };
    });
    // Imprime el arreglo de objetos
    console.log(arregloDeObjetos);
    // Resuelve la promesa con el arreglo de objetos
    return arregloDeObjetos;
      } else if (validate = true) {
       
        const arregloDeObjetos = enlacesMD.map(enlace => {
          const match = enlace.match(/\[(.*?)\]\((.*?)\)/);


          return {
            href: match[2], // Suponiendo que el enlace es la URL
            texto: match[1], // Puedes modificar esto según tus necesidades
            file: rutaAbsoluta,  // Usa la ruta original, no la relativa
            status: '',
            ok: 'fail or ok'
          };
        
        });
        // Imprime el arreglo de objetos
    console.log(arregloDeObjetos);
        // Resuelve la promesa con el arreglo de objetos
        return arregloDeObjetos;
      } 

      })
      .catch(error => {
        // Rechaza la promesa si la ruta no existe o hay otros errores
        return Promise.reject(error);
      });
  }

  // Función de ejemplo para extraer enlaces MD
  function extraerEnlacesMD(data) {
    // Aquí implementa tu lógica para extraer enlaces MD del contenido del archivo
    // Por ahora, solo devolvemos una cadena de ejemplo
    return data.match(/\[.*?\]\((.*?)\)/g) || [];
  }
  return {
    mdLinks: mdLinks,
  };
};*/
 
module.exports = () => {
  function mdLinks(filePath, validate) {
    let rutaAbsoluta;
    convertPaths(filePath)
    .then((ruta) => {
    console.log('Ruta absoluta:', ruta);
    rutaAbsoluta = ruta;
    return accessPath(ruta)  // Comprueba si la ruta existe en el ordenador
    })
    .then((ruta) => {
      console.log(`La ruta ${ruta} existe.`);
      return verifyFileMarckdown(ruta);
    })
    .then((rutaAbsoluta)=> {
      console.log('El archivo tiene una extensión permitida.');
      return readFileMd(rutaAbsoluta)
    })
    .then((data) => {
      console.log('El archivo se leyo exitosamente.');
      return extractLinksFromFile(data)
    })
    .then((file) => {
      console.log('se extrajeron los links del archivo');
      return arrayOfObjectForEveryLinkFound(file, validate, rutaAbsoluta)
    })
    .then(()=> {
      console.log('array creado correctamente');
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
  
  };
 
  return {
    mdLinks: mdLinks,
    };
};
 
