import { Storage } from '@google-cloud/storage';

async function configureBucketCors(storage, bucketName) {
  await storage.bucket(bucketName).setCorsConfiguration([
    {
      maxAgeSeconds: 3600,
      method: ['POST'],
      origin: ['http://localhost:3000'],
      responseHeader: ['Content-Type', 'access-control-allow-origin'],
    },
  ]);

  console.log(`Bucket ${bucketName} was updated with a CORS config
      to allow POST requests from localhost:3000 sharing 
      Content-Type', 'access-control-allow-origin responses across origins`);
}

const credential = JSON.parse(
  Buffer.from(process.env.GC_STORAGE_PRIVATE_KEY, "base64").toString()
);

console.log(credential, 'CREDENTIALS');
const storage = new Storage({
  projectId: process.env.GC_STORAGE_PROJECT_ID,
  credentials: {
    client_email: process.env.GC_STORAGE_CLIENT_EMAIL,
    private_key: credential.private_key,
  },
});

export default async function handler(req, res) {
  const bucket = storage.bucket('ugctent-profile-pictures');
  const filename = `${req.query.file}_` + `${new Date().valueOf()}`;
  const file = bucket.file(filename);
  const options = {
    expires: Date.now() + 1 * 60 * 1000, //  1 minute,
    fields: { 'x-goog-meta-test': 'data' },
  };

  try {
    const [response] = await file.generateSignedPostPolicyV4(options);
    res.status(200).json({ resp: response, newFileName: filename });
  } catch (error) {
    console.log(error, 'ERROR');
    res.status(500).json({ error: error.message });
  }
}
