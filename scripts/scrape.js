// var scrape = require('scripts/scrape.js');

// // Scrape data from one site and place it into the mongodb db
// app.get("/scrape", function(req, res) {
    
//           // Make a request call to grab the HTML body from the site of your choice
//     request("http://www.punchbowlsocial.com/location/chicago", function(error, response, html) {
        
//           // Load the HTML into cheerio and save it to a variable
//           // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
//           var $ = cheerio.load(html);
          
//         //   // An empty array to save the data that we'll scrape
//         //   var results = [];
        
//           // Select each element in the HTML body from which you want information.
//           // NOTE: Cheerio selectors function similarly to jQuery's selectors,
//           // but be sure to visit the package's npm page to see how it works
//           $("div.row").each(function(i, element,) {
        
//             // var link = $(element).children().attr("href");
//             var title = $(element).children().text();
//             var imgLink = $(element).find("a").attr("href");
        
//             // Save these results in an object that we'll push into the results array we defined earlier
            
//             if(title && imgLink) {
            
//             db.scrappedData.insert({
//               title: title,
//               link: imgLink
//             },
//             function(err, inserted) {
//               console.log(inserted);
//                 if (err) {
//                   // Log the error if one is encountered during the query
//                   console.log(err);
//                 }
//                 else {
//                   // Otherwise, log the inserted data
//                   console.log(inserted);
//                 }
//               });
//           };
    
//         });
//       });
    
//       // Send a "Scrape Complete" message to the browser
//       res.send("Scrape Complete");
//     });