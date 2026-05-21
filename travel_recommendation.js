let travelData = {};

// Fetch JSON data
fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
      travelData = data;
      console.log(data);
  })
  .catch(error => console.log('Error:', error));


// Get HTML elements
const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');
const resultsDiv = document.getElementById('results');


// Search Button Event
searchBtn.addEventListener('click', () => {

    // Convert user input to lowercase
    const keyword = document
        .getElementById('searchInput')
        .value
        .toLowerCase();

    

    // Clear previous results
    resultsDiv.innerHTML = '';

    // BEACH SEARCH
    if(keyword === 'beach' || keyword === 'beaches') {

        travelData.beaches.forEach(beach => {

            resultsDiv.innerHTML += `
                <div class="result-item">

                    <h2>${beach.name}</h2>

                    <img 
                        src="${beach.imageUrl}" 
                        alt="${beach.name}"
                        width="300"
                    >

                    <p>${beach.description}</p>

                </div>
            `;
        });
    }

    // TEMPLE SEARCH
    else if(keyword === 'temple' || keyword === 'temples') {

        travelData.temples.forEach(temple => {

            resultsDiv.innerHTML += `
                <div class="result-item">

                    <h2>${temple.name}</h2>

                    <img 
                        src="${temple.imageUrl}" 
                        alt="${temple.name}"
                        width="300"
                    >

                    <p>${temple.description}</p>

                </div>
            `;
        });
    }

    // COUNTRY SEARCH
else {

    let found = false;

    travelData.countries.forEach(country => {

        if(country.name.toLowerCase() === keyword) {

            found = true;

            const timeZone = countryTimeZones[keyword];

            const currentTime = timeZone
                ? getCountryTime(timeZone)
                : "Time not available";

            country.cities.forEach(city => {

                resultsDiv.innerHTML += `
                    <div class="result-card">

                        <img src="${city.imageUrl}" alt="${city.name}">

                        <h2>${city.name}</h2>

                        <p>${city.description}</p>

                        <p><strong>Local Time:</strong> ${currentTime}</p>

                    </div>
                `;
            });
        }
    });

    if(!found) {
        resultsDiv.innerHTML = `
            <h2 style="color:white;">No recommendations found.</h2>
        `;
    }
}

});


// Reset Button Event
resetBtn.addEventListener('click', () => {

    document.getElementById('searchInput').value = '';

    resultsDiv.innerHTML = '';

});

const countryTimeZones = {
    australia: "Australia/Sydney",
    japan: "Asia/Tokyo",
    india: "Asia/Kolkata",
    cambodia: "Asia/Phnom_Penh",
    brazil: "America/Sao_Paulo"
};

