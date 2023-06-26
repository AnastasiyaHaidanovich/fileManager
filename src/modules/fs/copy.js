import fs from 'fs';
import path from 'path';

const copyFile = (url, newUrl) => {
  const writableStream = fs.createWriteStream(path.join(newUrl, path.basename(url)));
  
  fs.createReadStream(url).on('data', (chunk, err) => {
    if (err) console.log('Operation failed');
    writableStream.write(chunk);
    console.log('File successfully copied');
  });
}
export default copyFile;