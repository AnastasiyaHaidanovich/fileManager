import fs from 'fs';

const createFile = (url) => {
  fs.writeFile(url, '', function (err) { if (err) console.log('FS operation failed',err) });
}

export default createFile;