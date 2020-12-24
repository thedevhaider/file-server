const AWS = require("aws-sdk");
const keys = require("../config/keys");

class S3Util {
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: keys.awsAccessKey,
      secretAccessKey: keys.awsSecretKey,
      region: keys.awsRegion,
    });
  }

  async upload(fileContent, root, userId) {
    // Setting up S3 upload parameters
    const params = {
      Bucket: keys.s3BucketName,
      Key: `${root}/${userId}/${this.generateFileName(fileContent.fileType)}`,
      Body: fileContent.body,
      ContentEncoding: "base64",
      ContentType: fileContent.mimeType,
    };

    try {
      // Uploading image to S3 Bucket
      const data = await this.s3.upload(params).promise();
      console.log(`File uploaded successfully. ${data.Location}`);
      return data.Location;
    } catch (error) {
      throw error;
    }
  }

  async delete(url, userId) {
    // Setting up params to delete S3 Object
    const urlParts = url.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const params = {
      Bucket: keys.s3BucketName,
      Key: `${keys.uploadRoot}/${userId}/${fileName}`,
    };

    try {
      // Deleting S3 Object
      const data = await this.s3.deleteObject(params).promise();
      console.log("File deleted successfully");
      return data;
    } catch (error) {
      throw error;
    }
  }

  nameToFolder(name) {
    return name.toLowerCase().split(" ").join("_");
  }

  generateFileName() {
    return `${Date.now().toString().split("").reverse().join("")}.jpg`;
  }

  base64ToFile(base64Image) {
    let mimeType = base64Image.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
    let fileType = base64Image.match(/[^:/]\w+(?=;|,)/)[0];
    let body = Buffer.from(
      base64Image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    return { mimeType, fileType, body };
  }
}

module.exports = S3Util;
