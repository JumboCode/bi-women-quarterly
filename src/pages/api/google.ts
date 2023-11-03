import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
    keyFile: "<your credentials.json file here>",
    scopes: ["https://www.googleapis.com/auth/drive"]
});

export const getData = async () => {
    const drive = google.drive({ version: "v3", auth });
    try {
        const res = await drive.files.list();
        const files = res.data.files;

        console.log(files);
    } catch (error: any) {
        console.error("Error fetching files:", error.message);
        return null;
    }
};
