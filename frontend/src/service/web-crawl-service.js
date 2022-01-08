import http from "../http-common";

export default class WebCrawlerDataService {
    static crawl(url) {
        return http.get(`/crawl?link=${url}`);
    }

    static getUserHistory(email) {
        return http.post(`/myHistory`, {
            "email": email
        });
    }

    static postUserHistory(email, url, title, hrefs, images) {
        return http.post(`/history`, {
            "email" : email,
            "crawl" : {
                "url" : url,
                "title" : title,
                "hrefs" : hrefs,
                "images" : images
            }
        });
    }

    static deleteUserHistory(id, email) {
        return http.delete(`/history`, {
            data : {
                "email" : email,
                "id" : id,
            }   
        });
    }
}