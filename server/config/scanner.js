var Page = require("../models/page");

var Scanner = require("crawler");
var uniqid = require("uniqid");

var scanUser = null;

var c = new Scanner({
  maxConnections: 10,
  //retries: 0,
  callback: function(error, res, done) {
    if (error) {
      console.log(error);
      
    } else {
      var $ = res.$; // $ is Cheerio by default

      url = res.request.uri.href;
      metaRobots = $("meta[name='robots']").attr("content");
      title = $("title").text();
      metaDesc = $("meta[name='description']").attr("content");
      ogTitle = $("meta[property='og:title']").attr("content");
      ogDesc = $("meta[property='og:description']").attr("content");

      console.log("Crawling URL: " + url);

      // Insert page data into DB
      var newPage = new Page();
      newPage.url = url;
      newPage.meta_robots = metaRobots;
      newPage.title = title;
      newPage.meta_desc = metaDesc;
      newPage.og_title = ogTitle;
      newPage.og_desc = ogDesc;
      newPage.user_id = scanUser.id;
      newPage.domain_name = domainName
        .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
        .split("/")[0];

      newPage.scan_group_id = scanGroupId;

      newPage.save(function(err) {
        if (err) throw err;
        return done(null, newPage);
      });
    }

    var httpReg = new RegExp(/http|www/);
    var symbReg = new RegExp(/#|%|\?|:|%/);
    $("a").each(function(index, a) {
      var hrefAttr = $(a).attr("href");
      if (hrefAttr == undefined) {
        // if ahref value is undefined, skip it
        //console.log("undefined URL slug");
      } else if (hrefAttr.match(symbReg)) {
        // if ahref value contains #, % or ?, skip it
        //console.log("slug contains symbols");
      } else if (hrefAttr.match(httpReg)) {
        // if ahref value is full url (contains http), pop into queue
        //console.log("full url: " + hrefAttr);
        var fullUrl = domainName;
        if (!urlArr.includes(fullUrl) && urlArr.length < 8) {
          // if URL is not already in crawl queue
          urlArr.push(fullUrl);
          c.queue(fullUrl);
        }
      } else {
        // if ahref value is the slug, concatenate with domain address before popping into queue
        //console.log("slug only: " + domainName + hrefAttr);
        var fullUrl = domainName + hrefAttr;
        if (!urlArr.includes(fullUrl) && urlArr.length < 8) {
          // stop at 8 crawled URLs
          // if URL is not already in crawl queue
          urlArr.push(fullUrl);
          c.queue(fullUrl);
        }
      }
    });
    done();
  }
});

var domainName = "";

exports.scan = function(domain, user) {
  //domainName = "https://en.wikipedia.org";
  scanUser = user;
  urlArr = [domain.replace(/\/$/, "")];
  domainName = domain.replace(/\/$/, "");
  scanGroupId = uniqid();

  c.queue(urlArr);

  // c.on('drain', function () {
  //     console.log("done!!");
  // })
};
