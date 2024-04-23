const express = require("express");
const { google } = require("googleapis");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const { Readable } = require("stream");

const app = express();
app.use(cors());

let uploads = [];

// const storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         const uploadDir = "/tmp/";
//         callback(null, `${uploadDir}`);
//     },
//     filename: function (req, file, callback) {
//         const extension = file.originalname.split(".").pop();
//         const today = new Date();
//         const day = String(today.getDate()).padStart(2, "0");
//         const month = String(today.getMonth() + 1).padStart(2, "0");
//         const year = today.getFullYear();

//         const date = year + "-" + month + "-" + day;
//         callback(
//             null,
//             `${file.originalname.split(".")[0]}-${date}.${extension}`
//         );
//     }
// });

const upload = multer({ storage: multer.memoryStorage() });

app.use(express.static("public"));

app.get("/thumbnail", async (req, res) => {
    const id = req.query.id;
    if (!id) {
        res.status(400).json({ error: "No file ID provided" });
    }

    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, "key.json"),
        scopes: ["https://www.googleapis.com/auth/drive"]
    });

    const drive = google.drive({
        version: "v3",
        auth
    });

    await drive.files.get({
        fileId: id,
        fields: "thumbnailLink"
    })
    .then(response => {
        return response.data.thumbnailLink;
    })
    .then(link => res.status(200).json({ body: link }))
    .catch(_ => res.status(200).json({ body: "https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png" }));
});

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
                .then(response => {
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
        console.log(file);
        uploads.push(file);
    }
    res.status(200).send("Successfully updated");
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;