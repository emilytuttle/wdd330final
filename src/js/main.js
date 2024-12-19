const list = document.getElementById("movie-container")
const allButton = document.getElementById("all-button")
const disneyButton = document.getElementById("disney-button")
const marvelButton = document.getElementById("marvel-button")
const pixarButton = document.getElementById("pixar-button")
list.innerHTML = ""
let forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=40.7608&lon=-111.8910&appid=53778186298c1e2280bfff587895ed1d&units=imperial'


// Define the API endpoint and headers
const url = 'https://movie-database-alternative.p.rapidapi.com/?s=Movie%';
const disneyUrl = 'https://movie-database-alternative.p.rapidapi.com/?s=Disney%';
const marvelUrl = 'https://movie-database-alternative.p.rapidapi.com/?s=Marvel%';
const pixarUrl = 'https://movie-database-alternative.p.rapidapi.com/?s=Pixar%';

const headers = {
  'X-Rapidapi-Key': '17f580a68fmsh3ee99abb6eb19c0p119d47jsne537bdb96906',
  'X-Rapidapi-Host': 'movie-database-alternative.p.rapidapi.com',
};

async function getData(url) {
  list.innerHTML = ""
  fetch(url, { method: 'GET', headers: headers })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Movie Data:', data);
    if(data.Search.length > 50) {
      for (let i=0; i < 20; i++) {
        const listItem = document.createElement('li');
          listItem.textContent = data.Search[i].Title; 
          list.appendChild(listItem);
      } 
    } else {
      for (let i=0; i < data.Search.length; i++) {
        const listItem = document.createElement('div');
        listItem.setAttribute('id', "listItem")
          // listItem.textContent = data.Search[i].Title; 
          listItem.innerHTML = `
            <img src="${data.Search[i].Poster}" alt="movie poster of ${data.Search[i].Title} class="movie-img" width="178">
            <h1 id="movie-title">${data.Search[i].Title} (${data.Search[i].Year})</h1>
            <div class="add-to-watchlist">Add to Watchlist</div>
          `
          
          list.appendChild(listItem);

        }
        
    }
    const addToWatchlistButtons = document.querySelectorAll(".add-to-watchlist");
        addToWatchlistButtons.forEach(button => {
        button.addEventListener("click", addToWatchList);
      });
  })
  .catch(error => {
    console.error('There was an error!', error); // Handle any errors that occur
  });
}

async function getMovieData() {
  getData(url)
}

async function getDisneyMovieData() {
  getData(disneyUrl)
}

async function getMarvelMovieData() {
  getData(marvelUrl)
}

async function getPixarMovieData() {
  getData(pixarUrl)
}

getMovieData()




async function viewWatchlist() {
list.innerHTML = ""
const box = document.createElement('div');
box.setAttribute('id', "box")
list.appendChild(box);
box.setAttribute('id', "box")
const message = document.createElement('div');
box.setAttribute('id', "message")
const watching = getLocalStorage("watchlist")
if (watching) {
  message.innerHTML = `<h2 id="mywatchlistHeader">My Watchlist (${watching.length})</h2>`
}
box.appendChild(message);
 for(let i=0; i < watching.length; i++) {
  const listItem = document.createElement('div');
  listItem.setAttribute('id', "watchItem")
  listItem.textContent = watching[i]; 
  box.appendChild(listItem);
 }

}




allButton.addEventListener("click", getMovieData)
disneyButton.addEventListener("click", getDisneyMovieData)
marvelButton.addEventListener("click", getMarvelMovieData)
pixarButton.addEventListener("click", getPixarMovieData)
const watchlistButton = document.getElementById("watchlist-button")
watchlistButton.addEventListener("click", viewWatchlist)
const weatherButton = document.getElementById("weather-button")
weatherButton.addEventListener("click", viewWeather)

const addButtons = document.querySelectorAll(`add-to-watchlist`)
addButtons.forEach(button => {
  button.addEventListener("click", addToWatchList);
});




function showCustomAlert(message) {
  const alertModal = document.getElementById('custom-alert');
  const alertMessage = document.getElementById('alert-message');
  const closeButton = document.getElementById('close-alert');
  const modalContent = document.querySelector(".modal-content")

  alertMessage.textContent = message;
  alertModal.style.display = 'flex';
  closeButton.addEventListener('click', () => {
    alertModal.style.display = 'none'; 
  });

  window.addEventListener('click', (event) => {
    if (event.target === alertModal) {
      alertModal.style.display = 'none';
    }
  });
}

function addToWatchList(event) {
  const movieTitle = event.target.closest('#listItem').querySelector('#movie-title').textContent;
  let watchlistItems = [];

    if (getLocalStorage("watchlist")) {
        watchlistItems = getLocalStorage("watchlist");
        if (!Array.isArray(watchlistItems)) {
            watchlistItems = [];
            watchlistItems.push(movieTitle);
            setLocalStorage("watchlist", watchlistItems);
            showCustomAlert(`${movieTitle} has been added to your watchlist!`);
        } else {
          if (!watchlistItems.includes(movieTitle)) {
            watchlistItems.push(movieTitle);
            setLocalStorage("watchlist", watchlistItems);
            showCustomAlert(`${movieTitle} has been added to your watchlist!`);
          } else {
            showCustomAlert(`${movieTitle} is already in your watchlist!`);
            // modalContent.classList.add("already-added")
            // closeButton.classList.add("already-added-button")
            modalContent.style.setProperty("border", "3px solid #ef3232", "important");
            closeButton.style.setProperty("background-color", "#ef3232", "important");
          }
        }
        
    } else {
        watchlistItems.push(movieTitle);
        setLocalStorage("watchlist", watchlistItems);
        showCustomAlert(`${movieTitle} has been added to your watchlist!`);
        
    }
  
}


///////////////

// Local storage
// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}


////////////////
// WEATHER INFO



  async function forecastFetch() {
    list.innerHTML = ""
    try {
      const response = await fetch(forecastUrl);
      if (response.ok) {
        const data = await response.json();
        
        console.log("data list here", data)
        
        const weatherBox = document.createElement('div')
        weatherBox.setAttribute('id', "weatherBox")
        list.appendChild(weatherBox)
        const forecastBox = document.createElement('div')
        forecastBox.setAttribute('id', "forecastBox")
        weatherBox.appendChild(forecastBox)
        let contentBlock
        if (data.list[10].main.temp_min < 50) {
          contentBlock = "Brrr, that's way too cold! You should be inside!"
        } else if (data.list[10].main.temp_min > 50 && data.list[10].main.temp_min < 60) {
          contentBlock = "That's cold, you should definitely consider a movie!"
        } else if (data.list[10].main.temp_max > 60) {
          contentBlock = "That's too hot Stay in and watch a movie!</p>"
        }
        forecastBox.innerHTML=`
        <h1 id="weatherHeader">Weather<h1/>
        <div id="flex">
        <p id="weather-message">Everyone knows that the weather can play a role in your movie schedule! Check out tommorrow's forecast in Salt Lake City, and plan on a movie if the weather is bad!</p>
        <div id="weather-container">
        <p>City: ${data.city.name}</p>
        <p>Population: ${data.city.population}</p>
        <p>Date & Time: ${data.list[10].dt_txt}</p>
        <p>General Description: ${data.list[10].weather[0].description}</p>
        <p>Temperature: ${data.list[10].main.temp_min} - ${data.list[10].main.temp_max}</p>
        <p>Humidity: ${data.list[10].main.humidity} Percent</p>
        <p>Wind Angle: ${data.list[10].wind.deg} Degrees</p>
        
        </div>
        <p id="content">${contentBlock}</p>
        </div>
        
        `

      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
    
  }


  function viewWeather() {
    forecastFetch()
    
    }