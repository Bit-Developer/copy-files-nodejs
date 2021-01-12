import * as fs from "fs"
import * as path from 'path'

export const ignoredFiles = ['gitignore', '.DS_Store'];

export const rootSrc = path.join(__dirname, '..', 'source');
export const rootDest = path.join(__dirname, '..', 'target');

export function createDirectories(names: string[]) {
  names.forEach(name => {
    const dir = path.join(rootDest, name);
    fs.mkdirSync(dir, { recursive: true, });
  });
}

export function copyFiles(names: string[]) {
  names.forEach(name => {
    const dir = path.join(rootDest, name);
    fs.mkdirSync(dir, { recursive: true, });
  });
}

// recursively copy directory
function deepCopy(pathSrc: string, pathDest: string) {
  let files = fs.readdirSync(pathSrc);
  files
    .filter((file) => {
      for (let filename of ignoredFiles) {
        if (file.includes(filename)) {
          console.log(`[${file}] is ignored.`);
          return false;
        }
      }
      return true;
    })
    .forEach((file) => {
      let fullPath = path.join(pathSrc, file);
      if (fs.lstatSync(fullPath).isDirectory()) {
        // copy sub directories
        deepCopy(fullPath, path.join(pathDest, file));
      } else {
        const content = fs.readFileSync(fullPath);
        const targetFile = path.join(pathDest, file);
        fs.mkdirSync(pathDest, { recursive: true, })
        fs.writeFileSync(targetFile, content)
      }
    })
}

const dirs: string[] = [''];
createDirectories(dirs);
deepCopy(rootSrc, rootDest)