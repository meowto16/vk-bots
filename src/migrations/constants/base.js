import { URL } from "url";
import path from "path";

const __filename = new URL('', import.meta.url).pathname
const __dirname = new URL('.', import.meta.url).pathname

const MIGRATIONS_DIR = path.resolve(__dirname, '..')

export {
    __filename,
    __dirname,
    MIGRATIONS_DIR
}