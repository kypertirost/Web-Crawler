//This is the module for utility function that needed for different controller
import fetch from "node-fetch";
import cheerio from "cheerio";
import Queue from "bull";
import { EventEmitter } from "events"
import { log } from "console";
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
    const queue = new CrawlQueue();
    queue.enqueue(url);
    let result = [];
    var i = 0;
    while(!queue.isEmpty()) {
      let link = queue.dequeue();
      if(visited[link]|| Object.keys(visited).length > 1000) {
        continue;
      }
      await crawlHelper(visited, queue, link);
      i = i + 1;
    }

    return Object.keys(visited);
}

/**
 * Helper function for crawling webpage. It acts as the main logic for web crawling. It use DFS to reach every web
 * Maximum url it crawl is hardcoded to 1000 for now
 * @param visited An object stored all visited link  
 * @param url The target url needed to be crawled
 */
const crawlHelper = async (visited, queue, url) => {
    console.log("crawling", url);
    let link = new URL(url);
    const host = link.host;
    const protocol = link.protocol;
    var response;
    visited[url] = true;
    if(!url.endsWith("/")) {
      visited[`${url}/`] = true;
    }
    try{
        response = await fetch(url);
    } catch(error) {
        console.error(`${url} is not reachable`);
        return;
    }
   
    const html = await response.text();
    const $ = cheerio.load(html);
    var links = $("a")
      .map((i, link) => link.attribs.href)
      .get();
    links = links.filter((link) => getUrl(link, host,protocol).includes(
      host.startsWith("www") ? host.substring(4) : host
    ));
    var added = {}
    for (let l of links) {
      let absoluteUrl = getUrl(l,host,protocol)
      added[absoluteUrl] == true;
      if (visited[absoluteUrl] || added[absoluteUrl]) {
        continue;
      }
      
      queue.enqueue(absoluteUrl);
    }
}

// export default class CrawlQueue {
//   constructor(seed) {
//       this.visited = {};
//       this.queue = new Queue("crawl");
//       this.queue.add({url : seed});
//       this.queue.process(async (job) => {
//         var url = job.data.url;
//         if (this.visited[url] || Object.keys(this.visited).length > 1000) return;
//           console.log("crawling", url);
//           let link = new URL(url);
//           const host = link.host;
//           const protocol = link.protocol;
//           var response;
//           visited[url] = true;
//           try{
//               response = await fetch(url);
//           } catch(error) {
//               console.error(`${url} is not reachable`);
//               return;
//           }
        
//           const html = await response.text();
//           const $ = cheerio.load(html);
//           var links = $("a")
//             .map((i, link) => link.attribs.href)
//             .get();
//           links = links.filter((link) => getUrl(link, host,protocol).includes(
//             host.startsWith("www") ? host.substring(4) : host
//           ));
//           for (let l of links) {
//             this.queue.add({url : l});
//           }
//       })
//   }
// }
class CrawlQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(e) {
    this.queue.push(e);
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  length() {
    return this.queue.length;
  }
}

crawl("https://google.com")