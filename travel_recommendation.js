fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);

    const results = document.getElementById('results');

    // Display countries and cities
    data.countries.forEach(country => {
      country.cities.forEach(city => {
        results.innerHTML += `
          <div class="card">
            <h3>${city.name}</h3>
            <img src="${city.imageUrl}" alt="${city.name}" width="300">
            <p>${city.description}</p>
          </div>
        `;
      });
    });

    // Display temples
    data.temples.forEach(temple => {
      results.innerHTML += `
        <div class="card">
          <h3>${temple.name}</h3>
          <img src="${temple.imageUrl}" alt="${temple.name}" width="300">
          <p>${temple.description}</p>
        </div>
      `;
    });

    // Display beaches
    data.beaches.forEach(beach => {
      results.innerHTML += `
        <div class="card">
          <h3>${beach.name}</h3>
          <img src="${beach.imageUrl}" alt="${beach.name}" width="300">
          <p>${beach.description}</p>
        </div>
      `;
    });
  })
  .catch(error => console.error('Error loading data:', error));