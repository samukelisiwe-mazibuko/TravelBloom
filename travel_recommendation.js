function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
   
    const page = document.getElementById(pageId);
    if (page) page.classList.add('active');
   
    const activeLink = document.querySelector(`.nav-links a[data-page="${pageId}"]`);
    if (activeLink) activeLink.classList.add('active');
   
    // Show/hide search bar — only on home page
    const searchArea = document.getElementById('searchArea');
    if (searchArea) {
      searchArea.style.display = (pageId === 'homePage') ? 'flex' : 'none';
    }
   
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
   
  // ─── Navbar scroll effect ────────────────────────────────────────
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    }
  });
   
  // ─── Fetch & Search Logic ────────────────────────────────────────
  let travelData = null;
   
  async function loadTravelData() {
    try {
      const response = await fetch('travel_recommendation_api.json');
      travelData = await response.json();
      console.log('Travel data loaded:', travelData);
    } catch (err) {
      console.error('Failed to load travel data:', err);
    }
  }
   
  function getTimeForZone(timeZone) {
    try {
      const options = {
        timeZone,
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
      return new Date().toLocaleTimeString('en-US', options);
    } catch {
      return null;
    }
  }
   
  function searchRecommendations() {
    if (!travelData) {
      alert('Data is still loading, please try again.');
      return;
    }
   
    const raw = document.getElementById('searchInput').value.trim();
    const keyword = raw.toLowerCase();
   
    if (!keyword) {
      showNoResults('Please enter a keyword such as "beach", "temple", or a country name.');
      return;
    }
   
    let results = [];
    let categoryLabel = '';
   
    // Beaches
    if (keyword === 'beach' || keyword === 'beaches') {
      results = travelData.beaches;
      categoryLabel = 'Beaches';
    }
    // Temples
    else if (keyword === 'temple' || keyword === 'temples') {
      results = travelData.temples;
      categoryLabel = 'Temples';
    }
    // Countries — check if keyword matches any country name
    else {
      const matchedCountry = travelData.countries.find(c =>
        c.name.toLowerCase().includes(keyword)
      );
      if (matchedCountry) {
        // Use cities as results
        results = matchedCountry.cities.map(city => ({
          name: city.name,
          country: matchedCountry.name,
          imageUrl: city.imageUrl,
          description: city.description,
          timeZone: matchedCountry.timeZone
        }));
        categoryLabel = matchedCountry.name;
      } else {
        showNoResults(`No results found for "<strong>${raw}</strong>". Try searching for "beach", "temple", "Japan", "Australia", or "Brazil".`);
        return;
      }
    }
   
    renderResults(results, categoryLabel);
  }
   
  function renderResults(results, label) {
    const section = document.getElementById('resultsSection');
    section.innerHTML = '';
    section.style.display = 'block';
   
    // Header
    const header = document.createElement('div');
    header.className = 'results-header';
    header.innerHTML = `
      <h2 class="results-title">Results for <span>${label}</span></h2>
      <span class="results-count">${results.length} destination${results.length !== 1 ? 's' : ''} found</span>
    `;
    section.appendChild(header);
   
    // Grid
    const grid = document.createElement('div');
    grid.className = 'results-grid';
   
    results.forEach((place, i) => {
      const localTime = place.timeZone ? getTimeForZone(place.timeZone) : null;
      const card = document.createElement('div');
      card.className = 'result-card';
      card.style.animationDelay = `${i * 0.08}s`;
   
      card.innerHTML = `
        <div class="card-image-wrap">
          <img src="${place.imageUrl}" alt="${place.name}" loading="lazy"
               onerror="this.src='https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80'">
          <span class="card-badge">${label}</span>
          ${localTime ? `
          <span class="card-time">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            ${localTime}
          </span>` : ''}
        </div>
        <div class="card-body">
          <p class="card-country">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            </svg>
            ${place.country || label}
          </p>
          <h3 class="card-name">${place.name}</h3>
          <p class="card-desc">${place.description}</p>
          <span class="card-cta">
            Explore
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>
        </div>
      `;
      grid.appendChild(card);
    });
   
    section.appendChild(grid);
   
    // Scroll into view
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
   
  function showNoResults(message) {
    const section = document.getElementById('resultsSection');
    section.style.display = 'block';
    section.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>No Results Found</h3>
        <p>${message}</p>
      </div>
    `;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
   
  // ─── Reset / Clear ───────────────────────────────────────────────
  function clearResults() {
    const section = document.getElementById('resultsSection');
    section.innerHTML = '';
    section.style.display = 'none';
   
    const input = document.getElementById('searchInput');
    if (input) input.value = '';
  }
   
  // ─── Contact Form ────────────────────────────────────────────────
  function handleContactSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    if (form && success) {
      form.style.display = 'none';
      success.classList.add('show');
    }
  }
   
  // ─── Search on Enter key ─────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    loadTravelData();
   
    const input = document.getElementById('searchInput');
    if (input) {
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') searchRecommendations();
      });
    }
   
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', handleContactSubmit);
    }
  });