import fs from 'fs';

const readStream = (url) => {
  fs.stat(url,(err) => {
    if (err) {
      console.log('No such file or directory');
    } else {
      fs.createReadStream(url).on('data', (chunk) => {
        process.stdout.write(chunk.toString());
      });
    }
  })  
};

export default readStream;