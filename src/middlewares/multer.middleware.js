const multer = require('multer');
const { promisify } = require('util')
const fs = require('fs');
const unlinkAsync = promisify(fs.unlink);

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const PATH = './public/images/general-category-profiles';
        try {
          if (fs.existsSync(PATH)) {
                cb(null, PATH)
          } else {
              fs.mkdirSync(PATH, { recursive: true });
              cb(null, PATH)
          }
        } catch(e) {
            console.error(e)
        }
    },
    filename: function (req, file, cb) {
        const id = req.path.substring(req.path.lastIndexOf('/'));
        cb(null, 'image-' + id.substring(1) + '.' + file.originalname.split('.').pop());
    }
});




const imageFileFilter = async (req, file, cb) => {
    // reject a file
    const id = req.path.substring(req.path.lastIndexOf('/'));
    const filename = '../public/images/' + 'image-' + id.substring(1) + '.' + file.originalname.split('.').pop();
    if (fs.existsSync(filename)) {
        await unlinkAsync(filename);
    }
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};




exports.uploadImage = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: imageFileFilter
});



