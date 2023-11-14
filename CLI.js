const mdLinksModule = require('index.js'); // Asegúrate de especificar la ruta correcta al archivo

const mdLinksFunction = mdLinksModule().mdLinks('README.md');

mdLinksFunction
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });