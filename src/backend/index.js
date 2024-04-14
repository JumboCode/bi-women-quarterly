const express = require("express");
const { google } = require("googleapis");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

let uploads = [];

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const uploadDir = path.join(path.dirname(__dirname), "uploads");
        callback(null, `${uploadDir}`);
    },
    filename: function (req, file, callback) {
        const extension = file.originalname.split(".").pop();
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();

        const date = year + "-" + month + "-" + day;
        callback(
            null,
            `${file.originalname.split(".")[0]}-${date}.${extension}`
        );
    }
    // hihi:
});

const upload = multer({ storage: storage });

app.use(express.static("public"));

app.get("/thumbnail", async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "key.json",
        scopes: ["https://www.googleapis.com/auth/drive"]
    });

    const drive = google.drive({
        version: "v3",
        auth
    });

    const response = await drive.files.get({
        fileId: req.body,
        fields: "thumbnailLink"
    });

    return response.result.thumbnailLink;
});

app.get("/upload", async (req, res) => {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: "key.json",
            scopes: ["https://www.googleapis.com/auth/drive"]
        });

        const drive = google.drive({
            version: "v3",
            auth
        });

        const responses = [];

        while (uploads.length > 0) {
            const file = uploads.shift();

            console.log(file);
            await drive.files
                .create({
                    requestBody: {
                        name: file.filename,

                        // update parent ID based on dest google drive folder
                        parents: ["1GWQygniBTLm7aE4jPFWi3jIt8v7NJiK0"]
                    },
                    media: {
                        mimeType: file.mimetype,
                        body: fs.createReadStream(file.path)
                    }
                })
                .then(response => {
                    console.log(response);

                    fs.unlink(file.path, err => {
                        if (err) {
                            console.error(err);
                            return res
                                .status(500)
                                .send("Error deleting local file.");
                        }
                    });

                    const permissions = {
                        type: "anyone",
                        role: "writer"
                    };
                    drive.permissions.create({
                        resource: permissions,
                        fileId: response.data.id,
                        fields: "id"
                    });

                    responses.push({
                        name: response.data.name,
                        id: response.data.id,
                        thumbnail:
                            "https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png"
                    });
                });

            await drive.files
                .get({
                    fileId: responses[responses.length - 1].id,
                    fields: "thumbnailLink"
                })
                .then(res => {
                    // Checks if thumbnail link is not undefined, means it's an image that has a thumbnail
                    if (res.data.thumbnailLink != undefined) {
                        responses[responses.length - 1].thumbnail =
                            res.data.thumbnailLink;
                    }
                });
        }
        res.json({ body: responses });
    } catch (error) {
        console.error("Error uploading files:", error);
        res.status(500).json({
            error: "An error occurred during file upload."
        });
    }
});

app.post("/update", upload.any("inputFile"), async (req, res) => {
    uploads.push(req.files[0]);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;