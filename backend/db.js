const mongoose = require('mongoose');
const connectDb=async()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/fileuploads', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err)); 
}
module.exports=connectDb;