let myLeads = [];
const inputEl = document.getElementById("input-el");
const btnInput = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
// Getting value form local storage
// JSON.parse is parsing myLeads array to string
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

// Setting myLeads to its value
// and calls renderLeads()
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener("click", function() {
    // Getting current tab window that we want to save 
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        // Saving the url of tabs to list
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);

    });
});

// Function that renders out leads
// from listItems
function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
    `;
    }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function() {
    console.log("double clicked!");
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

btnInput.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    // Saving leads to local storage
    // JSON.stringify parses string to array 
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads);
});