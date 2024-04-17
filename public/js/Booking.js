async function loadCar() {

    const car = await getCar(3);
    console.log(car);
    document.getElementById("carName").innerHTML = car.model;
    document.getElementById("carPrice").innerHTML = `$${car.costperday} Per Day`;
    document.getElementById("engType").innerHTML = car.fueltype;
    document.getElementById("carMake").innerHTML = car.make;
    document.getElementById("seatNum").innerHTML = car.numSeats;
    document.getElementById("plateNum").innerHTML = car.licenseplate;
    document.getElementById("carPic").src = car.linkToImage;
}

async function getCar(id) {
    const res = await fetch(`https://localhost:7166/api/car/${id}`)
    const data = await res.json();
    return data[0];
}

//date picker stuff

function showDatePicker(button) {
    const calendar = button.nextElementSibling;

    const d = new Date();
    let month = d.getMonth();
    let year = d.getFullYear();
    calendar.setAttribute('month', month + 1);
    calendar.setAttribute('year', year);

    populateDatePicker(calendar);
}

function populateDatePicker(dp) {
    const dateArea = dp.querySelector('.monthView');
    const pickerFor = dp.getAttribute('for');
    const monthText = dp.querySelector('.monthText');

    const month = dp.getAttribute('month');
    const year = dp.getAttribute('year');

    const firstDay = new Date(year, month - 1, 1).getDay(); // Get the day of the week for the first day of the month
    const lastDay = new Date(year, month, 0).getDate(); // Get the last day of the month

    //reset the datepicker area
    dateArea.innerHTML = '';

    //set datepicker month
    months = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
    ];
    monthText.innerHTML = months[month - 1];

    const prevMonthLastDay = new Date(year, month - 1, 0).getDate();

    for (let day = 1; day < firstDay + 1; day++) {
        let btn = document.createElement('button');
        btn.innerHTML = prevMonthLastDay - firstDay + day;
        btn.classList.add('outsideDay');
        dateArea.appendChild(btn);
    }

    // Display the days of the current month
    for (let day = 1; day <= lastDay; day++) {
        let btn = document.createElement('button');
        btn.innerHTML = day;
        btn.classList.add('dateButton');
        btn.onclick = function () {
            const dateEvent = new CustomEvent('dateEvent', {
                detail: new Date(year, month - 1, day) // Provide the Date object as the event data
            });
            dp.dispatchEvent(dateEvent);
        }
        dateArea.appendChild(btn);
    }

    // Calculate the number of days to display from the next month
    const nextMonthDays = 7 - (dateArea.children.length % 7);

    // Display the days from the next month
    for (let day = 1; day <= nextMonthDays; day++) {
        let btn = document.createElement('button');
        btn.innerHTML = day;
        btn.classList.add('outsideDay');
        dateArea.appendChild(btn);
    }

}

function incrementMonth(btn) {
    const calendar = btn.parentElement.parentElement;
    let month = calendar.getAttribute('month');
    month++;
    calendar.setAttribute('month', month);

    populateDatePicker(calendar)
}

function decrementMonth(btn) {
    const calendar = btn.parentElement.parentElement;
    let month = calendar.getAttribute('month');
    month--;
    calendar.setAttribute('month', month);

    populateDatePicker(calendar)
}

function calculateCost() {
    const startDate = new Date(document.getElementById('confirmStartDate').getAttribute('ts'));
    const endDate = new Date(document.getElementById('confirmEndDate').getAttribute('ts'));
    const price = document.getElementById('carPrice').innerHTML;

    console.log(startDate, endDate);

    //guard
    if (startDate == null || endDate == null) {
        return;
    }

    // let duration = 
    // let total = 
}

function initEventHandlers() {
    const startDatePicker = document.querySelector('.datePicker[for="startDate"]');
    const endDatePicker = document.querySelector('.datePicker[for="endDate"]');

    startDatePicker.addEventListener("dateEvent", function (e) {
        document.getElementById('confirmStartDate').setAttribute('ts', e.detail.getTime());
        document.getElementById('confirmStartDate').innerHTML = e.detail;

        calculateCost();
    })
    endDatePicker.addEventListener("dateEvent", function (e) {
        document.getElementById('confirmEndDate').setAttribute('ts', e.detail.getTime());
        document.getElementById('confirmEndDate').innerHTML = e.detail;

        calculateCost();
    })
}
