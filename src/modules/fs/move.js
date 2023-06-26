import fs from 'fs';
import path from 'path';

const moveFile = (url, newUrl) => {
  fs.createReadStream(url)
  .on('error', () => {
    console.log('Operation failed')
  })
  .on('data', (chunk) => {
    const writableStream = fs.createWriteStream(path.join(newUrl, path.basename(url)));
    writableStream.write(chunk);

    fs.unlink(url, (err) => {
      console.log('url to move', url)
      if (err) console('FS operation failed');
    });
    
    console.log('File successfully moved');
  })
}
export default moveFile;