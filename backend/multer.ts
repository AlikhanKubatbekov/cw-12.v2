import { promises as fs } from 'fs';
import path from 'path';
import multer from 'multer';
import { randomUUID } from 'crypto';
import config from './config';
import { unlink } from 'node:fs';
import { resolve } from 'node:path';

const imageStorage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    const destDir = path.join(config.publicPath, 'images');
    await fs.mkdir(destDir, { recursive: true });
    cb(null, config.publicPath);
  },
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, 'images/' + randomUUID() + extension);
  },
});

export const imagesUpload = multer({ storage: imageStorage });

export const clearImages = (imageName: string) => {
  unlink(resolve(config.publicPath, imageName), (err) => {
    if (err) {
      console.log("File doesn't exist");
      throw err;
    } else {
      console.log('Deleted file!');
    }
  });
};
