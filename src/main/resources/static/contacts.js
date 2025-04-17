document.addEventListener("DOMContentLoaded", function () {
    loadContacts();
});

// Function to Load Contacts from Local Storage into the Table
function loadContacts() {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    let tableBody = document.getElementById("contactTableBody");

    tableBody.innerHTML = ""; // Clear previous data

    if (contacts.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='4'>No contacts saved yet.</td></tr>";
    } else {
        contacts.forEach((contact, index) => {
            let row = `<tr>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.phone}</td>
                <td>
                    <button class="edit-btn" onclick="editContact(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }
}

// Function to Delete a Contact
function deleteContact(index) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    loadContacts(); // Reload the updated contacts
}

// Function to Edit a Contact
function editContact(index) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    let contact = contacts[index];

    let newName = prompt("Enter new name:", contact.name);
    let newEmail = prompt("Enter new email:", contact.email);
    let newPhone = prompt("Enter new phone number:", contact.phone);

    if (newName && newEmail && newPhone) {
        contacts[index] = { name: newName, email: newEmail, phone: newPhone };
        localStorage.setItem("contacts", JSON.stringify(contacts));
        loadContacts();
    }
}

// Function to Search Contacts
function searchContact() {
    let searchValue = document.getElementById("searchBox").value.toLowerCase();
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    let tableBody = document.getElementById("contactTableBody");

    tableBody.innerHTML = ""; // Clear existing table

    let filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchValue)
    );

    if (filteredContacts.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='4'>No matching contacts found.</td></tr>";
    } else {
        filteredContacts.forEach((contact, index) => {
            let row = `<tr>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.phone}</td>
                <td>
                    <button class="edit-btn" onclick="editContact(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }
}

// Function to Save Contact from Add Contact Page
document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector(".contact-form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let phone = document.getElementById("phone").value;

            if (!name || !email || !phone) {
                alert("Please fill all fields!");
                return;
            }

            let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
            contacts.push({ name, email, phone });
            localStorage.setItem("contacts", JSON.stringify(contacts));

            alert("Contact saved successfully!");

            // Clear form after saving
            form.reset();
        });
    }
});
