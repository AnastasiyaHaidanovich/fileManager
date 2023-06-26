import fs from 'fs';

const ls = (url) => {

  let directoriesList = [];
  let filesList = [];
    fs.readdir(url, (err, files) => {
    if (err)
      console.log('Operation failed');   
    else {
      process.nextTick(() => {
        try{
          files.forEach(file => {
            fs.statSync(url + '\\').isDirectory() ? directoriesList.push([file, 'directory']) : filesList.push([file, 'file'])
          })
          console.table(directoriesList.sort().concat(filesList.sort()))
        } catch {
          console.log('Operation failed')
        }        
      });      
    };
  })
}
export default ls;