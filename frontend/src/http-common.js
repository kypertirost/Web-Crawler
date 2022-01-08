import axios from "axios";

export default axios.create({
    baseURL: "https://webcrawlapi.herokuapp.com/api/v1/web-crawl",
    headers:{
        "Content-type" :"application/json"
    }
});