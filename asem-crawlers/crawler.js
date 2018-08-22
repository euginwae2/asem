var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var  startPage = "https://www.ghanaweb.com/GhanaHomePage/NewsArchive/browse.archive.php";
console.log('visiting page ' + startPage);

request(startPage, function(error, response, body) {
    if(error) {
        consoles.log('Error: '+ error);
    }
    console.log('Code Status: ' + response.statusCode);
    if (response.statusCode === 200)
    {
        var $ = cheerio.load(body);
        console.log('Page Title: ' + $('title').text());
        crawlGhanaWebArchive($);

    }
});


function searchForWord($, word) {
    var bodyText = $('html > body').text();
    if (bodyText.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
        return true;
    }
    return false;
}

function collectInternalLinks($) {
    var allRelativeLinks = [];
    var allAbsoluteLinks = [];

    var relativeLinks  =$("a[href^='/']");
    relativeLinks.each(function() {
        allRelativeLinks.push($(this).attr('href'));
    });

    var absoluteLinks = $("a[href^='http']");
    absoluteLinks.each(function() {
        allAbsoluteLinks.push($(this).attr('href'));
    })

    console.log('Found ' + relativeLinks.length + ' relative links');
    console.log('Found ' + absoluteLinks.length + ' absolute links');
}

function crawlGhanaWebArchive ($)
{
    var articles = getArticles($);
    console.log('Number of articles: ' + articles.length);
    var visited = 0;
    articles.forEach((x)=>{
        goToArticlePage(x.Link)
        .then((res) => {
            visited++;
            console.log('articles visited: ' + visited);
            getImage(res)
            .then((results) => {
                console.log('image url ' + results);
                x.ImageSource = results;
            })
            .then(() => {console.log(x)})
            
        })
        .catch((error) =>console.error(error));
    });
   

}

function getArticles($)
{

    var articles = [];
     //get medsection1
     var medsection1 = $('#medsection1');
     //get all <ul> list
     var uls = medsection1.find('ul');
     var tag;
     uls.each( function(i,elem) {
         //get section header
         tag = $(this).prev().text();
         //get all<li> list items
         var lis = $(this).find('li');
         lis.each( function(i,elem) {
             //Get title
             var title = $(this).text();
             var link = 'https://www.ghanaweb.com' + cheerio.load(this).root().find('a').attr('href');
             var article = {
                 Title: title,
                 Link: link,
                 Tag: tag,
            }
            articles.push(article);
         });

     })
     return articles;
}

function goToArticlePage (link)
{ 
    //Visit an article page
    return new Promise (function (resolve, reject){
    request(link, function(error, response, body) {
        if(error) {
            console.error('Error: '+ error);
            reject(error);
        }
        if (response) {
            console.log('Code Status: ' + response.statusCode);
            if (response.statusCode === 200)
            {
                var $ = cheerio.load(body);
                console.log('Page Title: ' + $('title').text());
                resolve($)
            }
        }
        else{
            console.log('no respose on: ' + link)
            resolve(null);
        }
    })
})
}

function getImage($)
{
    //extract link to articles main image
    return   new Promise (function (resolve,reject) {
    //return the direct ussrl for the image
    var imgContainers = $('.article-image');
    var img = imgContainers.find('img').attr('src');
    if (img)
    {resolve(img);}
    else{
        console.log('no image found');
        reject(null)}
    })
}