var time = new Date().getTime()
console.log(time)

var hash = CryptoJS.MD5(time + "af2bfa5e8b8999a6887a51f054f4bc539e814945" + "b5cfe2a57cc83be0cb757b07557c487e").toString();
console.log(hash)

function marvelAPI() {

    fetch("https://gateway.marvel.com/v1/public/characters?ts=" + time + "&apikey=b5cfe2a57cc83be0cb757b07557c487e&hash=" + hash)
        // fetch(`http://gateway.marvel.com/v1/public/comics?ts=${time}&apikey=b5cfe2a57cc83be0cb757b07557c487e&hash=af2bfa5e8b8999a6887a51f054f4bc539e814945`)
        .then(response => {
            return response.json()
        })
        .then(locRes => {
            // resultTextEl.textContent = locRes.search.query;
            console.log(locRes);
            var results = locRes.data.results

            // resultContentEl.textContent = "";
            for (var i = 0; i < results.length; i++) {
                console.log(results[i]);
                var name = results[i].name;
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
                thumbnailImgEl.style.width='50%';

            }

        })
}

marvelAPI()
