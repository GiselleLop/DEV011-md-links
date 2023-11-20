const axios = require('axios');
const { log } = require('console');
const fs = require('fs').promises; 
const fs1 = require('fs'); 
const path = require('path');

//"./Prueba_directorio"
//funcion para leer directorio
function readingDirectory(directory) {
  filenames = fs1.readdirSync(directory); 
    console.log("Directory filenames:");
    //se crea un array de los archivos del directorio 
    const arrayOfFiles = [];
    filenames.forEach(file => {
    //se une el directorio con el archivo
    const absolutePath = path.join(directory, file);
    // se agrega cada archivo al array creado
    arrayOfFiles.push(absolutePath)
    });
    //filtrar solo los archivos md
    const archivosMd = arrayOfFiles.filter(file => file.endsWith('.md'));
   //ya filtrados los archivos md, se convierten de nuevo a string y por cada uno se convierte a ruta absoluta
    archivosMd.forEach(archivo => {
      convertPaths(archivo)
      .then((file)=> {
        console.log(file + "Se pudo acceder");
        verifyFileMarckdown(archivo)
      })
      .catch(err => {
        console.log(err);
      })
    })

}      
/*
    if (path.extname(file) == ".md") {
      console.log("holaaaa " + absolutePath);
     */


// function validatePathOrDirectory(filePath) {
//   fs.stat(filePath)
//   .then(stats => {
//     if (stats.isDirectory()) {
//       console.log(`${filePath} es un directorio.`);
//       readingDirectory(filePath)
//       // Puedes agregar más lógica relacionada con directorios aquí si es necesario
//     } else if (stats.isFile()) {
//       console.log(`${filePath} es un archivo.`);
//       return stats
//     }
    
// }) 
// .catch (err => {
// console.log(err)
// })
// }

//funcion para convertir una ruta relativa a absoluta
function convertPaths(rutaRelativa) {
  return new Promise((resolve, reject) => {
    const rutaAbsoluta = path.resolve(rutaRelativa);
    console.log(rutaAbsoluta);

    if (rutaAbsoluta) {
      resolve(rutaAbsoluta);
    } else {
      reject(new Error('Error al convertir la ruta relativa a absoluta.'));
    }
  });
}

//funcion para comprobar si la ruta existe en el ordenador
function accessPath(rutaAbsoluta) {
  return fs.access(rutaAbsoluta)
  .then(() => {
  return Promise.resolve(rutaAbsoluta)
  })
  .catch((error) => {
    // Rechaza la promesa si la ruta no existe o hay otros errores
    return Promise.reject(error);
  })
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
  return fs.readFile(filePath, 'utf8')
    .then(data => {
     console.log(typeof data);
      return Promise.resolve(data)

      // return "Se leyo el archivo md. exitosamente";
    })
    .catch(error => {
      return Promise.reject(`Error al leer el archivo md: ${error.message}`);
    });
}

// Función para extraer enlaces del archivo MD
function extractLinksFromFile(data) {
  return new Promise((resolve, reject) => {
    const links = data.match(/\[.*?\]\((.*?)\)/g) || [];
    if (links) {
      // console.log(links);
      resolve(links);
    } else {
      reject(new Error('No se encontraron enlaces en el archivo.'));
    }
  });
}

function solicitudHTTP(link) {
  return axios.get(link)
    .then(response => {
      return response.status; // Devuelve la respuesta para que pueda ser utilizada en la cadena de promesas
    })
    .catch(error => {

      throw error; // Rechaza la promesa para que el error se propague a la cadena de promesas
    });
}
function solicitudHTTPFetch(link) {
  fetch(link)
  .then (res => {
  return res.status;
  })
  .catch(error => {
  console.log(error);
  })
}
/*
// Funcion para crear el array de objetos(cada objeto representa un link)
function arrayOfObjectForEveryLinkFound(data, validate, rutaAbsoluta) {
  if (validate === false || validate === undefined ) {
    // Crear un arreglo de objetos con la información de los enlaces
    const arregloDeObjetos = data.map(enlace => {
      const match = enlace.match(/\[(.*?)\]\((.*?)\)/);
      return {
        href: match[2], // Suponiendo que el enlace es la URL
        texto: match[1], // Puedes modificar esto según tus necesidades
        file: rutaAbsoluta// Usa la ruta original, no la relativa
      };
    });
    console.log(arregloDeObjetos);
    return arregloDeObjetos;
  } else if (validate === true) {
    const arregloDeObjetos = data.map(enlace => {
    const match = enlace.match(/\[(.*?)\]\((.*?)\)/);
    solicitudHTTP('https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions',)
    .then(res => {
      console.log(res);
      return res
    })
    .catch (err => {
    console.log(err);
    })

      return {
        href: match[2], // Suponiendo que el enlace es la URL
        texto: match[1], // Puedes modificar esto según tus necesidades
        file: rutaAbsoluta,  // Usa la ruta original, no la relativa
        status: solicitud,
        ok: 'fail or ok'
        };                
    });
    
    console.log(arregloDeObjetos);
      // Resuelve la promesa con el arreglo de objetos
    return arregloDeObjetos;
    }
}*/

/*
// Funcion para crear el array de objetos(cada objeto representa un link)
function arrayOfObjectForEveryLinkFound(data, validate, rutaAbsoluta) {
  if (validate === false || validate === undefined ) {
    // Crear un arreglo de objetos con la información de los enlaces
    const arregloDeObjetos = data.map(enlace => {
      const match = enlace.match(/\[(.*?)\]\((.*?)\)/);
      return {
        href: match[2], // Suponiendo que el enlace es la URL
        texto: match[1], // Puedes modificar esto según tus necesidades
        file: rutaAbsoluta// Usa la ruta original, no la relativa
      };
    });
    console.log(arregloDeObjetos);
    return arregloDeObjetos;
  } else if (validate === true) {
    // Crear un arreglo de objetos con la información de los enlaces
    solicitudHTTP('https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions')
    .then(res => {
      const arregloDeObjetos = data.map(enlace => {
      const match = enlace.match(/\[(.*?)\]\((.*?)\)/);
      let objectLinks = {
        href: match[2], // Suponiendo que el enlace es la URL
        texto: match[1], // Puedes modificar esto según tus necesidades
        file: rutaAbsoluta,// Usa la ruta original, no la relativa 
        status: res,
      };
      return objectLinks
    });
    console.log(arregloDeObjetos);
    return arregloDeObjetos;
    })
    .catch (err => {
    console.log(err);
    })   
    
     
    }
}*/

// Funcion para crear el array de objetos(cada objeto representa un link)
function arrayOfObjectForEveryLinkFound(data, validate, rutaAbsoluta) {
  if (validate === false || validate === undefined) {
    // Crear un arreglo de objetos con la información de los enlaces
    const arregloDeObjetos = data.map(enlace => {
      const match = enlace.match(/\[(.*?)\]\((.*?)\)/);
      return {
        href: match[2],
        texto: match[1],
        file: rutaAbsoluta
      };
    });
    //console.log(arregloDeObjetos);
    return arregloDeObjetos;
  } else if (validate === true) {
    // Crear un arreglo de promesas para las solicitudes HTTP
    const arregloDePromesas = data.map(enlace => {
    const match = enlace.match(/\[(.*?)\]\((.*?)\)/);
      // Devuelve la promesa de solicitudHTTP
      return solicitudHTTP(match[2])
        .then(res => {
          return {
            href: match[2],
            texto: match[1],
            file: rutaAbsoluta,
            status: res,
            ok: "ok",
          };
        })
        .catch(err => {
      //    console.error(err);
          // En caso de error, devuelve un objeto con status y ok indicando el fallo
          return {
            href: match[2],
            texto: match[1],
            file: rutaAbsoluta,
            status: 'Error',
            ok: 'fail'
          };
        });
    });

    // Utiliza Promise.all para esperar a que todas las promesas se resuelvan
    return Promise.all(arregloDePromesas)
      .then(arregloDeObjetos => {
     // mmnmmmmm   
     console.log(arregloDeObjetos);
        // Resuelve la promesa con el arreglo de objetos
        return arregloDeObjetos;
      })
      .catch(error => {
        console.error('Error al procesar promesas:', error);
        // Maneja el error si Promise.all falla
        throw error;
      });
  }
}




  module.exports = { 
    readingDirectory: readingDirectory,
    solicitudHTTPFetch: solicitudHTTPFetch,
    convertPaths: convertPaths,
    solicitudHTTP: solicitudHTTP,
    extractLinksFromFile: extractLinksFromFile,
    accessPath: accessPath,
    verifyFileMarckdown: verifyFileMarckdown,
    readFileMd: readFileMd,
   // validatePathOrDirectory: validatePathOrDirectory,
    arrayOfObjectForEveryLinkFound: arrayOfObjectForEveryLinkFound,
  }
