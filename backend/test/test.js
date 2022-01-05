import expect from "expect.js"
import { getUrl, crawl } from "../util.js"

describe("Utitlity Unit test", function() {
  describe("getUrl Function test", () => {
    it('Absolute Link', function() {
      expect(getUrl("http://example.com", "example.com", "http:")).to.be("http://example.com");
      expect(getUrl("https://example.com", "example.com", "http:")).to.be("https://example.com");
    });

    it("relative link test with host `example.com`", () => {
        expect(getUrl("test", "example.com", "http:")).to.be("http://example.com/test");
        expect(getUrl("/test", "example.com", "http:")).to.be("http://example.com/test");
        expect(getUrl("test", "example.com", "https:")).to.be("https://example.com/test");
        expect(getUrl("/test", "example.com", "https:")).to.be("https://example.com/test");
    })

    it("Crawl Function test", async () => {
        const result = await crawl("http://example.com");
        //example.com contains several pages that redirect to other domain, exclude them.
        expect(result).to.eql(["http://example.com"]);
        
    })
  });
});