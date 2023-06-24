import getDirname from './getDirname.js';
import up from './modules/fs/up.js';
import ls from './modules/fs/ls.js';
import renameFile from './modules/fs/rename.js';
import createFile from './modules/fs/create.js';
import moveFile from './modules/fs/move.js';
import copyFile from './modules/fs/copy.js';
import deleteFile from './modules/fs/delete.js';
import path from 'path';
import readStream from './modules/streams/read.js';
import osInfo from './modules/os/os.js';
import calcHash from './modules/hash/hash.js';
import compress from './modules/zip/compress.js';
import decompress from './modules/zip/decompress.js';
import fs from 'fs';

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
      case chunkStringified.trim().startsWith('add'):
        createFile(path.join(currentUrl, chunkStringified.trim().slice(4)));
      break; 
      case chunkStringified.trim().startsWith('rn '):
        renameFile(currentUrl, chunkStringified.trim().slice(3));
      break; 
      case chunkStringified.trim().startsWith('cp '):
        copyFile(currentUrl, chunkStringified.trim().slice(3));
      break; 
      case chunkStringified.trim().startsWith('mv '):
        moveFile(currentUrl, chunkStringified.trim().slice(3));
      break; 
      case chunkStringified.trim().startsWith('rm '):
        deleteFile(path.join(currentUrl, chunkStringified.trim().slice(3)));
      break; 
      case chunkStringified.trim().startsWith('os '):
        osInfo(chunkStringified.trim().slice(3));
      break;
      case chunkStringified.trim().startsWith('hash '):
        calcHash(chunkStringified.trim().slice(5));
      break;
      case chunkStringified.trim().startsWith('compress '):
        compress(currentUrl,chunkStringified.trim().slice(9));
      break;
      case chunkStringified.trim().startsWith('decompress '):
        decompress(currentUrl,chunkStringified.trim().slice(11));
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