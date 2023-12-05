var time = new Date().getTime()
console.log(time)

var hash = CryptoJS.MD5(time + "af2bfa5e8b8999a6887a51f054f4bc539e814945" + "b5cfe2a57cc83be0cb757b07557c487e").toString();
console.log(hash)

var baseWiki = 'https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=&limit=10';
var baseUrl = 'https://api.wikimedia.org/core/v1/wikipedia/en/page/bare';

var searchName;

function getData(query) {
    addSearchToHistory(query);
    updateSearchHistoryDisplay();

    // grabs the html elements that are populated and then empties them so it can repopulate them
    var textBody = document.getElementById('textBox');
    textBody.innerHTML = '';

    fetch("https://gateway.marvel.com/v1/public/characters?nameStartsWith=" + query + "&ts=" + time + "&apikey=b5cfe2a57cc83be0cb757b07557c487e&hash=" + hash)
        .then(response => {
            return response.json()
        })
        .then(locRes => {
            console.log(locRes);
            var results = locRes.data.results

            if (locRes.data.total == 0) {

                var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
                    keyboard: true
                })
                myModal.show();
            } else {
            
            for (var i = 0; i < results.length; i++) {
                console.log(results[i]);
                var name = results[i].name.toLowerCase();

                var description = results[i].description;
                var thumbnail = results[i].thumbnail.path + '.' + results[i].thumbnail.extension;
                var nameContentEl = document.createElement('h3');
                var descriptionContentEl = document.createElement('P');
                var thumbnailImgEl = document.createElement('img');
                var textBody = document.getElementById('textBox');
                textBody.appendChild(nameContentEl);
                nameContentEl.innerText = "name: " + name;
                textBody.appendChild(descriptionContentEl);
                descriptionContentEl.innerText = "description: " + description;
                textBody.appendChild(thumbnailImgEl);
                thumbnailImgEl.src = thumbnail;
                thumbnailImgEl.style.width = '50%';

                //add a button to run getWiki(name) by adding an event listener  to the button
                var wikiBtn = document.createElement('button');
                wikiBtn.textContent = "check out the Wikipedia page!";
                wikiBtn.classList.add('btn', 'btn-success', 'mb-2', 'wiki');
                wikiBtn.style.margin = '5px';
                wikiBtn.setAttribute("data-name", name);
                textBody.appendChild(wikiBtn);
            }
        }
        })
}

function getWiki(query) {
    var wikiAPI = 'https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=' + query + '&limit=10';

    // grabs the API response and pulls the important datapoints
    fetch(wikiAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // checks if the description in the data has "marvel" in it in order to pick out the desired objects and grabs the key data point
            var hasMarvel = false;

            for (var i = 0; i < data.pages.length; i++) {
                var description = data.pages[i].description;
                var key;
                console.log(description);
                if (description.includes("Marvel") && description.includes("Comics")) {
                    key = data.pages[i].key;
                    console.log(key);
                    hasMarvel = true;
                    break
                }
            }
            if (!hasMarvel) {
                console.log("showing modal")
                var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
                    keyboard: true
                })
                myModal.show
            } else {
                // runs getURL with the acquired key to displayed the desired information and then saves it to a history in localStorage
                goToWiki(key);
            }
        });
}


// having the key from getData, the function is able to display the desired information on the page
function goToWiki(key) {
    console.log(key);
    var urlAPI = 'https://api.wikimedia.org/core/v1/wikipedia/en/page/' + key + '/bare';

    fetch(urlAPI)
        .then(response => {
            return response.json()
        })
        .then(function (data) {
            console.log(urlAPI);
            var url = data.html_url;
            window.open(url, "_blank");
        })
}

// adds searched terms to a history array in order to recall previously searched terms
function addSearchToHistory(key) {
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!searchHistory.includes(key)) {
        searchHistory.push(key);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
}

// turns the elements form the search history array into buttons
function updateSearchHistoryDisplay() {
    var historyDiv = document.getElementById('searchHistory');
    historyDiv.innerHTML = '';

    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    var historyContainer = document.createElement('div');
    historyContainer.classList.add('mt-2');


    for (var i = 0; i < searchHistory.length; i++) {
        var searchBtn = document.createElement('button');
        searchBtn.textContent = searchHistory[i];
        searchBtn.classList.add('btn', 'btn-primary', 'mb-2', 'search');
        searchBtn.style.margin = '5px';
        searchBtn.setAttribute("data-name", searchHistory[i]);
        historyContainer.appendChild(searchBtn);
    }
    historyDiv.appendChild(historyContainer);
}

// adds the items from localStorage to the page on reload
document.addEventListener('DOMContentLoaded', function () {
    var storedSearchHistory = localStorage.getItem('searchHistory');
    if (storedSearchHistory) {
        searchHistory = JSON.parse(storedSearchHistory);
        updateSearchHistoryDisplay();
    }
});


// adds event listener to the search button to run getData
document.getElementById('searchBtn').addEventListener('click', function (event) {
    event.preventDefault()
    // grabs the value of searchFld if it isn't blank and puts it into the API urls 
    var searchName = document.getElementById('searchFld').value;
    getData(searchName);
});

// adds event listener and function to clear the searchFld on click
document.getElementById('searchFld').addEventListener('click', function () {
    document.getElementById('searchFld').value = '';
})

document.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('wiki')) {
        var name = e.target.dataset.name
        getWiki(name)
    }

    if (e.target.classList.contains('search')) {
        var name = e.target.dataset.name
        getData(name)
    }
}, false)