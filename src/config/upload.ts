import crypto from "crypto";
import multer, { StorageEngine } from "multer";
import { resolve } from "path";

interface IResponse {
  storage: StorageEngine;
}

export default {
  upload(folder: string): IResponse {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (_req, file, cb) => {
          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;

          return cb(null, fileName);
        },
      }),
    };
  },
};
