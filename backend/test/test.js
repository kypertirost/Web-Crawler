import { equal } from 'assert';
import { getUrl } from "../util.js"

describe("Utitlity Unit test", function() {
  describe("getUrl Function test", () => {
    it('Absolute Link', function() {
      equal(getUrl("http://example.com"), "http://example.com");
      equal(getUrl("https://example.com"), "https://example.com");
    });

    it("relative link test with host `example.com`", () => {
        equal(getUrl("test", "example.com", "http"), "http://example.com/test");
        equal(getUrl("/test", "example.com", "http"), "http://example.com/test");
        equal(getUrl("test", "example.com", "https"), "https://example.com/test");
        equal(getUrl("/test", "example.com", "https"), "https://example.com/test");
    })
  });
});