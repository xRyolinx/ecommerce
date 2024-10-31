
const capitalize = (str) => {
    if (!str) return str; // Check for empty strings
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const getExtension = (fname) => {
    return fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
}

export { capitalize, getExtension }