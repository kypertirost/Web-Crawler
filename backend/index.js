import app from "./server.js";
import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config();
const PORT = process.env.PORT || 8000
mongoose.connect(process.env.CRAWL_DB_URI,   
    {
    maxPoolSize : 50,
    wtimeoutMS : 2500,
    useNewUrlParser : true
}).then(()=> {
    console.log("connected to database!");
  }).catch((err) => {
        console.error(`Cannot access databases due to ${error}`)
    });
app.listen(PORT, ()=> {
    console.log(`listening at the port ${PORT}`)
})