$(function () {
    $("#header").load("Header.html");
});

console.log('CarList page loaded...');

// Global cars variable.
let cars = [];

// Values used to store the filter values.
let seatsFilter = "";
let engineFilter = "";

// Async function to call API /car/all route.
// Returns json if successful. Empty array if not.
async function getAllCars() {
    try {
        const response = await fetch('https://localhost:7166/api/car/all');
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

// Get cars from API and set UI elements.
getAllCars()
    .then(cars => {
        // Function that populates the carCards div. Takes in array of cars as input.
        // Expects each car to have 'make', 'model', 'year', 'fueltype', and 'numSeats' fields.
        function PopulateCarCards(cars) {
            // Loop through cars and create card with it's information.
            console.log(cars);
            cars.forEach(function (car) {
                console.log(car);
                let card = $('<div>').addClass('card m-2 col-md-4').css('width', '18rem');
                let cardImage = $('<img>').addClass('card-img-top').attr({
                    'src': car.linkToImage,
                });
                let cardBody = $('<div>').addClass('card-body');
                let cardTitle = $('<h5>').addClass('card-title').text(`${car.make} ${car.model}`);
                let cardSubtitle = $('<h6>').addClass('card-subtitle text-body-secondary').text(`${car.year} • ${car.fueltype}`);
                let cardSeats = $('<h6>').addClass('card-subtitle text-body-secondary').text(`${car.numSeats} seats`);
                let cardAddBtn = $('<button>').addClass('btn btn-success btn-sm mt-2').text('Book Vehicle').on("click", function() { window.location.href = `/booking?car=${car.carID}` });

                // Append card to card container div.
                cardBody.append(cardTitle, cardSubtitle, cardSeats, cardAddBtn);
                card.append(cardImage, cardBody);
                $('#carCards').append(card);
            });


        }

        // Function that populates the seat dropdown with existing seat numbers. Takes array of car objects as input.
        // Expects each car to have a 'seats' field.
        function PopulateSeatDropdown(cars) {
            let seatNums = [];
            $('#seats-dropdown-menu').empty();
            cars.forEach(function (car) {
                if (!seatNums.includes(car.numSeats)) {
                    // Add seat number to array. 
                    let seats = car.numSeats;
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
            $('#engine-dropdown-menu').empty();
            cars.forEach(function (car) {
                if (!engines.includes(car.fueltype)) {
                    // Add engine to array.
                    let engine = car.fueltype;
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
            $('.seats-dropdown-item').on('click', function () {
                seatsFilter = $(this).text();
                $("#seats-dropdown-btn").html(seatsFilter);
            });

            $('.engine-dropdown-item').on('click', function () {
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
                let filteredCars = cars.filter(car => car.numSeats === Number(seatsFilter));
                console.log(filteredCars);
                filteredCars = filteredCars.filter(car => car.fueltype === engineFilter);
                console.log(filteredCars);
                $('#carCards').empty();
                PopulateCarCards(filteredCars);
            }
        }

        // Bind FilterCars function to filter button. 
        function BindFilterClickEvent(cars) {
            $('#filter-btn').on('click', function () {
                FilterCars(cars);
            });
        }

        // Binds click function for the reset filter button.
        function BindResetClickEvent() {
            $('#reset-btn').on('click', function () {
                // Reset filter variables.
                seatsFilter = "";
                engineFilter = "";

                // Reset filter buttons.
                $('#seats-dropdown-btn').html('Seats');
                $('#engine-dropdown-btn').html('Engine Type');

                // Clear and populate car cards.
                $('#carCards').empty();
                PopulateCarCards(cars);
            });
        }

        // Populate dynamic UI elements. 
        PopulateEngineDropdown(cars);
        PopulateSeatDropdown(cars);
        PopulateCarCards(cars);

        // Bind button events.
        BindDropdownClickEvents();
        BindFilterClickEvent(cars);
        BindResetClickEvent();
    })
    .catch(error => {
        console.error('Error:', error);
    });