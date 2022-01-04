//This is the module for utility function that needed for different controller
import fetch from "node-fetch";
import cheerio from "cheerio";
/**
 * Utilitly function to get the absolute link of given url
 * @param link The url given to be parsed
 * @param host The host name for `link` to be concated
 * @param protocal The protocol for link to use. It could be `http` or `https`.
 * @returns An absolute URL
 */
export function getUrl(link, host = "", protocol = "") {
    if (link.includes("http")) {
        return link;
    } else if (link.startsWith("/")) {
        return `${protocol}//${host}${link}`; //since link start with a '/'
    } else {
        return `${protocol}//${host}/${link}`; 
    }
}

/**
 * Crawl function
 * @param url The url needed to be crawled
 * @returns Arrays of all linked that been crawled
 */
export async function crawl(url) {
    const visited = {}; //choose object for better looked up complexity
    const crawledUrl = await crawlHelper(visited, url);
    return crawledUrl;
}


/**
 * Helper function for crawling webpage. It acts as the main logic for web crawling. It use DFS to reach every web
 * @param visited An object stored all visited link  
 * @param url The target url needed to be crawled
 */
const crawlHelper = async (visited, url) => {
    if (visited[url]) return;
    console.log("crawling", url);
    visited[url] = true;
  
    const link = new URL(url);
    const host = link.host;
    const protocol = link.protocol;
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const links = $("a")
      .map((i, link) => link.attribs.href)
      .get();
    
    
    links
      .filter((link) => link.includes(host))
      .forEach((link) => {
        crawlHelper(visited, getUrl(link, host, protocol));
      });
    return links
}