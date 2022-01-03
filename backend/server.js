import express from "express";
import cors from "cors";
import route from "./api/web-crawl.route.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/web-crawl", route)

app.use("*", (req, res) => {
    res.status(404).json({
        error : "Not Found"
    })
});


export default app;