import fs from 'fs';

const deleteFile = (url) => {
   fs.unlink(url, (err) => {
    if (err) console.log('FS operation failed');
  });
}
export default deleteFile;