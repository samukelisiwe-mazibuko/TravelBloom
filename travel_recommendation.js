// =====================
// Page Navigation
// =====================
document.addEventListener("DOMContentLoaded", function () {
    showPage("home");
});

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    // Show selected page
    document.getElementById(pageId).classList.add("active");

    // Switch navbar: home gets the search bar nav, others get the plain nav
    const navHome = document.getElementById("nav-home");
    const navSub  = document.getElementById("nav-sub");

    if (pageId === "home") {
        navHome.classList.add("active-nav");
        navSub.classList.remove("active-nav");
    } else {
        navHome.classList.remove("active-nav");
        navSub.classList.add("active-nav");
    }
}

// =====================
// Travel Data
// =====================
const recommendations = {
    beaches: [
        {
            name: "Bora Bora, French Polynesia",
            image: "https://images.unsplash.com/photo-1589197331516-4f4f72d9f2c6?w=600",
            description: "A tropical paradise with crystal-clear lagoons and overwater bungalows. Perfect for snorkelling and sunsets."
        },
        {
            name: "Copacabana Beach, Brazil",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
            description: "One of the world's most famous beaches in Rio de Janeiro, known for its vibrant atmosphere and golden sand."
        },
        {
            name: "Whitehaven Beach, Australia",
            image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600",
            description: "An untouched stretch of pure white silica sand in the heart of the Whitsundays, Queensland."
        }
    ],

    temples: [
        {
            name: "Angkor Wat, Cambodia",
            image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=600",
            description: "The world's largest religious monument — a breathtaking 12th-century Khmer temple complex surrounded by jungle."
        },
        {
            name: "Golden Temple, India",
            image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600",
            description: "Sri Harmandir Sahib, the most sacred Sikh shrine in Amritsar, shimmering in gold on a serene holy lake."
        },
        {
            name: "Kinkaku-ji, Japan",
            image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600",
            description: "The Golden Pavilion in Kyoto — a Zen Buddhist temple covered in gold leaf, reflected in a tranquil pond."
        }
    ],

    countries: [
        {
            name: "Australia",
            image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600",
            description: "From the Sydney Opera House to the Great Barrier Reef and Uluru, Australia is a land of epic contrasts and adventure.",
            timeZone: "Australia/Sydney"
        },
        {
            name: "Japan",
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600",
            description: "Where ancient temples meet neon-lit cities. Explore Tokyo, Kyoto, and Mount Fuji for an unforgettable cultural journey.",
            timeZone: "Asia/Tokyo"
        },
        {
            name: "South Africa",
            image: "https://images.unsplash.com/photo-1578485892-9a5e0e08b48c?w=600",
            description: "Safari, mountains, and coastlines — South Africa offers wildlife adventures in Kruger, scenic drives along the Garden Route, and Cape Town's iconic Table Mountain.",
            timeZone: "Africa/Johannesburg"
        }
    ]
};

// =====================
// Search Logic
// =====================
function searchRecommendation() {
    const input = document.getElementById("searchInput").value.toLowerCase().trim();
    const results = document.getElementById("results");
    results.innerHTML = "";

    if (!input) {
        results.innerHTML = '<p class="no-results">Please enter a keyword — try <strong>beach</strong>, <strong>temple</strong>, or <strong>country</strong>.</p>';
        return;
    }

    let found = false;

    // Beaches — match "beach" or "beaches"
    if (input.includes("beach")) {
        displayResults(recommendations.beaches);
        found = true;
    }

    // Temples — match "temple" or "temples"
    if (input.includes("temple")) {
        displayResults(recommendations.temples);
        found = true;
    }

    // Countries — match "country", "countries", or specific country names
    if (
        input.includes("country") ||
        input.includes("countries") ||
        input.includes("australia") ||
        input.includes("japan") ||
        input.includes("south africa")
    ) {
        displayResults(recommendations.countries);
        found = true;
    }

    if (!found) {
        results.innerHTML = '<p class="no-results">No results found. Try searching for <strong>beach</strong>, <strong>temple</strong>, or <strong>country</strong>.</p>';
    }
}

// =====================
// Display Cards
// =====================
function displayResults(items) {
    const results = document.getElementById("results");

    items.forEach(item => {
        // Optional: show local time for countries
        let timeHTML = "";
        if (item.timeZone) {
            const options = {
                timeZone: item.timeZone,
                hour12: true,
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
            };
            const localTime = new Date().toLocaleTimeString("en-US", options);
            timeHTML = `<p class="card-time">🕐 Local time: ${localTime}</p>`;
        }

        results.innerHTML += `
            <div class="card">
                <img src="${item.image}" alt="${item.name}">
                <div class="card-body">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    ${timeHTML}
                </div>
            </div>
        `;
    });
}

// =====================
// Reset / Clear
// =====================
function resetSearch() {
    document.getElementById("searchInput").value = "";
    document.getElementById("results").innerHTML = "";
}

// =====================
// Contact Form
// =====================
function handleSubmit(event) {
    event.preventDefault();
    alert("Thank you for your message! We'll get back to you soon. 🌸");
    event.target.reset();
}