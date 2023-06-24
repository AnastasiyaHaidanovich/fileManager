import fs from 'fs';

const renameFile = (url, params) => {
  const fileNames = params.split(' ');
  fs.rename(url + fileNames[0], url + fileNames[1], (err) => {
    if (err) console.log('Operation failed');
  }); 
}
export default renameFile;