function login() {
    let username = document.getElementById("username").value;
    if(username) {
        localStorage.setItem('loggedInUser', username);
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("userDashboard").style.display = "block";
        document.getElementById("welcomeMessage").innerText = `Welcome ${username}`;
        getUrls();
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
                             </li>`;
    }
}
