const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  endpoint: 'https://nyc3.digitaloceanspaces.com',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function uploadImage(image) {
  if (!image) {
    throw new Error("Imagem não informada");
  }

  imageBuffer = Buffer.from(image, "base64");

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${Date.now()}`,
    Body: imageBuffer,
    ContentType: "image/png",
    ACL: "public-read",
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    const imageUrl = `https://portimages.nyc3.cdn.digitaloceanspaces.com/${params.Key}`;
    return imageUrl;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = uploadImage;
