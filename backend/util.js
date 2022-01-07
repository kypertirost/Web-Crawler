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
  } else if (link.split(".").length >= 3) {
    url = `${protocol}${link}`
  }
  else if (link.startsWith("/")) {
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
  console.log("crawling", url);
  let link = new URL(url);
  const host = link.host.split(".").length >=3 ? link.host : `www.${link.host}`;
  const protocol = link.protocol;
  const response = await fetch(url);
  
  const html = await response.text();
  const $ = cheerio.load(html);
  const links = $("a").map((i, link) =>
    link.attribs.href? 
    getUrl(link.attribs.href, host, protocol) : undefined).get()
    .filter((value) => value != undefined);
  const imgs = $("img").map((i, link) => getUrl(link.attribs.src, host, protocol)).get();
  const title = $("title").text();
  return {
    "title": title,
    "hrefs" : links,
    "images" : imgs
  }
}