$(function () {
    $("#header").load("Header.html");
});

async function deleteBooking(id) {
    await fetch(`https://localhost:7166/api/booking/${id}`, {
        method: 'DELETE'
    }).then(res => {
        loadBookings();
    }).catch(err => {
        console.log(err);
    })

}

function getCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

async function loadBookings() {
    const username = getCookie("vitesse_userauth");
    const bookingList = $('#bookingList');

    bookingList.innerHTML = '';

    await fetch(`https://localhost:7166/api/booking/user/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => {
        return resp.json()
    }).then(body => {

        console.log(body);

        body.forEach(function (booking) {

            let startDate = new Date(booking.startTime).toDateString();
            let endDate = new Date(booking.endTime).toDateString();

            let carName = `${booking.carBooked.make} ${booking.carBooked.model}`
            let container = $('<div>').addClass('')
            bookingList.append(container)
            container.html(`<div style="display: flex; justify-content: space-between; align-items: center; border: solid 2px black; border-radius: 10px; padding: 10px; margin-bottom: 10px;">
            <div>
                <h2>${carName}</h2>
                <p style="margin: 0px"><span>${startDate}</span> to <span>${endDate}</span></p>
            </div>
            <div>
                <button onclick="deleteBooking(${booking.BookingId})" style="border: none; background-color: transparent;" class="deleteButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/></svg>
                </button>
            </div>
            </div>`)
        })
    }).catch(error => {
        console.log(error)
    });
}

loadBookings();