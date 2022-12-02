const { GetObjectCommand,S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3Config = new S3Client({
    region: 'ap-northeast-1',
    credentials: {
        accessKeyId: process.env.AWS_IAM_USER_KEY,
        secretAccessKey: process.env.AWS_IAM_USER_SECRET,
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const multerS3Config = multerS3({
    s3: s3Config,
    bucket: "jwtimages",
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        console.log(file)
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
});

const upload = multer({
    storage: multerS3Config,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

const streamToString = (stream) =>
    new Promise((resolve, reject) => {
      const chunks = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("error", reject);
      stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
});

const getFile = async (key)=>{
    try {
		console.log("> Getting content from S3")
		const command = new GetObjectCommand({
			Key: key,
			Bucket: AWS_BUCKET_NAME,
		})
        const { Body } = await s3Config.send(command);
        const bodyContents = await streamToString(Body);
        return bodyContents;
	} catch {
		console.log(`> Error.`)
	}
};
module.exports = {upload,getFile}