#!/usr/bin/env node
const process = require('process'); 
const mdLinksModule = require('./index.js');
const args = process.argv; 
const path = args[2];
const validate = args.includes('-v', '--validate');
const stats = args.includes('-s', '--stats')
console.log(process.argv);
 const mdLinksFunction = mdLinksModule().mdLinks;

  if(validate === false && stats === false) {
    mdLinksFunction(path, false)
   .then(links => {
    for (let i=0; i<links.length; i++) {
      console.log(links[i].file + '  ' + links[i].href + '  ' + links[i].texto) ;
    }
   })
   .catch (console.error);
  }
  else if (validate && stats) {
    mdLinksFunction(path, true)
    .then(links => {
      let uniques = [];
      let duplicates = [];
      let broken = []
      for (let i=0; i<links.length; i++) {
        if(links[i].status === 'Error') {
        broken.push(links[i].status)
        uniques.push(links[i].href)
        }
        else if (!uniques.includes(links[i].href)){
        uniques.push(links[i].href)
        } else if (uniques.includes(links[i].href)) {
        duplicates.push(links[i].href)
        } 
      }
     console.log('Total: ' + links.length);
     console.log('Uniques:   ' + uniques.length);
     console.log('Repeated: ' + duplicates.length);
     console.log('Broken: ' + broken.length);
    })
    .catch (console.error);
    }
  else if(validate) {
    mdLinksFunction(path, true)
    .then(links => {
      for (let i=0; i<links.length; i++) {
      console.log(links[i].file + '  ' + links[i].href + '  ' + links[i].ok + ' ' + links[i].status + '  ' + links[i].texto) ;
    }
  })
    .catch(console.error);
  }
  else if(stats) {
    mdLinksFunction(path, false)
    .then(links => {
      let uniques = [];
      let duplicates = [];
      for (let i=0; i<links.length; i++) {
        if (!uniques.includes(links[i].href)){
        uniques.push(links[i].href)
        } else {
        duplicates.push(links[i].href)
        }
        }
     console.log('Total: ' + links.length);
     console.log('Uniques:   ' + uniques.length);
     console.log('Repeated: ' + duplicates.length);
    })
    .catch (console.error);
  }


//------
// const mdLinksFunction = mdLinksModule().mdLinks;
// mdLinksFunction(path, true)
// .then(links => {
//   //console.log(links);
//   // for (let i=0; i<links.length; i++) {
//   //   console.log(links[i].file + '  ' + links[i].href + '  ' + links[i].texto ) ;
//   // }
// })
// .catch(console.error);
