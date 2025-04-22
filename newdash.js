document.addEventListener('DOMContentLoaded', function() {
    // Initialize all dashboard components
    initDashboard();
});

function initDashboard() {
    // Initialize navigation
    setupNavigation();
    
    // Initialize all sections
    initSavedProperties();
    initSavedSearches();
    initMarketTrends();
    initClientsSection();
    initAppointments();
    initContracts();
    initMessages();
    initFeaturedProperties();
    initPropertyMap();
    initMortgageCalculator();
    
    // Initialize modals
    initModals();
    
    // Load initial data
    loadInitialData();
}

// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('href').substring(1);
            document.getElementById(sectionId).classList.add('active');
            
            // Special cases where we need to refresh data
            if (sectionId === 'market-trends') {
                updateMarketTrendsChart();
            } else if (sectionId === 'property-location') {
                updatePropertyMap();
            }
        });
    });
    
    // Logout button
    document.querySelector('.logout-btn').addEventListener('click', function() {
        // In a real app, this would redirect to logout
        alert('Logging out...');
    });
    
    // Search functionality
    document.querySelector('.search-bar button').addEventListener('click', function() {
        const query = document.querySelector('.search-bar input').value;
        if (query) {
            alert(`Searching for: ${query}`);
            // In a real app, this would trigger a search
        }
    });
}

// Saved Properties Section
function initSavedProperties() {
    const propertyGrid = document.querySelector('.property-grid');
    
    // Sample property data
    const properties = [
        {
            id: 1,
            address: '123 Main St, Anytown',
            price: '$350,000',
            beds: 3,
            baths: 2,
            sqft: 1500,
            image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
            saved: true,
            featured: false
        },
        {
            id: 2,
            address: '456 Oak Ave, Somewhere',
            price: '$475,000',
            beds: 4,
            baths: 3,
            sqft: 2200,
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
            saved: true,
            featured: true
        },
        {
            id: 3,
            address: '789 Pine Blvd, Nowhere',
            price: '$275,000',
            beds: 2,
            baths: 1,
            sqft: 1000,
            image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6',
            saved: true,
            featured: false
        },
        {
            id: 4,
            address: '321 Elm St, Anywhere',
            price: '$525,000',
            beds: 5,
            baths: 3.5,
            sqft: 2800,
            image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00',
            saved: true,
            featured: true
        }
    ];
    
    // Render properties
    function renderProperties() {
        propertyGrid.innerHTML = '';
        properties.forEach(property => {
            const propertyCard = document.createElement('div');
            propertyCard.className = 'property-card';
            propertyCard.innerHTML = `
                <div class="property-image" style="background-image: url('${property.image}')">
                    <button class="favorite-btn ${property.saved ? 'active' : ''}">
                        <i class="fas fa-heart"></i>
                    </button>
                    ${property.featured ? '<span class="featured-badge">Featured</span>' : ''}
                </div>
                <div class="property-details">
                    <h3>${property.address}</h3>
                    <p class="price">${property.price}</p>
                    <p class="specs">${property.beds} Beds | ${property.baths} Baths | ${property.sqft} sqft</p>
                    <div class="property-actions">
                        <button class="view-btn" data-id="${property.id}">View Details</button>
                        <button class="contact-btn">Contact Agent</button>
                    </div>
                </div>
            `;
            propertyGrid.appendChild(propertyCard);
        });
        
        // Add event listeners
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('active');
                const propertyId = parseInt(this.closest('.property-card').querySelector('.view-btn').getAttribute('data-id'));
                const property = properties.find(p => p.id === propertyId);
                property.saved = !property.saved;
            });
        });
        
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const propertyId = parseInt(this.getAttribute('data-id'));
                showPropertyDetails(propertyId);
            });
        });
    }
    
    // Filter and sort buttons
    document.querySelector('.filter-btn').addEventListener('click', function() {
        // In a real app, this would show filter options
        alert('Filter options would appear here');
    });
    
    document.querySelector('.sort-btn').addEventListener('click', function() {
        // In a real app, this would show sort options
        alert('Sort options would appear here');
    });
    
    renderProperties();
}

// Saved Searches Section
function initSavedSearches() {
    const searchesList = document.querySelector('.searches-list');
    
    // Sample saved searches
    const searches = [
        {
            id: 1,
            query: '3-bedroom homes in Downtown',
            filters: 'Price: $300k-$500k, Sqft: 1500+',
            lastSearch: '2 days ago'
        },
        {
            id: 2,
            query: 'Waterfront properties',
            filters: 'Price: Any, Beds: 2+',
            lastSearch: '1 week ago'
        },
        {
            id: 3,
            query: 'Investment properties',
            filters: 'Multi-family, Price: $200k-$400k',
            lastSearch: '3 weeks ago'
        }
    ];
    
    // Render searches
    function renderSearches() {
        searchesList.innerHTML = '';
        searches.forEach(search => {
            const searchItem = document.createElement('div');
            searchItem.className = 'search-item';
            searchItem.innerHTML = `
                <div class="search-info">
                    <h3>${search.query}</h3>
                    <p>${search.filters}</p>
                    <small>Last searched: ${search.lastSearch}</small>
                </div>
                <div class="search-actions">
                    <button class="search-again-btn" data-id="${search.id}">
                        <i class="fas fa-search"></i> Search Again
                    </button>
                    <button class="delete-search-btn" data-id="${search.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            searchesList.appendChild(searchItem);
        });
        
        // Add event listeners
        document.querySelectorAll('.search-again-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const searchId = parseInt(this.getAttribute('data-id'));
                const search = searches.find(s => s.id === searchId);
                alert(`Searching again for: ${search.query}`);
            });
        });
        
        document.querySelectorAll('.delete-search-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const searchId = parseInt(this.getAttribute('data-id'));
                const index = searches.findIndex(s => s.id === searchId);
                if (index !== -1) {
                    searches.splice(index, 1);
                    renderSearches();
                }
            });
        });
    }
    
    renderSearches();
}

// Market Trends Section
function initMarketTrends() {
    let marketTrendChart;
    
    function updateMarketTrendsChart() {
        const ctx = document.getElementById('marketTrendChart').getContext('2d');
        const period = document.getElementById('trend-period').value;
        const region = document.getElementById('trend-region').value;
        
        // Sample data based on period and region
        let labels, prices, inventory, interestRates;
        
        if (period === 'monthly') {
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
            prices = [320000, 335000, 345000, 360000, 370000, 380000];
            inventory = [1200, 1250, 1300, 1350, 1400, 1450];
            interestRates = [3.8, 3.7, 3.6, 3.5, 3.4, 3.3];
        } else if (period === 'quarterly') {
            labels = ['Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022', 'Q1 2023'];
            prices = [310000, 325000, 340000, 350000, 365000];
            inventory = [1100, 1150, 1200, 1250, 1300];
            interestRates = [4.0, 3.9, 3.8, 3.7, 3.6];
        } else { // yearly
            labels = ['2018', '2019', '2020', '2021', '2022', '2023'];
            prices = [250000, 270000, 290000, 320000, 350000, 375000];
            inventory = [800, 850, 900, 1000, 1200, 1300];
            interestRates = [4.5, 4.3, 4.0, 3.8, 3.6, 3.4];
        }
        
        // Adjust based on region (simplified for demo)
        if (region !== 'all') {
            prices = prices.map(p => Math.round(p * (0.9 + Math.random() * 0.2)));
            inventory = inventory.map(i => Math.round(i * (0.8 + Math.random() * 0.4)));
        }
        
        // Update summary cards
        document.querySelector('.summary-card:nth-child(1) .summary-value').textContent = `$${Math.round(prices[prices.length - 1]).toLocaleString()}`;
        document.querySelector('.summary-card:nth-child(2) .summary-value').textContent = Math.round(30 * (0.8 + Math.random() * 0.4));
        document.querySelector('.summary-card:nth-child(3) .summary-value').textContent = inventory[inventory.length - 1].toLocaleString();
        
        // Destroy previous chart if exists
        if (marketTrendChart) {
            marketTrendChart.destroy();
        }
        
        // Create new chart
        marketTrendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Average Price ($)',
                        data: prices,
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Inventory',
                        data: inventory,
                        borderColor: '#2ecc71',
                        backgroundColor: 'rgba(46, 204, 113, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        yAxisID: 'y1'
                    },
                    {
                        label: 'Interest Rate (%)',
                        data: interestRates,
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        yAxisID: 'y2'
                    }
                ]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Price ($)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Inventory'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    },
                    y2: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Interest Rate (%)'
                        },
                        grid: {
                            drawOnChartArea: false
                        },
                        min: 0,
                        max: 10
                    }
                }
            }
        });
    }
    
    // Event listeners for filters
    document.getElementById('trend-period').addEventListener('change', updateMarketTrendsChart);
    document.getElementById('trend-region').addEventListener('change', updateMarketTrendsChart);
    
    // Initial chart render
    updateMarketTrendsChart();
}

// Clients Section
function initClientsSection() {
    const clientsTable = document.querySelector('.clients-table tbody');
    
    // Sample clients data
    let clients = [
        {
            id: 1,
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            phone: '(555) 123-4567',
            type: 'Buyer',
            status: 'Active',
            lastContact: '2 days ago'
        },
        {
            id: 2,
            name: 'Michael Brown',
            email: 'michael@example.com',
            phone: '(555) 234-5678',
            type: 'Seller',
            status: 'Active',
            lastContact: '1 week ago'
        },
        {
            id: 3,
            name: 'Emily Davis',
            email: 'emily@example.com',
            phone: '(555) 345-6789',
            type: 'Both',
            status: 'Prospect',
            lastContact: '3 weeks ago'
        },
        {
            id: 4,
            name: 'David Wilson',
            email: 'david@example.com',
            phone: '(555) 456-7890',
            type: 'Buyer',
            status: 'Closed',
            lastContact: '2 months ago'
        }
    ];
    
    // Render clients table
    function renderClients() {
        clientsTable.innerHTML = '';
        clients.forEach(client => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${client.name}</td>
                <td>
                    <p>${client.email}</p>
                    <small>${client.phone}</small>
                </td>
                <td><span class="client-type ${client.type.toLowerCase()}">${client.type}</span></td>
                <td><span class="client-status ${client.status.toLowerCase()}">${client.status}</span></td>
                <td>${client.lastContact}</td>
                <td>
                    <button class="action-btn view-client" data-id="${client.id}"><i class="fas fa-eye"></i></button>
                    <button class="action-btn edit-client" data-id="${client.id}"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete-client" data-id="${client.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            clientsTable.appendChild(row);
        });
        
        // Add event listeners
        document.querySelectorAll('.view-client').forEach(btn => {
            btn.addEventListener('click', function() {
                const clientId = parseInt(this.getAttribute('data-id'));
                viewClientDetails(clientId);
            });
        });
        
        document.querySelectorAll('.edit-client').forEach(btn => {
            btn.addEventListener('click', function() {
                const clientId = parseInt(this.getAttribute('data-id'));
                editClient(clientId);
            });
        });
        
        document.querySelectorAll('.delete-client').forEach(btn => {
            btn.addEventListener('click', function() {
                const clientId = parseInt(this.getAttribute('data-id'));
                deleteClient(clientId);
            });
        });
    }
    
    // Add client button
    document.querySelector('.add-client-btn').addEventListener('click', function() {
        document.getElementById('addClientModal').style.display = 'block';
    });
    
    // Client form submission
    document.getElementById('clientForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newClient = {
            id: clients.length + 1,
            name: document.getElementById('clientName').value,
            email: document.getElementById('clientEmail').value,
            phone: document.getElementById('clientPhone').value,
            type: document.getElementById('clientType').value,
            status: 'Active',
            lastContact: 'Today'
        };
        
        clients.push(newClient);
        renderClients();
        document.getElementById('addClientModal').style.display = 'none';
        this.reset();
    });
    
    // View client details
    function viewClientDetails(clientId) {
        const client = clients.find(c => c.id === clientId);
        alert(`Viewing details for: ${client.name}\nEmail: ${client.email}\nPhone: ${client.phone}`);
    }
    
    // Edit client
    function editClient(clientId) {
        const client = clients.find(c => c.id === clientId);
        document.getElementById('clientName').value = client.name;
        document.getElementById('clientEmail').value = client.email;
        document.getElementById('clientPhone').value = client.phone;
        document.getElementById('clientType').value = client.type.toLowerCase();
        document.getElementById('addClientModal').style.display = 'block';
        
        // Update form to edit mode
        const form = document.getElementById('clientForm');
        form.dataset.editing = clientId;
        form.querySelector('.submit-btn').textContent = 'Update Client';
        
        // Remove previous submit listener
        form.replaceWith(form.cloneNode(true));
        
        // Add new submit listener for edit
        document.getElementById('clientForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const clientIndex = clients.findIndex(c => c.id === clientId);
            if (clientIndex !== -1) {
                clients[clientIndex] = {
                    ...clients[clientIndex],
                    name: document.getElementById('clientName').value,
                    email: document.getElementById('clientEmail').value,
                    phone: document.getElementById('clientPhone').value,
                    type: document.getElementById('clientType').value
                };
                
                renderClients();
                document.getElementById('addClientModal').style.display = 'none';
                this.reset();
                this.querySelector('.submit-btn').textContent = 'Save Client';
                delete this.dataset.editing;
            }
        });
    }
    
    // Delete client
    function deleteClient(clientId) {
        if (confirm('Are you sure you want to delete this client?')) {
            clients = clients.filter(c => c.id !== clientId);
            renderClients();
        }
    }
    
    renderClients();
}

// Appointments Section
function initAppointments() {
    const calendarGrid = document.querySelector('.calendar-grid');
    const appointmentsList = document.querySelector('.appointments-list');
    let currentDate = new Date();
    
    // Sample appointments data
    const appointments = [
        {
            id: 1,
            title: 'Property Tour',
            client: 'Sarah Johnson',
            date: new Date(new Date().setDate(new Date().getDate() + 1)),
            time: '10:00 AM',
            location: '123 Main St',
            notes: 'First viewing, interested in 3-bedroom'
        },
        {
            id: 2,
            title: 'Contract Signing',
            client: 'Michael Brown',
            date: new Date(new Date().setDate(new Date().getDate() + 2)),
            time: '2:30 PM',
            location: 'Office',
            notes: 'Final signing for 456 Oak Ave'
        },
        {
            id: 3,
            title: 'Initial Consultation',
            client: 'Emily Davis',
            date: new Date(new Date().setDate(new Date().getDate() - 1)),
            time: '11:00 AM',
            location: 'Coffee Shop',
            notes: 'Discuss investment properties'
        }
    ];
    
    // Render calendar
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Update month/year display
        document.querySelector('.current-month').textContent = 
            new Date(year, month, 1).toLocaleDateString('default', { month: 'long', year: 'numeric' });
        
        // Get first day of month and total days in month
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Clear previous calendar
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });
        
        // Add empty cells for days before first day of month
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyCell);
        }
        
        // Add days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = day;
            
            // Check if this day has appointments
            const dayAppointments = appointments.filter(apt => {
                const aptDate = new Date(apt.date);
                return aptDate.getDate() === day && 
                       aptDate.getMonth() === month && 
                       aptDate.getFullYear() === year;
            });
            
            if (dayAppointments.length > 0) {
                const aptIndicator = document.createElement('div');
                aptIndicator.className = 'appointment-indicator';
                aptIndicator.textContent = `${dayAppointments.length} apt`;
                dayCell.appendChild(aptIndicator);
                
                dayCell.addEventListener('click', function() {
                    showDayAppointments(day, month, year);
                });
            }
            
            // Highlight current day
            const today = new Date();
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayCell.classList.add('today');
            }
            
            calendarGrid.appendChild(dayCell);
        }
    }
    
    // Render upcoming appointments list
    function renderUpcomingAppointments() {
        const now = new Date();
        const upcoming = appointments
            .filter(apt => new Date(apt.date) >= now)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 5); // Show next 5 appointments
        
        appointmentsList.innerHTML = '';
        
        if (upcoming.length === 0) {
            appointmentsList.innerHTML = '<p>No upcoming appointments</p>';
            return;
        }
        
        upcoming.forEach(apt => {
            const aptItem = document.createElement('div');
            aptItem.className = 'appointment-item';
            aptItem.innerHTML = `
                <div class="apt-date">
                    <span class="apt-day">${new Date(apt.date).toLocaleDateString('default', { weekday: 'short' })}</span>
                    <span class="apt-num">${new Date(apt.date).getDate()}</span>
                </div>
                <div class="apt-info">
                    <h3>${apt.title}</h3>
                    <p>With ${apt.client}</p>
                    <p>${apt.time} • ${apt.location}</p>
                </div>
                <div class="apt-actions">
                    <button class="apt-action-btn view-apt" data-id="${apt.id}"><i class="fas fa-eye"></i></button>
                    <button class="apt-action-btn edit-apt" data-id="${apt.id}"><i class="fas fa-edit"></i></button>
                </div>
            `;
            appointmentsList.appendChild(aptItem);
        });
        
        // Add event listeners
        document.querySelectorAll('.view-apt').forEach(btn => {
            btn.addEventListener('click', function() {
                const aptId = parseInt(this.getAttribute('data-id'));
                viewAppointment(aptId);
            });
        });
        
        document.querySelectorAll('.edit-apt').forEach(btn => {
            btn.addEventListener('click', function() {
                const aptId = parseInt(this.getAttribute('data-id'));
                editAppointment(aptId);
            });
        });
    }
    
    // Show appointments for a specific day
    function showDayAppointments(day, month, year) {
        const dayAppointments = appointments.filter(apt => {
            const aptDate = new Date(apt.date);
            return aptDate.getDate() === day && 
                   aptDate.getMonth() === month && 
                   aptDate.getFullYear() === year;
        });
        
        if (dayAppointments.length === 0) {
            alert(`No appointments on ${month + 1}/${day}/${year}`);
            return;
        }
        
        let message = `Appointments on ${month + 1}/${day}/${year}:\n\n`;
        dayAppointments.forEach(apt => {
            message += `${apt.time}: ${apt.title} with ${apt.client}\n`;
        });
        
        alert(message);
    }
    
    // View appointment details
    function viewAppointment(aptId) {
        const apt = appointments.find(a => a.id === aptId);
        alert(`Appointment Details:\n\nTitle: ${apt.title}\nClient: ${apt.client}\nDate: ${apt.date.toDateString()}\nTime: ${apt.time}\nLocation: ${apt.location}\nNotes: ${apt.notes}`);
    }
    
    // Edit appointment
    function editAppointment(aptId) {
        const apt = appointments.find(a => a.id === aptId);
        
        // Populate form
        document.getElementById('appointmentTitle').value = apt.title;
        document.getElementById('appointmentDate').valueAsDate = apt.date;
        document.getElementById('appointmentTime').value = apt.time;
        document.getElementById('appointmentLocation').value = apt.location;
        document.getElementById('appointmentNotes').value = apt.notes;
        
        // Set client dropdown (simplified)
        const clientSelect = document.getElementById('appointmentClient');
        clientSelect.innerHTML = `<option value="${apt.client}">${apt.client}</option>`;
        
        document.getElementById('addAppointmentModal').style.display = 'block';
        
        // Update form to edit mode
        const form = document.getElementById('appointmentForm');
        form.dataset.editing = aptId;
        form.querySelector('.submit-btn').textContent = 'Update Appointment';
        
        // Remove previous submit listener
        form.replaceWith(form.cloneNode(true));
        
        // Add new submit listener for edit
        document.getElementById('appointmentForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const aptIndex = appointments.findIndex(a => a.id === aptId);
            if (aptIndex !== -1) {
                appointments[aptIndex] = {
                    ...appointments[aptIndex],
                    title: document.getElementById('appointmentTitle').value,
                    date: new Date(document.getElementById('appointmentDate').value),
                    time: document.getElementById('appointmentTime').value,
                    location: document.getElementById('appointmentLocation').value,
                    notes: document.getElementById('appointmentNotes').value
                };
                
                renderCalendar();
                renderUpcomingAppointments();
                document.getElementById('addAppointmentModal').style.display = 'none';
                this.reset();
                this.querySelector('.submit-btn').textContent = 'Schedule';
                delete this.dataset.editing;
            }
        });
    }
    
    // Add new appointment button
    document.querySelector('.add-appointment-btn').addEventListener('click', function() {
        document.getElementById('addAppointmentModal').style.display = 'block';
    });
    
    // Appointment form submission (for new appointments)
    document.getElementById('appointmentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!this.dataset.editing) {
            const newAppointment = {
                id: appointments.length + 1,
                title: document.getElementById('appointmentTitle').value,
                client: document.getElementById('appointmentClient').value,
                date: new Date(document.getElementById('appointmentDate').value),
                time: document.getElementById('appointmentTime').value,
                location: document.getElementById('appointmentLocation').value,
                notes: document.getElementById('appointmentNotes').value
            };
            
            appointments.push(newAppointment);
            renderCalendar();
            renderUpcomingAppointments();
            document.getElementById('addAppointmentModal').style.display = 'none';
            this.reset();
        }
    });
    
    // Month navigation
    document.querySelector('.prev-month').addEventListener('click', function() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        renderCalendar();
    });
    
    document.querySelector('.next-month').addEventListener('click', function() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        renderCalendar();
    });
    
    // Initial render
    renderCalendar();
    renderUpcomingAppointments();
}

// Contracts Section
function initContracts() {
    const contractsList = document.querySelector('.contracts-list');
    const tabButtons = document.querySelectorAll('.contracts-tabs .tab-btn');
    
    // Sample contracts data
    const contracts = [
        {
            id: 1,
            property: '123 Main St',
            client: 'Sarah Johnson',
            type: 'Purchase',
            status: 'pending',
            amount: '$350,000',
            date: '2023-04-15',
            expiration: '2023-05-15'
        },
        {
            id: 2,
            property: '456 Oak Ave',
            client: 'Michael Brown',
            type: 'Sale',
            status: 'signed',
            amount: '$475,000',
            date: '2023-03-20',
            expiration: '2023-04-20'
        },
        {
            id: 3,
            property: '789 Pine Blvd',
            client: 'Emily Davis',
            type: 'Lease',
            status: 'expired',
            amount: '$2,500/mo',
            date: '2023-01-10',
            expiration: '2023-02-10'
        }
    ];
    
    // Render contracts based on active tab
    function renderContracts(activeTab = 'pending') {
        const filteredContracts = contracts.filter(contract => contract.status === activeTab);
        
        contractsList.innerHTML = '';
        
        if (filteredContracts.length === 0) {
            contractsList.innerHTML = `<p>No ${activeTab} contracts</p>`;
            return;
        }
        
        filteredContracts.forEach(contract => {
            const contractItem = document.createElement('div');
            contractItem.className = 'contract-item';
            contractItem.innerHTML = `
                <div class="contract-main">
                    <h3>${contract.property}</h3>
                    <p>${contract.type} • ${contract.client}</p>
                    <p class="contract-amount">${contract.amount}</p>
                </div>
                <div class="contract-dates">
                    <p><small>Created:</small> ${contract.date}</p>
                    <p><small>Expires:</small> ${contract.expiration}</p>
                </div>
                <div class="contract-actions">
                    <button class="contract-action-btn view-contract" data-id="${contract.id}">
                        <i class="fas fa-file-alt"></i> View
                    </button>
                    ${contract.status === 'pending' ? 
                        `<button class="contract-action-btn sign-contract" data-id="${contract.id}">
                            <i class="fas fa-signature"></i> Sign
                        </button>` : ''}
                </div>
            `;
            contractsList.appendChild(contractItem);
        });
        
        // Add event listeners
        document.querySelectorAll('.view-contract').forEach(btn => {
            btn.addEventListener('click', function() {
                const contractId = parseInt(this.getAttribute('data-id'));
                viewContract(contractId);
            });
        });
        
        document.querySelectorAll('.sign-contract').forEach(btn => {
            btn.addEventListener('click', function() {
                const contractId = parseInt(this.getAttribute('data-id'));
                signContract(contractId);
            });
        });
    }
    
    // Tab switching
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderContracts(this.dataset.tab);
        });
    });
    
    // View contract
    function viewContract(contractId) {
        const contract = contracts.find(c => c.id === contractId);
        alert(`Contract Details:\n\nProperty: ${contract.property}\nClient: ${contract.client}\nType: ${contract.type}\nAmount: ${contract.amount}\nStatus: ${contract.status}\nDate: ${contract.date}\nExpiration: ${contract.expiration}`);
    }
    
    // Sign contract
    function signContract(contractId) {
        if (confirm('Mark this contract as signed?')) {
            const contractIndex = contracts.findIndex(c => c.id === contractId);
            if (contractIndex !== -1) {
                contracts[contractIndex].status = 'signed';
                renderContracts('pending');
            }
        }
    }
    
    // Initial render
    renderContracts();
}

// Messages Section
function initMessages() {
    const conversationList = document.querySelector('.conversation-list');
    const messageView = document.querySelector('.message-view');
    
    // Sample conversations and messages
    const conversations = [
        {
            id: 1,
            contact: 'Sarah Johnson',
            lastMessage: 'Hi, when can we schedule the next viewing?',
            time: '2 hours ago',
            unread: true,
            messages: [
                {
                    sender: 'Sarah Johnson',
                    text: 'Hi, I really liked the property we saw yesterday',
                    time: 'Yesterday, 4:30 PM'
                },
                {
                    sender: 'You',
                    text: 'Great to hear that! What did you like most about it?',
                    time: 'Yesterday, 4:45 PM'
                },
                {
                    sender: 'Sarah Johnson',
                    text: 'The layout and the neighborhood. When can we schedule the next viewing?',
                    time: '2 hours ago'
                }
            ]
        },
        {
            id: 2,
            contact: 'Michael Brown',
            lastMessage: 'I\'ve signed the documents and sent them back',
            time: '1 day ago',
            unread: false,
            messages: [
                {
                    sender: 'Michael Brown',
                    text: 'I\'ve signed the documents and sent them back',
                    time: '1 day ago'
                }
            ]
        },
        {
            id: 3,
            contact: 'Emily Davis',
            lastMessage: 'Do you have any new listings that match my criteria?',
            time: '3 days ago',
            unread: false,
            messages: [
                {
                    sender: 'Emily Davis',
                    text: 'Do you have any new listings that match my criteria?',
                    time: '3 days ago'
                },
                {
                    sender: 'You',
                    text: 'I\'ll check and get back to you with some options',
                    time: '2 days ago'
                }
            ]
        }
    ];
    
    // Render conversations
    function renderConversations() {
        conversationList.innerHTML = '';
        
        conversations.forEach(convo => {
            const convoItem = document.createElement('div');
            convoItem.className = `conversation-item ${convo.unread ? 'unread' : ''}`;
            convoItem.dataset.id = convo.id;
            convoItem.innerHTML = `
                <div class="convo-avatar">${convo.contact.charAt(0)}</div>
                <div class="convo-info">
                    <h3>${convo.contact}</h3>
                    <p>${convo.lastMessage}</p>
                </div>
                <div class="convo-time">
                    <small>${convo.time}</small>
                    ${convo.unread ? '<span class="unread-badge"></span>' : ''}
                </div>
            `;
            conversationList.appendChild(convoItem);
            
            // Add click event to load messages
            convoItem.addEventListener('click', function() {
                loadMessages(convo.id);
                
                // Mark as read
                if (convo.unread) {
                    convo.unread = false;
                    renderConversations();
                }
            });
        });
    }
    
    // Load messages for a conversation
    function loadMessages(convoId) {
        const convo = conversations.find(c => c.id === convoId);
        
        // Update message header
        const messageHeader = messageView.querySelector('.message-header');
        messageHeader.innerHTML = `
            <div class="message-contact">
                <h3>${convo.contact}</h3>
                <small>Last active: ${convo.time}</small>
            </div>
            <button class="call-btn"><i class="fas fa-phone"></i></button>
        `;
        
        // Update message content
        const messageContent = messageView.querySelector('.message-content');
        messageContent.innerHTML = '';
        
        convo.messages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.sender === 'You' ? 'sent' : 'received'}`;
            messageDiv.innerHTML = `
                <p>${msg.text}</p>
                <small>${msg.time}</small>
            `;
            messageContent.appendChild(messageDiv);
        });
        
        // Scroll to bottom
        messageContent.scrollTop = messageContent.scrollHeight;
    }
    
    // Send message
    document.querySelector('.send-btn').addEventListener('click', function() {
        const textarea = document.querySelector('.message-input textarea');
        const message = textarea.value.trim();
        
        if (message) {
            const activeConvo = document.querySelector('.conversation-item.active');
            if (activeConvo) {
                const convoId = parseInt(activeConvo.dataset.id);
                const convo = conversations.find(c => c.id === convoId);
                
                // Add new message
                convo.messages.push({
                    sender: 'You',
                    text: message,
                    time: 'Just now'
                });
                
                // Update last message and time
                convo.lastMessage = message;
                convo.time = 'Just now';
                
                // Reload messages and conversations
                loadMessages(convoId);
                renderConversations();
                
                // Clear input
                textarea.value = '';
            } else {
                alert('Please select a conversation first');
            }
        }
    });
    
    // Initial render
    renderConversations();
}

// Featured Properties Section
function initFeaturedProperties() {
    const featuredGrid = document.querySelector('.featured-grid');
    
    // Sample featured properties (some overlap with saved properties)
    const featuredProperties = [
        {
            id: 2,
            address: '456 Oak Ave, Somewhere',
            price: '$475,000',
            beds: 4,
            baths: 3,
            sqft: 2200,
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
            featured: true,
            featuredSince: '2023-03-15'
        },
        {
            id: 4,
            address: '321 Elm St, Anywhere',
            price: '$525,000',
            beds: 5,
            baths: 3.5,
            sqft: 2800,
            image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00',
            featured: true,
            featuredSince: '2023-04-01'
        },
        {
            id: 5,
            address: '555 Beach Rd, Coastal',
            price: '$1,250,000',
            beds: 6,
            baths: 4.5,
            sqft: 3500,
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
            featured: true,
            featuredSince: '2023-04-10'
        }
    ];
    
    // Render featured properties
    function renderFeaturedProperties() {
        featuredGrid.innerHTML = '';
        
        featuredProperties.forEach(property => {
            const propertyCard = document.createElement('div');
            propertyCard.className = 'featured-card';
            propertyCard.innerHTML = `
                <div class="featured-image" style="background-image: url('${property.image}')">
                    <span class="featured-badge">Featured</span>
                </div>
                <div class="featured-details">
                    <h3>${property.address}</h3>
                    <p class="price">${property.price}</p>
                    <p class="specs">${property.beds} Beds | ${property.baths} Baths | ${property.sqft} sqft</p>
                    <p class="featured-since">Featured since: ${property.featuredSince}</p>
                    <div class="featured-actions">
                        <button class="view-btn" data-id="${property.id}">View Details</button>
                        <button class="contact-btn">Contact Seller</button>
                        <button class="remove-featured-btn" data-id="${property.id}">
                            <i class="fas fa-star"></i> Remove Featured
                        </button>
                    </div>
                </div>
            `;
            featuredGrid.appendChild(propertyCard);
            
            // Add event listeners
            propertyCard.querySelector('.view-btn').addEventListener('click', function() {
                showPropertyDetails(parseInt(this.getAttribute('data-id')));
            });
            
            propertyCard.querySelector('.remove-featured-btn').addEventListener('click', function() {
                const propertyId = parseInt(this.getAttribute('data-id'));
                removeFromFeatured(propertyId);
            });
        });
    }
    
    // Remove property from featured
    function removeFromFeatured(propertyId) {
        if (confirm('Remove this property from featured listings?')) {
            const index = featuredProperties.findIndex(p => p.id === propertyId);
            if (index !== -1) {
                featuredProperties.splice(index, 1);
                renderFeaturedProperties();
            }
        }
    }
    
    // Add new featured property button
    document.querySelector('.add-featured-btn').addEventListener('click', function() {
        // In a real app, this would open a modal to select properties to feature
        alert('Feature property modal would open here');
    });
    
    // Initial render
    renderFeaturedProperties();
}

// Property Map Section
function initPropertyMap() {
    let propertyMap;
    let propertyMarkers = [];
    
    // Sample property locations
    const propertyLocations = [
        {
            id: 1,
            address: '123 Main St, Anytown',
            lat: 40.7128,
            lng: -74.0060,
            type: 'saved',
            price: '$350,000'
        },
        {
            id: 2,
            address: '456 Oak Ave, Somewhere',
            lat: 40.7138,
            lng: -74.0070,
            type: 'featured',
            price: '$475,000'
        },
        {
            id: 3,
            address: '789 Pine Blvd, Nowhere',
            lat: 40.7118,
            lng: -74.0050,
            type: 'saved',
            price: '$275,000'
        },
        {
            id: 4,
            address: '321 Elm St, Anywhere',
            lat: 40.7148,
            lng: -74.0080,
            type: 'featured',
            price: '$525,000'
        },
        {
            id: 5,
            address: '555 Beach Rd, Coastal',
            lat: 40.7108,
            lng: -74.0090,
            type: 'featured',
            price: '$1,250,000'
        },
        {
            id: 6,
            address: '100 Park Lane, Greens',
            lat: 40.7158,
            lng: -74.0040,
            type: 'sold',
            price: '$420,000 (sold)'
        }
    ];
    
    // Initialize map
    function initMap() {
        propertyMap = L.map('propertyMap').setView([40.7128, -74.0060], 14);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(propertyMap);
        
        updatePropertyMap('all');
    }
    
    // Update map based on filter
    function updatePropertyMap(filter = 'all') {
        // Clear existing markers
        propertyMarkers.forEach(marker => propertyMap.removeLayer(marker));
        propertyMarkers = [];
        
        // Filter properties
        let filteredProperties = propertyLocations;
        if (filter !== 'all') {
            filteredProperties = propertyLocations.filter(p => p.type === filter);
        }
        
        // Add markers for filtered properties
        filteredProperties.forEach(property => {
            let markerColor;
            switch (property.type) {
                case 'saved':
                    markerColor = '#3498db'; // Blue
                    break;
                case 'featured':
                    markerColor = '#f1c40f'; // Yellow
                    break;
                case 'sold':
                    markerColor = '#e74c3c'; // Red
                    break;
                default:
                    markerColor = '#2ecc71'; // Green
            }
            
            const marker = L.circleMarker([property.lat, property.lng], {
                radius: 8,
                fillColor: markerColor,
                color: '#fff',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(propertyMap);
            
            marker.bindPopup(`
                <h3>${property.address}</h3>
                <p>Price: ${property.price}</p>
                <button class="map-popup-btn" data-id="${property.id}">View Details</button>
            `);
            
            propertyMarkers.push(marker);
        });
    }
    
    // Map filter buttons
    document.querySelectorAll('.map-filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.map-filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updatePropertyMap(this.dataset.filter);
        });
    });
    
    // Initialize the map
    initMap();
}

// Mortgage Calculator Section
function initMortgageCalculator() {
    let amortizationChart;
    
    // Calculate mortgage
    function calculateMortgage() {
        const homePrice = parseFloat(document.getElementById('home-price').value) || 0;
        const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
        const loanTerm = parseInt(document.getElementById('loan-term').value) || 30;
        const interestRate = parseFloat(document.getElementById('interest-rate').value) || 4.5;
        
        const loanAmount = homePrice - downPayment;
        const monthlyRate = interestRate / 100 / 12;
        const payments = loanTerm * 12;
        
        // Calculate monthly payment
        let monthlyPayment;
        if (monthlyRate === 0) {
            monthlyPayment = loanAmount / payments;
        } else {
            monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, payments)) / 
                            (Math.pow(1 + monthlyRate, payments) - 1);
        }
        
        // Calculate total payment and interest
        const totalPayment = monthlyPayment * payments;
        const totalInterest = totalPayment - loanAmount;
        
        // Update the UI
        document.querySelector('.monthly-payment').textContent = `$${monthlyPayment.toFixed(2)}`;
        
        // Update breakdown (simplified with estimates)
        document.querySelector('.breakdown-item:nth-child(1) span:last-child').textContent = `$${monthlyPayment.toFixed(2)}`;
        
        // Property tax estimate (1% of home price annually)
        const propertyTax = (homePrice * 0.01) / 12;
        document.querySelector('.breakdown-item:nth-child(2) span:last-child').textContent = `$${propertyTax.toFixed(2)}`;
        
        // Home insurance estimate ($100/month)
        const homeInsurance = 100;
        document.querySelector('.breakdown-item:nth-child(3) span:last-child').textContent = `$${homeInsurance.toFixed(2)}`;
        
        // Total monthly payment
        const totalMonthly = monthlyPayment + propertyTax + homeInsurance;
        document.querySelector('.breakdown-item.total span:last-child').textContent = `$${totalMonthly.toFixed(2)}`;
        
        // Generate amortization chart
        generateAmortizationChart(loanAmount, monthlyRate, payments, monthlyPayment);
    }
    
    // Generate amortization chart
    function generateAmortizationChart(loanAmount, monthlyRate, payments, monthlyPayment) {
        const ctx = document.getElementById('amortizationChart').getContext('2d');
        
        // Calculate data for each year
        let principalData = [];
        let interestData = [];
        let balanceData = [];
        let labels = [];
        
        let balance = loanAmount;
        for (let year = 1; year <= payments / 12; year++) {
            let yearlyPrincipal = 0;
            let yearlyInterest = 0;
            
            for (let month = 1; month <= 12; month++) {
                const interest = balance * monthlyRate;
                const principal = monthlyPayment - interest;
                
                yearlyPrincipal += principal;
                yearlyInterest += interest;
                balance -= principal;
            }
            
            principalData.push(yearlyPrincipal);
            interestData.push(yearlyInterest);
            balanceData.push(balance);
            labels.push(`Year ${year}`);
        }
        
        // Destroy previous chart if exists
        if (amortizationChart) {
            amortizationChart.destroy();
        }
        
        // Create new chart
        amortizationChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Principal',
                        data: principalData,
                        backgroundColor: '#3498db'
                    },
                    {
                        label: 'Interest',
                        data: interestData,
                        backgroundColor: '#e74c3c'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Amount ($)'
                        }
                    }
                }
            }
        });
    }
    
    // Event listeners for inputs
    document.getElementById('home-price').addEventListener('input', calculateMortgage);
    document.getElementById('down-payment').addEventListener('input', calculateMortgage);
    document.getElementById('loan-term').addEventListener('change', calculateMortgage);
    document.getElementById('interest-rate').addEventListener('input', calculateMortgage);
    
    // Calculate button
    document.querySelector('.calculate-btn').addEventListener('click', calculateMortgage);
    
    // Initial calculation
    calculateMortgage();
}

// Property Details Modal
function showPropertyDetails(propertyId) {
    // In a real app, this would fetch property details from database
    // For demo, we'll use sample data
    const sampleProperty = {
        id: propertyId,
        address: `${propertyId}23 Sample St, Demo City`,
        price: '$' + (propertyId * 100000).toLocaleString(),
        beds: propertyId + 2,
        baths: propertyId + 1,
        sqft: (propertyId * 500 + 1000).toLocaleString(),
        description: 'This beautiful property features a spacious layout with modern amenities. Perfect for families or investors looking for a great opportunity in a growing neighborhood.',
        features: [
            'Open floor plan',
            'Modern kitchen with stainless steel appliances',
            'Hardwood floors throughout',
            'Large backyard',
            '2-car garage',
            'Energy efficient windows'
        ],
        images: [
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
            'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6'
        ],
        yearBuilt: 2000 + propertyId,
        lotSize: '0.' + propertyId + ' acres',
        propertyType: propertyId % 2 === 0 ? 'Single Family Home' : 'Townhouse',
        status: 'For Sale'
    };
    
    // Populate modal
    const modalContent = document.querySelector('.property-modal-content');
    modalContent.innerHTML = `
        <div class="property-images">
            <div class="main-image" style="background-image: url('${sampleProperty.images[0]}')"></div>
            <div class="thumbnail-images">
                ${sampleProperty.images.slice(0, 3).map(img => `
                    <div class="thumb" style="background-image: url('${img}')"></div>
                `).join('')}
            </div>
        </div>
        <div class="property-info">
            <h2>${sampleProperty.address}</h2>
            <p class="price">${sampleProperty.price}</p>
            <p class="specs">${sampleProperty.beds} Beds | ${sampleProperty.baths} Baths | ${sampleProperty.sqft} sqft</p>
            
            <div class="property-meta">
                <div><span>Property Type:</span> ${sampleProperty.propertyType}</div>
                <div><span>Year Built:</span> ${sampleProperty.yearBuilt}</div>
                <div><span>Lot Size:</span> ${sampleProperty.lotSize}</div>
                <div><span>Status:</span> ${sampleProperty.status}</div>
            </div>
            
            <h3>Description</h3>
            <p>${sampleProperty.description}</p>
            
            <h3>Features</h3>
            <ul class="features-list">
                ${sampleProperty.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            
            <div class="property-actions">
                <button class="action-btn primary"><i class="fas fa-phone"></i> Contact Agent</button>
                <button class="action-btn"><i class="fas fa-heart"></i> Save Property</button>
                <button class="action-btn"><i class="fas fa-share"></i> Share</button>
            </div>
        </div>
    `;
    
    // Show modal
    document.getElementById('propertyDetailsModal').style.display = 'block';
}

// Modals Management
function initModals() {
    // Close modals when clicking X
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });
}

// Load Initial Data
function loadInitialData() {
    // In a real app, this would fetch data from APIs
    console.log('Loading initial data...');
    
    // Set active section based on URL hash
    const hash = window.location.hash.substring(1) || 'dashboard';
    const navLink = document.querySelector(`.sidebar-nav a[href="#${hash}"]`);
    if (navLink) {
        navLink.parentElement.classList.add('active');
        document.getElementById(hash).classList.add('active');
    }
}

// Initialize the dashboard
initDashboard();