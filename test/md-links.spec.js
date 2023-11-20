const mdLinksModule = require('../index.js');
const fs = require('fs').promises;
const path = require('path');
const { convertPaths, extractLinksFromFile, solicitudHTTP, accessPath, verifyFileMarckdown, readFileMd, arrayOfObjectForEveryLinkFound } = require('../CLI.js');



describe('mdLinks', () => {
  it('should replace relative path with absolute path ', () => {
    const filePath = './README.md'; // Reemplaza con la ruta a tu archivo
    const functionMdLinks = convertPaths(filePath)
    return functionMdLinks.then((result)=> {
      expect(result).toEqual(path.resolve(filePath));
    });
  });
  it('should handle an invalid file path', () => {
    const mdLinksFunction = accessPath('./nonexistent.md');
    return mdLinksFunction.catch((error) => {
      // Verifica que la función maneje adecuadamente el error para una ruta inexistente
      expect(error).toBeDefined();
    });
  });

  it('debería leer el archivo md exitosamente', () => {
    const mockFileContent = 'Contenido del archivo md';
    // Mockea directamente la función readFileMd
    jest.mock('../CLI', () => ({
      readFileMd: jest.fn().mockResolvedValue(mockFileContent),
    }));
    // Llama directamente a la función readFileMd
    return expect(readFileMd('README.md')).resolves.toEqual(expect.any(String));
  });
  
  
  /*
it('should return a resolved function', () => {
      const mdLinksFunction = mdLinksModule().mdLinks('README.md', false);
        return mdLinksFunction.then((result) => {
          expect(result).toEqual(expect.any(Array));
        });
  });*/

});



// describe('mdLinks', () => {
//   it('should return a resolved function', () => {
//     const mdLinksFunction = mdLinksModule().mdLinks('./README.md', true);
//     return mdLinksFunction.then((result) => {
//       expect(result).toEqual(expect.any(Array));
//     });
//   });

  // it('should handle errors', () => {
  //   const mdLinksFunction = mdLinksModule().mdLinks('./hola.md');
  //   return mdLinksFunction.catch((error) => {
  //     expect(error).toBeDefined();
  //     // Agrega más expectativas según lo que estás probando
  //   });
  // });
//});

// describe('mdLinks', () => {
//   it('debería resolver un arreglo con 3 links para un archivo .md con 3 links', () => {
//     return mdLinks('miArchivo.md').then((result) => {
//       expect...;
//     });
//   });

// describe('solicitudHTTP', () => {
//   it('deberia retornar status', () => {
//     const linkPrueba = 'https://jsonplaceholder.typicode.com/posts';
//     return functionlink.solicitudHTTP(linkPrueba).then((result) => {
//       expect(result).toEqual(expect.any(Number));
//     });
//   });
// }); 
