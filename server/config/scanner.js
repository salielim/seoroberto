var Page = require('../app/models/page');
var Scanner = require("crawler");

var c = new Scanner({
    maxConnections: 10,
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$; // $ is Cheerio by default

            url = res.request.uri.href;
            metaRobots = $("meta[name='robots']").attr('content');
            title = $("title").text();
            metaDesc = $("meta[name='description']").attr('content');
            ogTitle = $("meta[property='og:title']").attr('content');
            ogDesc = $("meta[property='og:description']").attr('content');
            // h1 = $("h1").text();
            // h2 = $("h2").text();

            console.log("URL: " + url);
            console.log("Meta Robots: " + metaRobots);
            console.log("Title: " + title);
            console.log("Meta Description: " + metaDesc);
            console.log("OG Title: " + ogTitle);
            console.log("OG Description: " + ogDesc);
            // console.log("H1: " + h1);
            // console.log("H2: " + h2);
            console.log("---------");

            // Insert page data into DB
            var newPage = new Page();
            newPage.scanned.url = url;
            newPage.scanned.meta_robots = metaRobots;
            newPage.scanned.title = title;
            newPage.scanned.meta_desc = metaDesc;
            newPage.scanned.og_title = ogTitle;
            newPage.scanned.og_desc = ogDesc;

            newPage.save(function (err) {
                if (err)
                    throw err;
                    // console.log("error");
                return done(null, newPage);
            });
        }

        var httpReg = new RegExp(/http|www/);
        var symbReg = new RegExp(/#|%|\?|:|%/);
        $("a").each(function (index, a) {
            var hrefAttr = $(a).attr('href');
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
                if (!urlArr.includes(fullUrl)) { // if URL is not already in crawl queue
                    urlArr.push(fullUrl);
                    c.queue(fullUrl);
                }
            } else {
                // if ahref value is the slug, concatenate with domain address before popping into queue
                //console.log("slug only: " + domainName + hrefAttr);
                var fullUrl = domainName + hrefAttr;
                if (!urlArr.includes(fullUrl)) { // if URL is not already in crawl queue
                    urlArr.push(fullUrl);
                    c.queue(fullUrl);
                }
            }
        });
        done();
    }
});

var domainName = "";
exports.scan = function(domain) {
    //domainName = "https://en.wikipedia.org";
    console.log("im in export scan");
    urlArr = [domain];
    domainName = domain;
    c.queue(urlArr);
}
