const list = document.getElementById("movie-container")
const allButton = document.getElementById("all-button")
const disneyButton = document.getElementById("disney-button")
const marvelButton = document.getElementById("marvel-button")
const pixarButton = document.getElementById("pixar-button")
list.innerHTML = ""


// Define the API endpoint and headers
const url = 'https://movie-database-alternative.p.rapidapi.com/?s=Movie%';
const disneyUrl = 'https://movie-database-alternative.p.rapidapi.com/?s=Disney%';
const marvelUrl = 'https://movie-database-alternative.p.rapidapi.com/?s=Marvel%';
const pixarUrl = 'https://movie-database-alternative.p.rapidapi.com/?s=Pixar%';

const headers = {
  'X-Rapidapi-Key': '17f580a68fmsh3ee99abb6eb19c0p119d47jsne537bdb96906',
  'X-Rapidapi-Host': 'movie-database-alternative.p.rapidapi.com',
};

async function getMovieData() {
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
        const addToWatchlistButtons = document.querySelectorAll(".add-to-watchlist");
        addToWatchlistButtons.forEach(button => {
        button.addEventListener("click", addToWatchList);
      });
    }
  })
  .catch(error => {
    console.error('There was an error!', error); // Handle any errors that occur
  });
  
}

getMovieData()


async function getDisneyMovieData() {
  list.innerHTML = ""
  fetch(disneyUrl, { method: 'GET', headers: headers })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Disney Data:', data);
    if(data.Search.length > 20) {
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
  })
  .catch(error => {
    console.error('There was an error!', error); // Handle any errors that occur
  });
  
}
function addToWatchList() {
    let watchlistItems
    if (getLocalStorage("watchlist")) {
      watchlistItems = getLocalStorage("watchlist");
      watchlistItems += 1
      
  } else {
      setLocalStorage("watchlist", watchlistItems += 1)
  }

  setLocalStorage("watchlist", watchlistItems)
}

async function getMarvelMovieData() {
  list.innerHTML = ""
  fetch(marvelUrl, { method: 'GET', headers: headers })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Marvel Data:', data);
    if(data.Search.length > 20) {
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
  })
  .catch(error => {
    console.error('There was an error!', error); // Handle any errors that occur
  });
  
}



async function getPixarMovieData() {
  list.innerHTML = ""
  fetch(pixarUrl, { method: 'GET', headers: headers })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Pixar Data:', data);
    if(data.Search.length > 20) {
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
  })
  .catch(error => {
    console.error('There was an error!', error); // Handle any errors that occur
  });
  
}


allButton.addEventListener("click", getMovieData)
disneyButton.addEventListener("click", getDisneyMovieData)
marvelButton.addEventListener("click", getMarvelMovieData)
pixarButton.addEventListener("click", getPixarMovieData)

const addButton = document.querySelectorAll(`add-to-watchlist`)
addButton.addEventListener("click", addToWatchList)


function addToWatchList(event) {
  // Get the movie title from the clicked element's parent div
  const movieTitle = event.target.closest('#listItem').querySelector('#movie-title').textContent;

  // Retrieve the existing watchlist from localStorage
  let watchlistItems = getLocalStorage("watchlist") || [];

  // Check if the movie is already in the watchlist
  if (!watchlistItems.includes(movieTitle)) {
    // Add the movie title to the watchlist if it's not already there
    watchlistItems.push(movieTitle);

    // Save the updated watchlist to localStorage
    setLocalStorage("watchlist", watchlistItems);
    alert(`${movieTitle} has been added to your watchlist!`);
  } else {
    alert(`${movieTitle} is already in your watchlist.`);
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

const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=40.7608&lon=-111.8910&appid=53778186298c1e2280bfff587895ed1d&units=imperial'
  async function forecastFetch() {
    try {
      const response = await fetch(forecastUrl);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // testing only
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  forecastFetch()
