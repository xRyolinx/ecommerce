import dotenv from "dotenv"

dotenv.config()

export const SERVER_HOSTNAME = process.env.SERVER_HOST || 'localhost';
export const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8000;

export const SERVER = {
    SERVER_HOSTNAME,
    SERVER_PORT
}

export const DB_URL = process.env.DB_URL;
export const JWT_SECRET = process.env.JWT_SECRET;