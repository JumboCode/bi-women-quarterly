const express = require("express");
const { google } = require("googleapis");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const { Readable } = require("stream");
const axios = require("axios");
const { put } = require("@vercel/blob");


const app = express();
app.use(cors());
app.use(express.static("public"));

let uploads = [];
const upload = multer({ storage: multer.memoryStorage() });

app.get("/upload", async (req, res) => {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(__dirname, "key.json"),
            scopes: ["https://www.googleapis.com/auth/drive"]
        });

        const drive = google.drive({
            version: "v3",
            auth
        });

        const responses = [];

        while (uploads.length > 0) {
            const file = uploads.shift();
            const bufferStream = new Readable({
                read() {
                    this.push(file.buffer);
                    this.push(null);
                }
            });

            await drive.files
                .create({
                    requestBody: {
                        name: file.originalname,

                        // update parent ID based on dest google drive folder
                        parents: ["1GWQygniBTLm7aE4jPFWi3jIt8v7NJiK0"]
                    },
                    media: {
                        mimeType: file.mimetype,
                        body: bufferStream
                    }
                })
                .then(async response => {
                    const permissions = {
                        type: "anyone",
                        role: "writer"
                    };
                    drive.permissions.create({
                        resource: permissions,
                        fileId: response.data.id,
                        fields: "id"
                    });

                    const thumbnail = await drive.files.get({
                        fileId: response.data.id,
                        fields: "thumbnailLink"
                    }).then(res => res);

                    let thumbnailUrl = "https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png";

                    if (thumbnail.data.thumbnailLink) {
                        const imageResponse = await axios.get(thumbnail.data.thumbnailLink, { responseType: 'arraybuffer' });
                        const imageBuffer = Buffer.from(imageResponse.data, "binary");

                        const { url } = await put(`${response.data.id}.jpeg`, imageBuffer, {
                            access: "public",
                            token: "vercel_blob_rw_cJf1K4C8ydx4HQtS_naId1XJlKaIeImHG9qWG9AEr9vMryC"
                        });
                        thumbnailUrl = url;
                    }

                    responses.push({
                        name: response.data.name,
                        id: response.data.id,
                        imageUrl: thumbnailUrl
                    });
                });
        }
        res.status(200).json({ body: responses });
    } catch (error) {
        console.error("Error uploading files:", error);
        res.status(500).json({
            error: "An error occurred during file upload."
        });
    }
});

app.post("/update", upload.any("inputFile"), async (req, res) => {
    for (const file of req.files) {
        uploads.push(file);
    }
    res.status(200).send("Successfully updated");
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;