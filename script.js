// rooms.html - predvyplnenie rezervacie izby
function prefillRoom(roomType) {
    document.getElementById('roomType').value = roomType;
    if (roomType === 'Štandardná izba') {
        document.getElementById('reserveGuests').value = 1;
    } else if (roomType === 'Luxusný apartmán') {
        document.getElementById('reserveGuests').value = 2;
    } else if (roomType === 'Rodinná izba') {
        document.getElementById('reserveGuests').value = 4;
    }
    document.querySelector('.reservation-form').scrollIntoView({ behavior: 'smooth' }); // skrolovanie
}

// rooms.html - dynamicke vyhladavanie izieb
document.getElementById("roomSearch")?.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    document.querySelectorAll(".room-card").forEach(room => {
        const roomName = room.querySelector("h3").textContent.toLowerCase();
        room.style.display = roomName.includes(searchTerm) ? "block" : "none";
    });
});

// rooms.html - vypis rezervacie po odoslani formulara
document.querySelector(".reservation-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("reserveName").value;
    const email = document.getElementById("reserveEmail").value;
    const date = document.getElementById("reserveDate").value;
    const guests = document.getElementById("reserveGuests").value;
    const roomType = document.getElementById("roomType").value;

    // sweet alert 2 oznam
    Swal.fire({
        title: 'Rezervácia prijatá',
        html: `
            <p><strong>Typ izby:</strong> ${roomType || '-'} </p>
            <p><strong>Meno:</strong> ${name || '-'} </p>
            <p><strong>Email:</strong> ${email || '-'} </p>
            <p><strong>Dátum príchodu:</strong> ${date || '-'} </p>
            <p><strong>Počet osôb:</strong> ${guests || '-'} </p>
        `,
        icon: 'success',
        confirmButtonText: 'OK'
    });
});

// contact.html - vypis formulara
document.querySelector(".contact-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const message = document.getElementById("contactMessage").value;

    // sweet alert 2 oznam
    Swal.fire({
        position: "center",
        icon: "success",
        draggable: true,
        title: "Správa odoslaná",
        html:
            `<p><strong>Meno:</strong> ${name || '-'} </p>` +
            `<p><strong>Email:</strong> ${email || '-'} </p>` +
            `<p><strong>Správa:</strong> ${message || '-'} </p>`,
        showConfirmButton: true,
    });
});

// gallery.html - filtrovanie obrázkov
function filterGallery(category, button) {
    const sections = document.querySelectorAll(".gallery-section");
    const buttons = document.querySelectorAll(".filter-btn");

    sections.forEach(section => {
        const hasCategory = section.querySelector(`.gallery-item.${category}`);
        if (category === "all" || hasCategory) {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    });

    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
}

// gallery.html - otváranie/zaváranie sekcií
function toggleSection(titleElement) {
    const grid = titleElement.nextElementSibling;
    grid.classList.toggle("collapsed");
}

// gallery.html - lightbox
let currentImageIndex = 0;
let galleryImages = [];

function openLightbox(img) {
    galleryImages = Array.from(document.querySelectorAll(".gallery-item img"));
    currentImageIndex = galleryImages.indexOf(img);
    document.getElementById("lightbox").classList.add("show");
    document.querySelector(".lightbox-image").src = img.src;
    document.querySelector(".lightbox-image").alt = img.alt;
}

function closeLightbox() {
    document.getElementById("lightbox").classList.remove("show");
}

function changeLightboxImage(n) {
    currentImageIndex += n;
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    document.querySelector(".lightbox-image").src = galleryImages[currentImageIndex].src;
    document.querySelector(".lightbox-image").alt = galleryImages[currentImageIndex].alt;
}

document.addEventListener("keydown", function (e) {
    if (document.getElementById("lightbox").classList.contains("show")) {
        if (e.key === "ArrowLeft") changeLightboxImage(-1);
        if (e.key === "ArrowRight") changeLightboxImage(1);
        if (e.key === "Escape") closeLightbox();
    }
});

document.getElementById("lightbox")?.addEventListener("click", function (e) {
    if (e.target === this) {
        closeLightbox();
    }
});