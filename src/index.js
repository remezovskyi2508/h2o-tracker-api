import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirifNotExist } from './utils/createDirifNotExist.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

const boostrap = async () => {
  // await createDirifNotExist(TEMP_UPLOAD_DIR);
  // await createDirifNotExist(UPLOAD_DIR);
  await initMongoConnection();
  setupServer();
};

boostrap();
