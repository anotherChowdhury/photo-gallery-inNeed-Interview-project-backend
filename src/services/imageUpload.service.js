import multer, { diskStorage } from 'multer'
import * as fs from 'fs'

const storage = diskStorage({
  destination: function (req, file, cb) {
    const { albumId } = req.body
    const { userId } = req

    const path = `./images/${userId}/${albumId}`
    console.log(path)
    fs.mkdirSync(path, { recursive: true })
    cb(null, path)
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + getSafeFileName(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  console.log(file)
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') cb(null, true)
  else {
    cb(new Error('Only images are allowed'))
  }
}

const getSafeFileName = (name) => {
  const unSafeCharacters = ['[', ']', '{', '}', '|', `\\`, `”`, `%`, `~`, `#`, `<`, `>`]
  for (const unSafeCharacter of unSafeCharacters) name.replaceAll(unSafeCharacter, '')
  return name
}

export default multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})
