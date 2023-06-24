import fs from 'fs';
import path from 'path';

const copyFile = (url, params) => {
  const fileNames = params.split(' ');
  const writableStream = fs.createWriteStream(path.join(fileNames[1], fileNames[0]));
  
  fs.createReadStream(url + fileNames[0]).on('data', (chunk, err) => {
    if (err) console.log('Operation failed');
    writableStream.write(chunk);
    console.log(`File ${fileNames[0]} successfully copied to ${path.join(fileNames[1], fileNames[0])}`);
  });
}
export default copyFile;