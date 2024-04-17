function getCookie(name){
    return document.cookie.split(';').some(c => {
        return c.trim().startsWith(name + '=');
    });
}

function deleteCookie(name, path) {
    if( getCookie(name) ) {
      document.cookie = name + "=" +
        ((path)? ";path="+path:"")+
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}

function logout() {
    console.log("Logging out...");
    deleteCookie("vitesse_userauth", "/");
    window.location.replace("http://localhost:8000/");
}