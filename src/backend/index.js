const express = require("express");
const { google } = require("googleapis");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const uploadDir = path.join(path.dirname(__dirname), "..", "uploads");
        callback(null, `${uploadDir}`);
    },
    filename: function (req, file, callback) {
        const extension = file.originalname.split(".").pop();
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();

        const date = year + "-" + month + "-" + day;
        callback(null, `${file.originalname.split(".")[0]}-${date}.${extension}`);
    }
});

const upload = multer({ storage: storage });

app.use(express.static("public"));

app.post("/upload", upload.any("files"), async (req, res) => {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: "backend/key.json",
            scopes: ["https://www.googleapis.com/auth/drive"]
        });

        const drive = google.drive({
            version: "v3",
            auth
        });

        const files = req.files;
        const responses = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const response = await drive.files
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
                    fs.unlink(file.path, err => {
                        if (err) {
                            console.error(err);
                            return res
                                .status(500)
                                .send("Error deleting local file.");
                        }
                    });
                    return response;
                });

            responses.push(response);
        }
        res.json({ body: responses });
    } catch (error) {
        console.error("Error uploading files:", error);
        res.status(500).json({
            error: "An error occurred during file upload."
        });
    }
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
