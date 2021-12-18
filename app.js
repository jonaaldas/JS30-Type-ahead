const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then(res => res.json())
  .then(data => cities.push(...data));

let input = document.querySelector('input');
let suggestions = document.querySelector('.suggestions');

input.addEventListener('change', getData);
input.addEventListener('keyup', getData);

function getData() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
      return `
      <li>
        <span class='name'>${place.city}, ${place.state}</span>
        <span class='population'> ${place.population}</span>
      </li>
      `;
  }).join('');
  suggestions.innerHTML = html;
}

function findMatches(wordToMatch, cities){
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  })
}