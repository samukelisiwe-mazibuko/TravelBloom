const recommendations = {
  beach: ["Maldives", "Bali", "Seychelles"],
  mountain: ["Swiss Alps", "Mount Kilimanjaro", "Rocky Mountains"],
  city: ["New York", "Tokyo", "Paris"]
};

function handleSearch() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const resultsDiv = document.getElementById("results");

  resultsDiv.innerHTML = "";

  let found = false;

  for (let key in recommendations) {
    if (input.includes(key)) {
      found = true;

      const list = document.createElement("ul");

      recommendations[key].forEach(place => {
        const item = document.createElement("li");
        item.textContent = place;
        list.appendChild(item);
      });

      resultsDiv.appendChild(list);
    }
  }

  if (!found) {
    resultsDiv.innerHTML = "<p>No recommendations found. Try 'beach', 'city', or 'mountain'.</p>";
  }
}