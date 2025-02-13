import jwt from 'jsonwebtoken';

import { JWT_SECRET } from "../../config/config.js";


const verifyToken = async (req, res, next) => {
    try {
        // get header
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).send('Access Denied');
        }
        
        // get token
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send('Access Denied');
        }

        // decode
        const decodedData = jwt.verify(token, JWT_SECRET)

        // attach to req
        req.userId = parseInt(decodedData.userId);
        req.role = decodedData.role;

        // to next middleware
        next();

    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send('Expired Token');
        }
        else if (error.name === 'JsonWebTokenError') {
            return res.status(401).send('Invalid Token');
        }
        else {
            return res.status(500).send('Internal Server Error');
        }
    }
};


export default verifyToken;