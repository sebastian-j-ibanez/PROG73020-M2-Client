$(function(){
    $("#header").load("Header.html"); 
    });

function deleteMethod() {
    console.log('To be implemented...')
}

function getCookie(cookieName){
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    
    for(let i = 0; i < cookieArray.length; i++) {
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
const username = getCookie("vitesse_username");
const bookingList =  $('#bookingList');

fetch(`https://localhost:7166/api/booking/user/${username}`)
.then(resp => {
    return resp.json()
})
.then(body => {
    body.forEach(function(booking) {
        let carName = `${booking.carBooked.make} ${booking.carBooked.model}`
        let container = $('<div>').addClass('')
        bookingList.append(container)
        container.html(`<div style="display: flex; justify-content: space-between; border: solid 1px black; border-radius: 20%;">
        <div>
            <h2>${carName}</h2>
            <p><span>${booking.startDate}</span> to <span>${booking.endDate}</span></p>
        </div>
        <div>
            <button onclick="deleteMethod()">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4   0h2V8h-2z"/></svg>
            </button>
        </div>
        </div>`)
    })
})
.catch(error => {
    console.log(error)
});