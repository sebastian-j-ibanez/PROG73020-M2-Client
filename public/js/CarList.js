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

let carCards = $('#carCards');
const carImageLink = 'https://mediaservice.audi.com/media/fast/H4sIAAAAAAAAAFvzloG1tIiBOTrayfuvpGh6-m1zJgaGigIGBgZGoDhTtNOaz-I_2DhCHsCElzEwF-SlMwJZKUycmbmJ6an6QD4_I3taTmV-aUkxO0grj--BDQt4fZdrruG-fOCY66WbIr0r7jGwAnUxzgcSLFpAgu8XkODwYACTIPMyQcRJEJ_JgpmBgbUCyIhkAAFBDQMigTC7i2uIo6dPMACU5TlZ2QAAAA?wid=550';

// Function that populates the carCards div. Takes in array of cars as input.
// Expects each car to have 'make', 'model', 'year', 'engine', and 'seats' fields.
function PopulateCarCards(cars) {
    cars.forEach(function(car) {
        console.log(car);
        let card = $('<div>').addClass('card m-2 col').css('width', '18rem');
        let cardImage = $('<img>').addClass('card-img-top').attr({
            'src': carImageLink,
        });
        let cardBody = $('<div>').addClass('card-body');
        let cardTitle = $('<h5>').addClass('card-title').text(`${car.make} ${car.model}`);
        let cardSubtitle = $('<h6>').addClass('card-subtitle text-body-secondary').text(`${car.year} • ${car.engine}`);
        let cardSeats = $('<h6>').addClass('card-subtitle text-body-secondary').text(`${car.seats} seats`);
        let cardAddBtn = $('<button>').addClass('btn btn-success btn-sm mt-2').text('Book Vehicle');

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
            const seats = car.seats;
            seatNums.push(seats);
            
            // Create dropdown list item
            let listItem = $('<li>');
            let id = `seat-item-${seats}`;
            let itemButton = $('<a>').addClass('dropdown-item').text(`${seats} seats`).attr({
                'id': id,
                'href': '#'
            });
            let itemId = `#${id}`;
            console.log(itemId);
            $(itemId).on('click', function() {
                seatsFilter = seats;
                $("#seats-dropdown-btn" ).html(seats);
            });

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
            const engine = car.engine;
            engines.push(engine);
            
            // Create dropdown list item.
            let listItem = $('<li>');
            let id = `engine-item-${engine}`;
            let itemButton = $('<a>').addClass('dropdown-item').text(`${engine}`).attr({
                'id': id,
                'href': '#'
            });
            let itemId = `#${id}`;
            console.log(itemId);
            $(itemId).on('click', function() {
                engineFilter = engine;
                $('#engine-dropdown-btn').html(engine);
            });

            // Append to list.
            listItem.append(itemButton);
            $('#engine-dropdown-menu').append(listItem);
        }
    });
}

// Filter cars based on filter values. Repopulate card section after filtering cars.
function FilterCars(cars) {
    let filteredCars = cars.filter(car => car.seat === seatsFilter);
    filteredCars = filteredCars.filter(car => car.engine === engineFilter);
    PupulateCarCards(filteredCars);
}

PopulateCarCards(cars);
PopulateEngineDropdown(cars);
PopulateSeatDropdown(cars);