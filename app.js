function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    let users = JSON.parse(localStorage.getItem('users')) || {};
    
    if(username in users && users[username].password === password) {
        localStorage.setItem('loggedInUser', username);
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("userDashboard").style.display = "block";
        document.getElementById("welcomeMessage").innerText = `Welcome ${username}`;
        getUrls();
    } else {
        alert("Invalid username or password.")
    }
}

function signUp() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    if(username && password) {
        var users = JSON.parse(localStorage.getItem('users')) || {};
        
        // Check if username already exists
        if(users[username]) {
            alert("Username already exists!");
            return;
        }
        
        // Store user credentials
        users[username] = {password: password};
        localStorage.setItem('users', JSON.stringify(users));
        alert("Registration Successful");
    } else {
        alert("Fill out both fields");
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("userDashboard").style.display = "none";
}

function saveUrl() {
    let urlInput = document.getElementById("urlInput").value;
    let urlTag = document.getElementById("urlTag").value;

    if(urlInput && urlTag) {
        let existingUrls = JSON.parse(localStorage.getItem('urls')) || {};
        let loggedInUser = localStorage.getItem('loggedInUser'); 
        let userUrls = existingUrls[loggedInUser] || [];
        
        userUrls.push({url: urlInput, tag: urlTag});
        existingUrls[loggedInUser] = userUrls;

        localStorage.setItem('urls', JSON.stringify(existingUrls));
        document.getElementById("urlInput").value = '';
        document.getElementById("urlTag").value = '';
    }
    
    getUrls();
}

function getUrls() {
    let loggedInUser = localStorage.getItem('loggedInUser');  
    let urls = JSON.parse(localStorage.getItem('urls')) || {};
    let userUrls = urls[loggedInUser] || [];
    
    let urlList = document.getElementById("urlList");
    urlList.innerHTML = "";
    
    for(let i=0; i < userUrls.length; i++) {
        urlList.innerHTML += `<li>
                                <a href="${userUrls[i].url}" target="_blank">${userUrls[i].tag}</a>
                                <button onclick="deleteUrl(${i})">Delete</button>
                             </li>`;
    }
}

function deleteUrl(index) {
    let loggedInUser = localStorage.getItem('loggedInUser');  
    let urls = JSON.parse(localStorage.getItem('urls')) || {};
    let userUrls = urls[loggedInUser] || [];
    
    userUrls.splice(index, 1);
    urls[loggedInUser] = userUrls;
    
    localStorage.setItem('urls', JSON.stringify(urls));
    getUrls();
}
