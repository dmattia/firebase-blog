'use strict';

var https = require('https');

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    var xml_pre_items = "<rss version='2.0'>" +
        "<channel>" +
        "<title>David Mattia Hackers Blog</title>" +
        "<link>https://d29c3fen6vwvzd.cloudfront.net</link>" +
        "<image>" +
          "<url>http://i2.mirror.co.uk/incoming/article8075004.ece/ALTERNATES/s615b/Harambe.jpg</url>" +
          "<title>David Mattia Hackers Blog</title>" +
          "<link>https://d29c3fen6vwvzd.cloudfront.net/</link>" +
        "</image>" +
        "<description>Blog for CSE 4something with pbui</description>";
        
    var xml_post_items = "</channel></rss>";
    
    /*****************
     * send GET request to Firebase
     * ***************/
    return https.get({
        host: 'blog-1a3a2.firebaseio.com',
        path: '/blogs/.json'
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            var parsed = JSON.parse(body);
            
            // Build `items` section of XML
            var xml_items = "";
            Object.keys(parsed).forEach(function(key) {
              var val = parsed[key];
              xml_items += createItemXML(key, val.title, val.content, new Date(val.time));
            });
            
            var xml = xml_pre_items + xml_items + xml_post_items;
            context.succeed(xml);
        });
    });
};

var createItemXML = function(id, title, content, dateString) {
    return "<item>" +
            "<title>" + title + "</title>" +
            "<link>https://d29c3fen6vwvzd.cloudfront.net?blog_id=" + id + "</link>" +
            "<description>" + content + "</description>" +
            "<pubDate>" + dateString + "</pubDate>" +
        "</item>";
}

