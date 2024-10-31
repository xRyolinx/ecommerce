import multer from "multer";
import { getExtension } from "../../utils/string.js";


const upload = (folder) => {
    // filter
    const fileFilter = (req, file, cb) => {
        // if not file
        if (!file || !file.originalname) {
            cb(null, false)
        }

        // check extension
        const allowedExtensions = ['jpg', 'png', 'svg']
        const fileExtension = getExtension(file.originalname)

        if (allowedExtensions.includes(fileExtension)) {
            cb(null, true)
        }
        else {
            req.file = {}
            req.file.path = ""
            cb(null, false)
        }
    }

    // storage
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `./public/img/${folder}/`)
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, 'img-' + uniqueSuffix + '-' + file.originalname)
        },
    })

    // return
    return multer({ storage, fileFilter })
}


const uploadProduct = upload("products")
const uploadCategory = upload("categories")

export { uploadProduct, uploadCategory }