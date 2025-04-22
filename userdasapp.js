// Mobile Menu Toggle
const sidebar = document.querySelector('.sidebar');
const menuToggle = document.createElement('div');
menuToggle.className = 'mobile-menu-toggle';
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
document.body.appendChild(menuToggle);

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('active');
    }
});
const ctx = document.getElementById('priceChart').getContext('2d');
new Chart(ctx, {
    // ... chart configuration
});

// Initialize Map
const map = L.map('property-map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// ... rest of the JavaScript code