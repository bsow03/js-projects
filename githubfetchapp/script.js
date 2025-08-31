/* 

-- how to think when coding --

User action: click, type, drag, etc.

Update data: change your arrays, objects, or state variables.

Save data: optional, only if you need persistence (like localStorage or a database).

Update UI: render the latest state so the user sees the change.
--
User action: type username, use api, fetch data

Update data: change object variable

Save data: 

Update UI: render the latest state so the user sees the change.
*/


let inputBox = document.getElementById("input-fetch");
inputBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        if(inputBox.value === "")return; //ignore empty input
        getUser(inputBox.value);
    }
})

async function getUser(username){
    try{
        let response = await fetch(`https://api.github.com/users/${username}`);
        let data = await response.json();
        
        updateProfileCard(data);  // separate function for clarity
        setupFullInfoButton(data); // pass data to full info handler
        
        // notice how this function just gets user, the next function updates the profile card
        // and lastly the button being pressed is another function (pay attention to the separation of tasks)
        
        
    } catch(error) {
        console.log("Something went wrong...", error);
    }
}

function updateProfileCard(data){
    document.getElementById("avatar").src = data.avatar_url;
    document.getElementById("name").textContent = data.name || data.login; // IMPORTANT NOTE, use text content to change content of text in a certain section
    document.getElementById("bio").textContent = data.bio || "No bio available.";
    document.getElementById("repos").textContent = `Repositories: ${data.public_repos}`;
    document.getElementById("followers").textContent = `Followers: ${data.followers}`;
    document.getElementById("following").textContent = `Following: ${data.following}`;
}

function setupFullInfoButton(data) {
    let button = document.getElementById("fullinfo-btn");
    let desc = document.getElementById("fullinfo-desc");
    let display = document.getElementById("display")

    let isShown = false; //track state

    button.onclick = function() {
        if (!isShown) {
            desc.textContent = JSON.stringify(data, null, 2);
            isShown = true;
            button.textContent = "Hide Info ❌";
            display.classList.add("w-xl");
        } else {
            desc.textContent = "User's information will be parsed in JSON format.";
            isShown = false;
            button.textContent = "Want To Find Out More? 🔎";
            display.classList.remove("w-xl");
        }
    }
}

















/*
-- What I Learned Doing This Project --

1) how to fetch apis
2) what problem fetch solves
3) async/await and why it is better than using fetch with a bunch of .then() tags


*/