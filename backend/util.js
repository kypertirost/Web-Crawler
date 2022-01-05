//This is the module for utility function that needed for different controller
import fetch from "node-fetch";
import cheerio from "cheerio";

/**
 * Utilitly function to get the absolute link of given url
 * @param link The url given to be parsed
 * @param host The host name for `link` to be concated
 * @returns An absolute URL
 */
export function getUrl(link, host = "", protocol = "http:") {
  //handle some edge case that url will contain a white space by someone mistake
  if (link.includes(" ")) {
    link = link.replace(/ /g,'');
  }

  let url = ""
  host = host.trim();
  if(link.includes("://")) {
    return link;
  } else if (link.startsWith("/")) {
      url = `${protocol}//${host}${link}`; //since link start with a '/'
  } else {
      url = `${protocol}//${host}/${link}`; 
  }
  return new URL(url, `${protocol}//${host}`).href
}


/**
 * Crawl function
 * @param url The url needed to be crawled
 * @returns Arrays of all linked that been crawled
 */
export async function crawl(url) {
    const visited = {}; //choose object for better looked up complexity
    const crawledUrl = await crawlHelper(visited, url);
    return Object.keys(visited);
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
    var response;
    try{
        response = await fetch(url);
    } catch(error) {
        console.error(`${url} is not reachable`);
        return;
    }
   
    const html = await response.text();
    const $ = cheerio.load(html);
    const links = $("a")
      .map((i, link) => link.attribs.href)
      .get();
    links
      .filter((link) => getUrl(link, host,protocol).includes(host))
      .forEach((link) => {
        let u = getUrl(link, host,protocol)
        crawlHelper(visited, u);
      });
}

