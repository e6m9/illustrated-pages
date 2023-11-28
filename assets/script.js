var time = new Date().toTimeString()
console.log(time)
var hash = CryptoJS.MD5(time + "af2bfa5e8b8999a6887a51f054f4bc539e814945" + "b5cfe2a57cc83be0cb757b07557c487e").toString();
console.log(hash)
fetch("https://gateway.marvel.com/v1/public/characters?ts=" + time +  "&apikey=b5cfe2a57cc83be0cb757b07557c487e&hash=" + hash)
.then(response => {
    return response.json()
}).then(data => {
    console.log(data);
})