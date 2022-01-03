//This is the module for utility function that needed for different controller

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
        return `${protocol}://${host}${link}`; //since link start with a '/'
    } else {
        return `${protocol}://${host}/${link}`; 
    }
}

