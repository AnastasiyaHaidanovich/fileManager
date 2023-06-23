import getDirname from './getDirname.js';
import up from './modules/fs/up.js';
import ls from './modules/fs/ls.js';
import path from 'path';
import readStream from './modules/streams/read.js';
import fs from 'fs';
import { fileURLToPath } from 'url';

const start = () => {
  const Username = process.argv[2].slice(process.argv[2].indexOf('=') + 1);
  let currentUrl = getDirname(import.meta.url);

  console.log(`Welcome to the File Manager, ${Username}!`);
  console.log('You are welcome to print commands. Please, wait for results')

  const echoInput = async (chunk) => {
    const chunkStringified = chunk.toString();
    switch (true) {
      case chunkStringified.includes('.exit'):
        process.exit(0);
      case chunkStringified.trim() === 'up':
        currentUrl = getDirname(up(currentUrl));
        break;
      case chunkStringified.trim() === 'ls':
        ls(currentUrl);
        break;
      case chunkStringified.trim().startsWith('cd '):
        currentUrl = path.isAbsolute(chunkStringified.trim().slice(3)) 
          ? chunkStringified.trim().slice(3) 
          : path.join(currentUrl, chunkStringified.trim().slice(3));
        break;
      case chunkStringified.trim().startsWith('cat'):
        readStream(path.join(currentUrl, chunkStringified.trim().slice(4)));
      break; 
    }      

    fs.stat(currentUrl,(err) => {
      if (err) {
        console.log('No such file or directory');
        currentUrl = currentUrl.slice(0, currentUrl.lastIndexOf('\\'))
      } else {
        console.log(`You are currently in ${currentUrl}`)
        console.log('You are welcome to print commands. Please, wait for results')
      }
    })  
  };

  process.stdin.on('data', echoInput);

  process.on('exit', () => {
     console.log(`Thank you for using File Manager, ${Username}, goodbye!`);
  });
  
//   process.on('SIGINT', () => {
//     process.stdout.write(`Thank you for using File Manager, ${Username}, goodbye!`);
//  });
};

start();