const fs = require('fs').promises;
const path = require('path');
const { readingDirectory, validatePathOrDirectory, convertPaths, extractLinksFromFile, solicitudHTTP, accessPath, verifyFileMarckdown, readFileMd, arrayOfObjectForEveryLinkFound } = require('../functions.js');

describe('mdLinks', () => {
  it('Debería reemplazar una ruta relativa por una ruta absoluta', () => {
    const filePath = './README.md'; // Reemplaza con la ruta a tu archivo
    const result = convertPaths(filePath)
      expect(result).toEqual(path.resolve(filePath));
  });
  it('debería leer el archivo md exitosamente', () => {
    const mockFileContent = 'Contenido del archivo md';
    // Mockea directamente la función readFileMd
    jest.mock('../functions', () => ({
      readFileMd: jest.fn().mockResolvedValue(mockFileContent),
    }));
    // Llama directamente a la función readFileMd
    return expect(readFileMd('README.md')).toEqual(expect.any(String));
  });
  
  it('Debería devolver un objeto con propiedades para cada link', () => {
    const data = ['[Link1](http://example.com)', '[Link2](http://example2.com)'];
    const validate = false;
    const rutaAbsoluta = '/ruta/del/archivo.md';

    return arrayOfObjectForEveryLinkFound(data, validate, rutaAbsoluta).then(result => {
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2);
      result.forEach(obj => {
        expect(obj).toHaveProperty('href');
        expect(obj).toHaveProperty('texto');
        expect(obj).toHaveProperty('file');
      });
    });
  });

  it('Debería devolver un objeto con propiedades (incluyendo status y ok) para cada link si validate es true', () => {
    const data = ['[Link1](http://example.com)', '[Link2](http://example2.com)'];
    const result = arrayOfObjectForEveryLinkFound(data, true, './readme.md')
      expect(result).toEqual(expect.any(Promise))
  });

  it('Debería retornar una objeto si el argumento escrito es un directorio', () => {
    const directoryPath = './Prueba_directorio';
    const result = validatePathOrDirectory(directoryPath)
    expect(result).toBeInstanceOf(Object);
  })
  it('Debería retornar una promesa resuelta si el argumento escrito es un archivo', () => {
    const filePath = './README.md';
   const  result = validatePathOrDirectory(filePath)
    expect(typeof result).toEqual("object");
  });
  it('Debería leer exitosamente un directorio y retornar los archivos encontrados en un array.', () => {
    const directoryPath = './Prueba_directorio';
    const result = readingDirectory(directoryPath)
    expect(result).toBeInstanceOf(Array);
  });
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
