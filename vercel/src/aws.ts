import { S3 } from "aws-sdk";
import fs from "fs";

const s3 = new S3({
    accessKeyId: "****************",
    secretAccessKey: "*******************",
    //endpoint: "https://e21220f4758c0870ba9c388712d42ef2.r2.cloudflarestorage.com"
})

// fileName => output/12312/src/App.jsx
// filePath => /C:/Users/91996/vercel/dist/output/12312/src/App.jsx
export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercel-c",
        Key: fileName,
    }).promise();
    console.log(response);
}
