// rooms.html - predvyplnenie rezervacie izby
function prefillRoom(roomType) {
    const roomTypeEl = document.getElementById('roomType');
    const formEl = document.querySelector('.reservation-form');

    if (roomTypeEl) {
        roomTypeEl.value = roomType;
    }

    if (formEl) {
        window.scrollTo({
            top: formEl.offsetTop - 50,
            behavior: 'smooth'
        });
    }
}

// dynamicke vyhladavanie izieb
const roomSearchEl = document.getElementById("roomSearch");
if (roomSearchEl) {
    roomSearchEl.addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase();
        document.querySelectorAll(".room-card").forEach(room => {
            const h3 = room.querySelector("h3");
            const roomName = h3 ? h3.textContent.toLowerCase() : "";
            room.style.display = roomName.includes(searchTerm) ? "block" : "none";
        });
    });
}

// vypis rezervacie po odoslani formulara
const reservationForm = document.querySelector(".reservation-form");
if (reservationForm) {
    reservationForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("reserveName")?.value || "";
        const email = document.getElementById("reserveEmail")?.value || "";
        const date = document.getElementById("reserveDate")?.value || "";
        const guests = document.getElementById("reserveGuests")?.value || "";
        const roomType = document.getElementById("roomType")?.value || "";

        const output = `
            <h4>Vaša rezervácia:</h4>
            <p><strong>Meno:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Dátum príchodu:</strong> ${date}</p>
            <p><strong>Počet osôb:</strong> ${guests}</p>
            <p><strong>Typ izby:</strong> ${roomType}</p>
        `;

        const resultContainer = document.getElementById("searchResults");
        if (resultContainer) {
            resultContainer.innerHTML = output;
            resultContainer.style.display = "block";
        }
    });
}

// contact.html - vypis formulara
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("contactName")?.value || "";
        const email = document.getElementById("contactEmail")?.value || "";
        const message = document.getElementById("contactMessage")?.value || "";

        alert(`Meno: ${name}\nEmail: ${email}\nSpráva: ${message}`);
        
        contactForm.reset();
    });
}
