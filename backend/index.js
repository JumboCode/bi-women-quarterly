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
        callback(null, `${__dirname}`);
    },
    filename: function (req, file, callback) {
        const extension = file.originalname.split(".").pop();
        callback(null, `${file.originalname}-${Date.now()}.${extension}`);
    }
});

const upload = multer({ storage: storage });

app.use(express.static("public"));

// use .array to upload an array of files
app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: "key.json",
            scopes: ["https://www.googleapis.com/auth/drive"]
        });

        const drive = google.drive({
            version: "v3",
            auth
        });

        const file = req.file;
        const response = await drive.files.create({
            requestBody: {
                name: file.originalname,
                parents: ["1GWQygniBTLm7aE4jPFWi3jIt8v7NJiK0"]
            },
            media: {
                mimeType: file.mimetype,
                body: fs.createReadStream(file.path)
            }
        });

        res.json({ body: response.data });

        fs.unlink(file.path, err => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error deleting local file.");
            }
        });
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
