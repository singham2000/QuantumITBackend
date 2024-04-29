const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Readable } = require('stream');
const multer = require("multer");

function encodeToHttpLink(inputString) {
    const replacedString = inputString.replace(/\s+/g, '+');
    const encodedString = encodeURIComponent(replacedString);
    return encodedString;
}

const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: 'ap-southeast-2'
});

exports.uploadImage = (file) => {
    const params = {
        Bucket: 'singham',
        Key: 'profile_pictures/' + file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    return new Promise((resolve, reject) => {
        s3Client.send(new PutObjectCommand(params))
            .then((data) => {
                if (data['$metadata'].httpStatusCode === 200) {
                    resolve(`https://singham.s3.ap-southeast-2.amazonaws.com/Quantum/${encodeToHttpLink(file.originalname)}`);
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};

exports.uploadFile = (file) => {
    const params = {
        Bucket: 'singham',
        Key: 'files/' + file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    return new Promise((resolve, reject) => {
        s3Client.send(new PutObjectCommand(params))
            .then((data) => {
                if (data['$metadata'].httpStatusCode === 200) {
                    resolve(`https://singham.s3.ap-southeast-2.amazonaws.com/files/${encodeToHttpLink(file.originalname)}`);
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === "image") {
        req.video_file = false;
        cb(null, true);
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
};
exports.upload = multer({
    storage,
    // fileFilter,
    limits: {
        fileSize: 2006600,
        files: 5,
    },
});
