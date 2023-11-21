import multer from 'multer'
import path from 'path'

const storage= multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null, "BackEnd/public/images")
    },
    filename:(req,file,cb)=>{
        cb(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        );

    },
})

export const multerUserImage=multer({
    storage:storage
})