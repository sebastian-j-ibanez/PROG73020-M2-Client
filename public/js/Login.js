function setCookie(name, value, path) {
    let cookieString = `${name}=${value}`;
    if (path) {
        cookieString += `; path=${path}`;
    }
    document.cookie = cookieString;
}

async function login() {
    const username = $('#usernameInput').val()
    const password = $('#passwordInput').val()

    console.log(`Username: ${username}`)
    console.log(`Password: ${[password]}`)
    
    fetch("https://localhost:7166/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then(async resp =>  {
        if (resp.ok) {
            // Set userauth cookie.
            let json = await resp.json();
            let userauth = json.userId;
            console.log(json);
            console.log(userauth);
            setCookie("vitesse_userauth", userauth, "/");
            setCookie("vitesse_username", username, "/")
            // Log login and redirect to cars page.
            console.log('Login successful...')
            $(`#signinMessages`).text(` `).hide()
            window.location.replace('http://localhost:8000/cars')
        } else {
            // Display error message.
            console.log(`Error. Login status: ${resp.status}`)
            $('#signinMessages').text(`❌ Invalid username or password.`).show()
        }
      })
      .catch(error => {
        console.log(error)
        $('#signinMessages').text(`❌ Network error. Unable to sign-in.`).show()
    }); 
}
