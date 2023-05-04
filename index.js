// const express = require("express");
// const app = express();
// const port = 8080;
// const path = require("path");
// const { Storage } = require("@google-cloud/storage");
// const Multer = require("multer");
// const src = path.join(__dirname, "views");
// app.use(express.static(src));
// const multer = Multer({
//   storage: Multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024, // No larger than 5mb, change as you need
//   },
// });

// // let projectId = "";
// // let keyfilename = "";
// // const storage = new Storage({
// //   projectId,
// //   keyFilename,
// // });

// let projectId = "playground-s-11-fe8fc556"; // Get this from Google Cloud
// let keyFilename = "mykey.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
// const storage = new Storage({
//   projectId,
//   keyFilename,
// });
// const bucket = storage.bucket("walibucket"); // Get this from Google Cloud -> Storage

// // const bucket = storage.bucket("");

// // app.post('/upload', multer.single( 'imgfile', (req, res) =>{
// //   try {
// //       if(req.file){
// //         const blob = bucket.file(req.file.originalname);
// //         const blobStream = blob.createWriteStream();

// //         blobStream.on("finish", () => {
// //           res.status(200).send("Success");
// //         });
// //         blobStream.end(req.file.buffer);
// //       }

// //   } catch(error){
// //     res.status(500).send(error);
// //   }
// // })

// app.post("/upload", multer.single("imgfile"), (req, res) => {
//   console.log("Made it /upload");
//   try {
//     if (req.file) {
//       console.log("File found, trying to upload...");
//       const blob = bucket.file(req.file.originalname);
//       const blobStream = blob.createWriteStream();

//       blobStream.on("finish", () => {
//         res.status(200).send("Success");
//         console.log("Success");
//       });
//       blobStream.end(req.file.buffer);
//     } else throw "error with img";
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.get("/", (req, res) => {
//   // res.sendfile("index.html");
//   res.sendFile(src + "/index.html");
// });

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });

const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
const src = path.join(__dirname, "views");
app.use(express.static(src));

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // No larger than 5mb, change as you need
  },
});

let projectId = "playground-s-11-fe8fc556"; // Get this from Google Cloud
let keyFilename = "playground-s-11-32ce96be-5638740c7fdc.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("walibucket_1"); // Get this from Google Cloud -> Storage

// Gets all files in the defined bucket
app.get("/upload", async (req, res) => {
  try {
    const [files] = await bucket.getFiles();
    res.send([files]);
    console.log("Success");
  } catch (error) {
    res.send("Error:" + error);
  }
});
// Streams file upload to Google Storage
app.post("/upload", multer.single("imgfile"), (req, res) => {
  console.log("Made it /upload");
  try {
    if (req.file) {
      console.log("File found, trying to upload...");
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream();

      blobStream.on("finish", () => {
        res.status(200).send("Success");
        console.log("Success");
      });
      blobStream.end(req.file.buffer);
    } else throw "error with img";
  } catch (error) {
    res.status(500).send(error);
  }
});
// Get the main index html file
app.get("/", (req, res) => {
  res.sendFile(src + "/index.html");
});
// Start the server on port 8080 or as defined
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
