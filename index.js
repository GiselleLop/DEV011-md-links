const fs = require('fs').promises;
const path = require('path');
const { log } = require('util');
const { URL } = require('url');

module.exports = () => {
  function mdLinks(filePath, validate) {
    const rutaRelativa = filePath;
    const rutaAbsoluta = path.resolve(rutaRelativa);
    console.log(validate);

   
    // Comprobar si la ruta existe
    return fs.access(rutaAbsoluta)
      .then(() => {
        // Verificar si la extensión del archivo es una de las permitidas
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
          console.log(match[2]);
          return {
            href: match[2], // Suponiendo que el enlace es la URL
            texto: match[1], // Puedes modificar esto según tus necesidades
            file: rutaAbsoluta,  // Usa la ruta original, no la relativa
            status: 'solicitudHTTP(match[2])',
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
};

// function solicitudHTTP(link) {
//   if (link = undefined) {
//     throw new Error('El link no se pudo solicitar');
//   }
//   fetch(link)
//     .then(response => {
//       console.log('Código de respuesta:', response.status);
//       return response.json();
//     })
//     .then(data => console.log('Datos:', data))
//     .catch(error => console.error("Error:", error));
// }  