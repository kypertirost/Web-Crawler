import app from "./server.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 8000

app.listen(PORT, ()=> {
    console.log(`listening at the port ${PORT}`)
})