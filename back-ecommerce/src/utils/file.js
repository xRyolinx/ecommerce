
const getFile = (file) => {
    if (file) {
        return file.path.replace(/^public[\\/]/, '')
    }
    else {
        return ""
    }
}

export { getFile }