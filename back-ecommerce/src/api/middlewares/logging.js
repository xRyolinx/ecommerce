
const logRequest = (req, res, next) => {
    console.log(`Method: ${req.method}, URL: ${req.originalUrl}`);
    next();
}

export default logRequest