async function login() {
    const username = document.getElementById("usernameInput").value
    const password = document.getElementById("passwordInput").value
    
    fetch("https://localhost:7166/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: hashedPassword
        })
      })
}

async function signup() {
    //lol we decided not to do this
}