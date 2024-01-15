const api_key = "https://api.quotable.io/random";
const quote = document.getElementById("quote");
const author = document.getElementById("author");



async function getQuote(url) {
    const response = await fetch(url);
    const data = await response.json();
    quote.innerHTML = data.content;
    author.innerHTML = data.author;
   
}
getQuote(api_key);

function tweet(){
window.open("https://twitter.com/intent/tweet?text=" + quote.innerHTML,);
}
