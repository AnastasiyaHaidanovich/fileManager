import fs from 'fs';

const renameFile = (oldUrl,newUrl) => {
  fs.rename(oldUrl, newUrl, (err) => {
    if (err) console.log('Operation failed');
  }); 
}
export default renameFile;