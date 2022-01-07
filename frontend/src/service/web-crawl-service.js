import http from "../http-common";

export default class WebCrawlerDataService {
    static crawl(url) {
        return http.get(`/crawl?link=${url}`);
    }
}