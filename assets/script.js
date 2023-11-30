// increase API limit, add functionality to check data for "character" or "marvel_comics" and pull the data from there

var baseWiki = 'https:api.wikimedia.org/core/v1/wikipedia/en/search/page?q=&limit=1';
// pages.title .excerpt .description
var baseUrl = 'https:api.wikimedia.org/core/v1/wikipedia/en/page/bare';
// get html_url

// sets up array to collect api endpoints
var wikiData = [];

function getWiki() {
    // grabs the value of searchFld if it isn't blank and puts it into the API urls 
    var searchName = document.getElementById('searchFld').value;

    // grabs the html elements that are populated and then empties them so it can repopulate them

    if (searchName !== '') {
        var wikiAPI = 'https:api.wikimedia.org/core/v1/wikipedia/en/search/page?q=' + searchName + '&limit=1';

        // grabs the API response and pulls the important datapoints
        fetch(wikiAPI)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var title = data.pages[0].title;
                var excerpt = data.pages[0].excerpt;
                var description = data.pages[0].description;

                var superHeader = document.getElementById('supHead');
                var textBody = document.getElementById('textBox');

                superHeader.textContent = title;
                
                var excerptDisplay = document.createElement('p');
                var descDisplay = document.createElement('p');

                textBody.appendChild(excerptDisplay);
                textBody.appendChild(descDisplay);

               excerptDisplay.innerText = 'Excerpt: ' + excerpt;
               descDisplay.innerText = 'Description: ' + description;

                getURL(searchName);
            })
    }
}

function getURL(searchName) {
    var urlAPI = 'https:api.wikimedia.org/core/v1/wikipedia/en/page/' + searchName + '/bare';

    fetch(urlAPI)
        .then(response => {
            return response.json()
        })
        .then(function (data) {
            var url = data.html_url;
            var textBody = document.getElementById('textBox');

            var urlDisplay = document.createElement('p');

            textBody.appendChild(urlDisplay);

            textBody.innerText +=
                'url: ' + url;
        })
}


// adds event listener to the search button to run getWiki
document.getElementById('searchBtn').addEventListener('click', getWiki);

// adds event listener and function to clear the searchFld on click
document.getElementById('searchFld').addEventListener('click', function () {
    document.getElementById('searchFld').value = '';
})