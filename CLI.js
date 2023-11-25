#!/usr/bin/env node

const mdLinksModule = require('./index.js');

const [, , file, validate] = process.argv;
console.log(process.argv);

const isValidateTrue = validate === "true";

const mdLinksFunction = mdLinksModule().mdLinks;

return mdLinksFunction(file, isValidateTrue)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
