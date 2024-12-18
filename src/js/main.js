const list = document.getElementById("pet-list")


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
  // Make the HTTP GET request using the Fetch API
  fetch(url, { method: 'GET', headers: headers })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    return response.json(); // Parse the response as JSON
  })
  .then(data => {
    console.log('Movie Data:', data); // Log the data to the console
    if(data.Search.length > 20) {
      for (let i=0; i < 20; i++) {
        const listItem = document.createElement('li'); // Create an <li> element
          listItem.textContent = data.Search[i].Title; // Set the text of the <li> to the movie title
          list.appendChild(listItem);
      } 
    } else {
      for (let i=0; i < data.Search.length; i++) {
        const listItem = document.createElement('div');
        // listItem.setAttribute('id', )
          // listItem.textContent = data.Search[i].Title; 
          listItem.innerHTML = `
            <img src="${data.Search[i].Title}" alt="movie poster of ${data.Search[i].Title}">
            <h2>${data.Search[i].Title}</h2>
            <h3>test</h3>
          `
          
          list.appendChild(listItem);
        }
    }
  })
  .catch(error => {
    console.error('There was an error!', error); // Handle any errors that occur
  });
  
}

getMovieData()


async function getDisneyMovieData() {
  // Make the HTTP GET request using the Fetch API
  fetch(disneyUrl, { method: 'GET', headers: headers })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    return response.json(); // Parse the response as JSON
  })
  .then(data => {
    console.log('Disney Movie Data:', data); // Log the data to the console
  })
  .catch(error => {
    console.error('There was an error!', error); // Handle any errors that occur
  });
}

getDisneyMovieData()

async function getMarvelMovieData() {
  // Make the HTTP GET request using the Fetch API
  fetch(marvelUrl, { method: 'GET', headers: headers })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    return response.json(); // Parse the response as JSON
  })
  .then(data => {
    console.log('Marvel Movie Data:', data); // Log the data to the console
  })
  .catch(error => {
    console.error('There was an error!', error); // Handle any errors that occur
  });
}


async function getPixarMovieData() {
  // Make the HTTP GET request using the Fetch API
  fetch(pixarUrl, { method: 'GET', headers: headers })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    return response.json(); // Parse the response as JSON
  })
  .then(data => {
    console.log('Pixar Movie Data:', data); // Log the data to the console
  })
  .catch(error => {
    console.error('There was an error!', error); // Handle any errors that occur
  });
}

