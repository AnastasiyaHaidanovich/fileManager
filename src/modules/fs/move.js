import fs from 'fs';
import path from 'path';

const moveFile = (url, params) => {
  const fileNames = params.split(' ');
  const writableStream = fs.createWriteStream(path.join(fileNames[1], fileNames[0]));

  fs.createReadStream(path.join(url, fileNames[0])).on('data', (chunk) => {
    writableStream.write(chunk);

    fs.unlink(url + fileNames[0], (err) => {
      if (err) console('FS operation failed');
    });
    
    console.log(`File ${fileNames[0]} successfully moved to ${path.join(fileNames[1], fileNames[0])}`);
  });
}
export default moveFile;