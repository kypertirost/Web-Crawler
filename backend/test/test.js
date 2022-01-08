import expect from "expect.js";
import { getUrl, crawl } from "../util.js";
import CrawlDAO from "../dao/CrawlDAO.js";
import mongoose from "mongoose";
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
        const exampleTest = await crawl("http://example.com");
        //example.com contains several pages that redirect to other domain, exclude them.
        expect(exampleTest.title).to.be('Example Domain');
        expect(exampleTest.hrefs).to.eql(['https://www.iana.org/domains/example']);
        expect(exampleTest.images).to.be.empty();

        const googleTest = await crawl("https://www.google.com");
        expect(googleTest.title).to.be('Google');
        expect(googleTest.hrefs).to.eql([
          'https://www.google.com/imghp?hl=en&tab=wi',
          'https://maps.google.com/maps?hl=en&tab=wl',
          'https://play.google.com/?hl=en&tab=w8',
          'https://www.youtube.com/?gl=US&tab=w1',
          'https://news.google.com/?tab=wn',
          'https://mail.google.com/mail/?tab=wm',
          'https://drive.google.com/?tab=wo',
          'https://www.google.com/intl/en/about/products?tab=wh',
          'http://www.google.com/history/optout?hl=en',
          'https://www.google.com/preferences?hl=en',
          'https://accounts.google.com/ServiceLogin?hl=en&passive=true&continue=https://www.google.com/&ec=GAZAAQ',
          'https://www.google.com/advanced_search?hl=en&authuser=0',
          'https://www.google.com/intl/en/ads/',
          'https://www.google.com/services/',
          'https://www.google.com/intl/en/about.html',
          'https://www.google.com/intl/en/policies/privacy/',
          'https://www.google.com/intl/en/policies/terms/'
        ]);
        expect(googleTest.images).to.eql(
          [
            'https://www.google.com/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png'
          ]
        );
    })

    // it("Crawl DAO tests", async(done) => {
    //   const result = {
    //     title : "test",
    //     images : ["test"],
    //     hrefs: ["test"]
    //   }
    //   const email = "test@test.com"
    //   const response = await CrawlDAO.addHistory(email, result);
    //   const id = response._id;
      
    //   done();
    // })
  });
});