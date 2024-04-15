console.log('CarList page loaded...');

// Mock data until the API can return all cars.
let cars = [
    {
        make: 'Hyundai',
        model: 'IONIQ 5',
        year: 2023,
        engine: 'Electric',
        seats: 5
    },
    {
        make: 'Toyota',
        model: 'Prius C',
        year: 2016,
        engine: 'Hybrid',
        seats: 5
    },
    {
        make: 'Kia',
        model: 'Rio',
        year: 2012,
        engine: 'Petrol',
        seats: 5
    },
    {
        make: 'Ford',
        model: 'F-150',
        year: 2018,
        engine: 'Petrol',
        seats: 5
    },
    {
        make: 'Volkswagen',
        model: 'id Buzz',
        year: 2024,
        engine: 'Electric',
        seats: 6
    }
];

// Async function to call API /car/all route.
// Returns json if successful. Empty array if not.
async function getAllCars() {
    try {
        const response = await fetch('http://localhost:44397/api/car/all');
        if (!response.ok) {
            throw new Error('Failed to fetch cars');
        }
        const cars = await response.json();
        return cars;
    } catch (error) {
        console.error('Error fetching cars:', error);
        return []; // Return an empty array if an error occurs
    }
}

// // Global cars variable.
// let cars = [];

// // Get cars from API and set the global variable.
// getAllCars()
//     .then(carList => {
//         console.log('Cars:', carList);
//         cars = carList;
//         console.log(cars);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });


let carCards = $('#carCards');

// Function that populates the carCards div. Takes in array of cars as input.
// Expects each car to have 'make', 'model', 'year', 'engine', and 'seats' fields.
function PopulateCarCards(cars) {

    // Get carCards element and default carImageLink.
    const carImageLink = 'https://mediaservice.audi.com/media/fast/H4sIAAAAAAAAAFvzloG1tIiBOTrayfuvpGh6-m1zJgaGigIGBgZGoDhTtNOaz-I_2DhCHsCElzEwF-SlMwJZKUycmbmJ6an6QD4_I3taTmV-aUkxO0grj--BDQt4fZdrruG-fOCY66WbIr0r7jGwAnUxzgcSLFpAgu8XkODwYACTIPMyQcRJEJ_JgpmBgbUCyIhkAAFBDQMigTC7i2uIo6dPMACU5TlZ2QAAAA?wid=550';

    // Loop through cars and create card with it's information.
    cars.forEach(function(car) {
        console.log(car);
        let card = $('<div>').addClass('card m-2 col-md-4').css('width', '18rem');
        let cardImage = $('<img>').addClass('card-img-top').attr({
            'src': carImageLink,
        });
        let cardBody = $('<div>').addClass('card-body');
        let cardTitle = $('<h5>').addClass('card-title').text(`${car.make} ${car.model}`);
        let cardSubtitle = $('<h6>').addClass('card-subtitle text-body-secondary').text(`${car.year} • ${car.engine}`);
        let cardSeats = $('<h6>').addClass('card-subtitle text-body-secondary').text(`${car.seats} seats`);
        let cardAddBtn = $('<button>').addClass('btn btn-success btn-sm mt-2').text('Book Vehicle');

        // Append card to card container div.
        cardBody.append(cardTitle, cardSubtitle, cardSeats, cardAddBtn);
        card.append(cardImage, cardBody);
        carCards.append(card);
    });
}

// Values used to store the filter values.
let seatsFilter = "";
let engineFilter = "";

// Function that populates the seat dropdown with existing seat numbers. Takes array of car objects as input.
// Expects each car to have a 'seats' field.
function PopulateSeatDropdown(cars) {
    let seatNums = [];
    cars.forEach(function(car) {
        if (!seatNums.includes(car.seats)) {
            // Add seat number to array. 
            let seats = car.seats;
            seatNums.push(seats);
            
            // Create dropdown list item
            let listItem = $('<li>');
            let itemButton = $('<a>').addClass('dropdown-item seats-dropdown-item').text(`${seats}`).attr('href', '#');

            // Append to list.
            listItem.append(itemButton);
            $('#seats-dropdown-menu').append(listItem);
        }
    });
}

// Function that populates the seat dropdown with existing seat numbers. Takes array of car objects as input.
// Expects each car to have a 'seats' field.
function PopulateEngineDropdown(cars) {
    let engines = [];
    cars.forEach(function(car) {
        if (!engines.includes(car.engine)) {
            // Add engine to array.
            let engine = car.engine;
            engines.push(engine);
            
            // Create dropdown list item.
            let listItem = $('<li>');
            let itemButton = $('<a>').addClass('dropdown-item engine-dropdown-item').text(`${engine}`).attr('href', '#');

            // Append to list.
            listItem.append(itemButton);
            $('#engine-dropdown-menu').append(listItem);
        }
    });
}

// Binds the appropriate click events to the seats and engine dropdown items.
function BindDropdownClickEvents() {
    $('.seats-dropdown-item').on('click', function() {
        seatsFilter = $(this).text();
        $("#seats-dropdown-btn" ).html(seatsFilter);
    });
    
    $('.engine-dropdown-item').on('click', function() {
        engineFilter = $(this).text();
        $('#engine-dropdown-btn').html(engineFilter);
    });
}

// Filter cars based on filter values. Repopulate card section after filtering cars.
function FilterCars() {
    if (seatsFilter != "" && engineFilter != "") {
        console.log('Filtering cars...');
        console.log(seatsFilter);
        console.log(engineFilter);
        let filteredCars = cars.filter(car => car.seats === Number(seatsFilter));
        console.log(filteredCars);
        filteredCars = filteredCars.filter(car => car.engine === engineFilter);
        console.log(filteredCars);
        carCards.empty();
        PopulateCarCards(filteredCars);
    }
}

// Bind FilterCars function to filter button. 
function BindFilterClickEvent() {
    $('#filter-btn').on('click', function() {
        FilterCars(cars);
    });
}

// Binds click function for the reset filter button.
function BindResetClickEvent() {
    $('#reset-btn').on('click', function() {
        // Reset filter variables.
        seatsFilter = "";
        engineFilter = "";

        // Reset filter buttons.
        $('#seats-dropdown-btn').html('Seats');
        $('#engine-dropdown-btn').html('Engine Type');

        // Clear and populate car cards.
        carCards.empty();
        PopulateCarCards(cars);
    });
}

PopulateEngineDropdown(cars);
PopulateSeatDropdown(cars);

BindDropdownClickEvents();
BindResetClickEvent();
BindFilterClickEvent();

PopulateCarCards(cars);