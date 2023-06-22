import fs from 'fs';

const ls = async (url) => {

//   fs.lstatSync(path_string).isDirectory() 
// isFile

  let directoryFiles = [];
    fs.readdir(url, (err, files) => {
    if (err)
      console.warn('Operation failed');
    else {
      files.forEach(file => {
        directoryFiles.push(file);
      })
      //console.table
    };
  })
}
export default ls;