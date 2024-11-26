import express from "express";
import { S3 } from "aws-sdk";

const s3 = new S3({
    accessKeyId: "AKIA34AMC752IHHGNU7Z",
    secretAccessKey: "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",
    //endpoint: "https://e21220f4758c0870ba9c388712d42ef2.r2.cloudflarestorage.com"
})

const app = express();

app.get("/*", async (req, res) => {
    // id.100xdevs.com
    const host = req.hostname;

    const id = host.split(".")[0];
    const filePath = req.path;

    const contents = await s3.getObject({
        Bucket: "vercel-c",
        Key: `dist/${id}${filePath}`
    }).promise();
    
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    res.set("Content-Type", type);

    res.send(contents.Body);
})

app.listen(3001);