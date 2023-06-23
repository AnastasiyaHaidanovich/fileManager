import fs from 'fs';

const ls = (url) => {

  let directoriesList = [];
  let filesList = [];
    fs.readdir(url, (err, files) => {
    if (err)
      console.log('Operation failed');   
    else {
      process.nextTick(() => {
        files.forEach(file => {
          fs.lstatSync(url + '\\' + file).isDirectory() ? directoriesList.push([file, 'directory']) : filesList.push([file, 'file'])
        })
        console.table(directoriesList.sort().concat(filesList.sort()))
      });      
    };
  })
}
export default ls;