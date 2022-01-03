import fetch from "node-fetch";
import cheerio from "cheerio";


const url = "";

const visited = {};
const crawl = async ({ url, ignore }) => {
    if (seenUrls[url]) return;
    console.log("crawling", url);
    seenUrls[url] = true;
  
    const { host, protocol } = urlParser.parse(url);
  
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const links = $("a")
      .map((i, link) => link.attribs.href)
      .get();
  
    const imageUrls = $("img")
      .map((i, link) => link.attribs.src)
      .get();
  
    imageUrls.forEach((imageUrl) => {
      fetch(getUrl(imageUrl, host, protocol)).then((response) => {
        const filename = path.basename(imageUrl);
        const dest = fs.createWriteStream(`images/${filename}`);
        response.body.pipe(dest);
      });
    });
  
    links
      .filter((link) => link.includes(host) && !link.includes(ignore))
      .forEach((link) => {
        crawl({
          url: getUrl(link, host, protocol),
          ignore,
        });
      });
  };
export default class CrawlCtrl {
    
    static async apiGetCrawlResult(req, res, next) {
        //if the url is visited, ignore 
        if (seenUrls[url]) return;
        console.log("crawling", url);
        seenUrls[url] = true;

        const { host, protocol } = urlParser.parse(url);

        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        const links = $("a")
            .map((i, link) => link.attribs.href)
            .get();

        const imageUrls = $("img")
            .map((i, link) => link.attribs.src)
            .get();

        imageUrls.forEach((imageUrl) => {
            fetch(getUrl(imageUrl, host, protocol)).then((response) => {
            const filename = path.basename(imageUrl);
            const dest = fs.createWriteStream(`images/${filename}`);
            response.body.pipe(dest);
            });
        });

        links
            .filter((link) => link.includes(host) && !link.includes(ignore))
            .forEach((link) => {
            crawl({
                url: getUrl(link, host, protocol),
                ignore,
            });
            });

    }
}