import os from 'os';

const osInfo = (params) => {
  switch (true) {
    case params === '--EOL':
      console.log(JSON.stringify(os.EOL))
      break;
    case params === '--cpus':
      console.log(os.cpus())  
      break;
    case params === '--homedir':
      console.log(os.homedir()) 
      break;
    case params === '--username':
      console.log(os.userInfo().username) 
      break; 
    case params === '--architecture':
      console.log(os.arch()) 
      break; 
    default:
      console.log('Invalid input')
  }
}
export default osInfo;