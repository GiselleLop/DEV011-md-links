const mdLinksModule = require('../index.js');

describe('mdLinks', () => {
  it('should return a resolved function', () => {
    const mdLinksFunction = mdLinksModule().mdLinks('./README.md', true);
    return mdLinksFunction.then((result) => {
      expect(result).toEqual(expect.any(Array));
    });
  });

  it('should handle errors', () => {
    const mdLinksFunction = mdLinksModule().mdLinks('./hola.md');
    return mdLinksFunction.catch((error) => {
      expect(error).toBeDefined();
      // Agrega más expectativas según lo que estás probando
    });
  });
});


// describe('mdLinks', () => {
//   it('debería resolver un arreglo con 3 links para un archivo .md con 3 links', () => {
//     return mdLinks('miArchivo.md').then((result) => {
//       expect...;
//     });
//   });
