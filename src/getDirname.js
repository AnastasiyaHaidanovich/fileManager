import path from 'path';
import { fileURLToPath } from 'url';

const getDirname = (folderName) => {
  return path.dirname(fileURLToPath(folderName));
}

export default getDirname;