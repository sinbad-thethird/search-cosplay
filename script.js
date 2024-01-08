// script.js
function readCSV(file, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          callback(xhr.responseText);
        } else {
          console.error('Failed to load CSV file.');
        }
      }
    };
    xhr.open('GET', file, true);
    xhr.send();
  }
  
  function displayAllCharacters() {
    const animeSelect = document.getElementById('animeSelect');
    const selectedAnime = animeSelect.value;
  
    if (!selectedAnime) {
      alert('Please select an anime.');
      return;
    }
  
    readCSV('characters.csv', function (csvData) {
      const rows = csvData.trim().split('\n');
      const characters = rows.map(row => {
        const [name, series, imageUrl] = row.split(',');
        return { name, series, imageUrl };
      });
  
      const animeCharacters = characters.filter(character => character.series.toLowerCase() === selectedAnime.toLowerCase());
  
      if (animeCharacters.length === 0) {
        alert(`No characters found for the anime "${selectedAnime}".`);
        return;
      }
  
      // Display all images of the selected anime
      const imageContainer = document.getElementById('imageContainer');
      imageContainer.innerHTML = ''; // Clear previous images
  
      animeCharacters.forEach(character => {
        const imgElement = document.createElement('img');
        imgElement.src = character.imageUrl;
        imgElement.alt = character.name;
        imgElement.classList.add('characterImage');
  
        imageContainer.appendChild(imgElement);
      });
    });
  }
  