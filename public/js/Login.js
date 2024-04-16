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
      .then(resp =>  {
        if (resp.ok) {
            // Redirect to car list page.
            console.log('Login successful...')
            $(`#signinMessages`).text(` `).hide()
        } else {
            // Display error message.
            console.log(`Error. Login status: ${resp.status}`)
            $('#signinMessages').text(`❌ Invalid username or password.`).show()
        }
      })
      .catch(error => {
        console.log(error)
    });
}
