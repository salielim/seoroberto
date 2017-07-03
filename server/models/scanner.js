var Scanner = require("crawler");

var c = new Scanner({
    maxConnections : 10,
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        } else {
            var $ = res.$; // $ is Cheerio by default

            var url = res.request.uri.href;
            var title = $("title").text();
            var metaDescription = $("meta[name='description']").attr('content');
            var h1 = $("h1").text();
            var h2 = $("h2").text();

            console.log("URL: " + url);
            console.log("Title: " + title);
            console.log("Meta Description: " + metaDescription);
            console.log("H1: " + h1);
            console.log("H2: " + h2);
            console.log("---------");
        }

        var httpReg = new RegExp(/http|www/);
        var symbReg = new RegExp(/#|%|\?|:/);
        $("a").each(function(index,a) {
            var hrefAttr = $(a).attr('href');
            if (hrefAttr==undefined) {
                // if ahref value is undefined, skip it
                //console.log("undefined URL slug");
            } else if (hrefAttr.match(symbReg)) {
                // if ahref value contains #, % or ?, skip it
                //console.log("slug contains symbols");
            } else if (hrefAttr.match(httpReg)) {
                // if ahref value is full url (contains http), pop into queue
                //console.log("full url: " + hrefAttr);
                var fullUrl = domainName;
                c.queue(fullUrl);
            } else {
                // if ahref value is the slug, concatenate with domain address before popping into queue
                //console.log("slug only: " + domainName + hrefAttr);
                var fullUrl = domainName + hrefAttr;
                c.queue(fullUrl);
            }
        });
        done();
    }
});

domainName = "https://www.shopback.ph"
c.queue(domainName);