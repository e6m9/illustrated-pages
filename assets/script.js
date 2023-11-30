var time = new Date().getTime()
console.log(time)

var hash = CryptoJS.MD5(time + "af2bfa5e8b8999a6887a51f054f4bc539e814945" + "b5cfe2a57cc83be0cb757b07557c487e").toString();
console.log(hash)

function getParams() {
    // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
    var searchParamsArr = document.location.search.split('&');
  
    // Get the query and format values
    var query = searchParamsArr[0].split('=').pop();
    var format = searchParamsArr[1].split('=').pop();
  
    marvelApi(query, format);
  }

function marvelAPI(query, format) {

    fetch("https://gateway.marvel.com/v1/public/characters?ts=" + time + "&apikey=b5cfe2a57cc83be0cb757b07557c487e&hash=" + hash)
        // fetch(`http://gateway.marvel.com/v1/public/comics?ts=${time}&apikey=b5cfe2a57cc83be0cb757b07557c487e&hash=af2bfa5e8b8999a6887a51f054f4bc539e814945`)
        .then(response => {
            return response.json()
        })
        .then(locRes => {
            resultTextEl.textContent = locRes.search.query;
            console.log(locRes);

            resultContentEl.textContent = "";
            for (var i = 0; i < locRes.results.length; i++) {
                printResults(locRes.results[i]);
            }
        })


}




