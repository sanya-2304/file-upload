const express=require('express')
const app=express()
const port=5000
const cors=require('cors')
const multer=require('multer')
const connectDb=require('./db')
connectDb()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  
const upload = multer({ storage })

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin: "*"
  }));
  
// app.post('/upload', upload.single('profileImage'), (req, res)=>{
// console.log(req.body)
// console.log(req.file)
// console.log('file got uploaded')
// res.json({ success: true, message: "File uploaded successfully in backend" });
// })

const File = require('./model'); // Adjust the path as needed

app.post('/upload', upload.single('profileImage'), async (req, res) => {
  try {
    const { filename, path, mimetype, size } = req.file;

    const fileEntry = new File({
      filename,
      path,
      mimetype,
      size
    });

    await fileEntry.save();

    console.log("File metadata saved to MongoDB");

    res.json({ success: true, message: "File uploaded and saved to MongoDB" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error saving file to MongoDB" });
  }
});


app.listen(port,()=>console.log('server running.'))