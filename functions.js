const axios = require('axios');
const { log } = require('console');
const { resolve } = require('dns');
const fs = require('fs').promises; 
const fs1 = require('fs'); 
const path = require('path');

//funcion para leer directorio
function readingDirectory(directory) {
    const filesOfDirectory = fs1.readdirSync(directory)
     //se crea un array de los archivos del directorio 
    const arrayOfFiles = [];
    filesOfDirectory.forEach(file => {
    //se une el directorio con el archivo
    const absolutePath = path.join(directory, file);
    // se agrega cada archivo al array creado
    arrayOfFiles.push(absolutePath)
    });
      //filtrar solo los archivos md
      const archivosMd = arrayOfFiles.filter(file => file.endsWith('.md'));
      return archivosMd
}

function validatePathOrDirectory(filePath) {
  const stats = fs1.statSync(filePath)
    if (stats.isDirectory()) {
      return {type: 'directory', name: filePath};
    } else if (stats.isFile()) {
      return {type: 'file', name: filePath};
    } else {
    return 'No se pudo validar si es un directorio o una ruta'
    }
}

//funcion para convertir una ruta relativa a absoluta
function convertPaths(rutaRelativa) {
  const rutaAbsoluta = path.resolve(rutaRelativa);
   return rutaAbsoluta
}

//funcion para comprobar si la ruta existe en el ordenador
function accessPath(rutaAbsoluta) {

    fs.access(rutaAbsoluta)
    return rutaAbsoluta
  
}

// Funcion para saber si el archivo existente es de tipo md.
function verifyFileMarckdown(rutaAbsoluta) {
  const extensionsAllowed = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
  const extension = path.extname(rutaAbsoluta).toLowerCase();
  
  return new Promise((resolve, reject) => {
    if (extensionsAllowed.includes(extension)) {
      resolve(rutaAbsoluta);
    } else {
      reject(new Error('El archivo no tiene una extensión permitida: ' + extensionsAllowed.join(', ')));
    };
  });
}

// Funcion para leer el archivo Md
function readFileMd(filePath) {
  const data = fs1.readFileSync(filePath, 'utf8')
   return data
}

// Función para extraer enlaces del archivo MD
function extractLinksFromFile(data) {
    const links = data.match(/\[.*?\]\((.*?)\)/g) || [];
    if (links) {
      return links
    } else {
      return 'No se encontraron links';
    }
}

function solicitudHTTP(link) {
   return axios.get(link)
    .then(response => {
      return response.status; 
    })
    .catch(error => {
      throw error; 
    });
}

// Funcion para crear el array de objetos(cada objeto representa un link)
function arrayOfObjectForEveryLinkFound(data, validate, rutaAbsoluta) {
  const arregloDeObjetos = data.map((enlace) => {
    const match = enlace.match(/\[(.*?)\]\((.*?)\)/);
    if (validate === false || validate === undefined) {
      return Promise.resolve({
        href: match[2],
        texto: match[1],
        file: rutaAbsoluta
      });
    } else if (validate === true) {
      return solicitudHTTP(match[2])
        .then((res) => {
          return {
            href: match[2],
            texto: match[1],
            file: rutaAbsoluta,
            status: res,
            ok: 'ok'
          };
        })
        .catch((err) => {
          return {
            href: match[2],
            texto: match[1],
            file: rutaAbsoluta,
            status: 'Error',
            ok: 'fail'
          };
        });
    }
  });

  return Promise.all(arregloDeObjetos)
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((error) => {
      console.error('Error al procesar promesas:', error);
      throw error;
    });
}

  module.exports = { 
    readingDirectory: readingDirectory,
    convertPaths: convertPaths,
    solicitudHTTP: solicitudHTTP,
    extractLinksFromFile: extractLinksFromFile,
    accessPath: accessPath,
    verifyFileMarckdown: verifyFileMarckdown,
    readFileMd: readFileMd,
    arrayOfObjectForEveryLinkFound: arrayOfObjectForEveryLinkFound,
    validatePathOrDirectory: validatePathOrDirectory,
  }
