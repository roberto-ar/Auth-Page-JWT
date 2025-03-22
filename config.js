import path from 'node:path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERVER_WEB = path.join(__dirname, 'web');
const { PORT = 3000 } = process.env;
const SALT_ROUNDS = 3;
const SECRET_JWT_KEY = "this_is_secret_jwt_token_key_by_Roberto_Arias_learning_proyect";
export { PORT, SALT_ROUNDS, SECRET_JWT_KEY, SERVER_WEB }