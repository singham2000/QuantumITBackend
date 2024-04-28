const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Readable } = require('stream');

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
        Key: 'profile_pictures/' + file.name,
        Body: Readable.from(fs.createReadStream(file.path)),
        ContentType: file.mimetype
    };

    return new Promise((resolve, reject) => {
        s3Client.send(new PutObjectCommand(params))
            .then((data) => {
                resolve(data.Location);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
