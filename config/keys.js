module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
  uploadRoot: process.env.UPLOAD_ROOT,
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsSecretKey: process.env.AWS_SECRET_KEY,
  s3BucketName: process.env.S3_BUCKET_NAME,
  awsRegion: process.env.AWS_REGION,
};
