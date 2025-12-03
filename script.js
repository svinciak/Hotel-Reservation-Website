// rooms.html - predvyplnenie rezervacie izby
function prefillRoom(roomType) {
    document.getElementById('roomType').value = roomType;
    document.querySelector('.reservation-form').scrollIntoView({ behavior: 'smooth' });
}

// dynamicke vyhladavanie izieb
document.getElementById("roomSearch")?.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    document.querySelectorAll(".room-card").forEach(room => {
        const roomName = room.querySelector("h3").textContent.toLowerCase();
        room.style.display = roomName.includes(searchTerm) ? "block" : "none";
    });
});

// vypis rezervacie po odoslani formulara
document.querySelector(".reservation-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("reserveName").value;
    const email = document.getElementById("reserveEmail").value;
    const date = document.getElementById("reserveDate").value;
    const guests = document.getElementById("reserveGuests").value;
    const roomType = document.getElementById("roomType").value;

    document.getElementById("searchResults").innerHTML = `
        <h4>Vaša rezervácia:</h4>
        <p><strong>Meno:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Dátum príchodu:</strong> ${date}</p>
        <p><strong>Počet osôb:</strong> ${guests}</p>
        <p><strong>Typ izby:</strong> ${roomType}</p>
    `;
});

// contact.html - vypis formulara
document.querySelector(".contact-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const message = document.getElementById("contactMessage").value;

    alert(`Meno: ${name}\nEmail: ${email}\nSpráva: ${message}`);
    this.reset();
});

// gallery.html - filtrovanie obrázkov
function filterGallery(category) {
    const items = document.querySelectorAll(".gallery-item");
    const buttons = document.querySelectorAll(".filter-btn");

    items.forEach(item => {
        if (category === "all") {
            item.style.display = "block";
        } else if (item.classList.contains(category)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });

    buttons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
}