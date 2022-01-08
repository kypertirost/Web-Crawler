import express from "express";
import cors from "cors";
import route from "./api/web-crawl.route.js"
const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended:false}));
if (process.env.NODE_ENV == "production") {
    app.use(express.static("frontend/build"))
}

app.use("/api/v1/web-crawl", route)

app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"))
});


export default app;