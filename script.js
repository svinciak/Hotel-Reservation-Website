// ROOMS.HTML - Predvyplnenie rezervacie izby
function prefillRoom(roomType) {
    document.getElementById('roomType').value = roomType;
    
   if (roomType === 'Štandardná izba' || roomType === 'Standardna izba') {
        document.getElementById('reserveGuests').value = 1;
        console.log("Nastavene hosty: 1");
    } else if (roomType === 'Luxusný apartmán' || roomType === 'Luxusny apartman') {
        document.getElementById('reserveGuests').value = 2;
        console.log("Nastavene hosty: 2");
    } else if (roomType === 'Rodinná izba' || roomType === 'Rodinna izba') {
        document.getElementById('reserveGuests').value = 4;
        console.log("Nastavene hosty: 4");
    } else {
        console.log("POZOR: Neznamy typ izby!");
    }
    
    // Skrolovanie na formular
    var form = document.querySelector('.reservation-form');
    if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
    }
}

// ROOMS.HTML - Dynamicke vyhladavanie izieb
var roomSearchInput = document.getElementById("roomSearch");

if (roomSearchInput) {
    roomSearchInput.oninput = function() {
        var searchTerm = this.value.toLowerCase();
        var roomCards = document.querySelectorAll(".room-card");

        for (var i = 0; i < roomCards.length; i++) {
            var room = roomCards[i];
            var roomName = room.querySelector("h3").textContent.toLowerCase();
            
            if (roomName.indexOf(searchTerm) !== -1) {
                room.style.display = "block";
            } else {
                room.style.display = "none";
            }
        }
    };
}

// ROOMS.HTML - Vypis rezervacie po odoslani
var reservationForm = document.querySelector(".reservation-form");

if (reservationForm) {
    reservationForm.onsubmit = function(e) {
        e.preventDefault();
        
        var name = document.getElementById("reserveName").value;
        var email = document.getElementById("reserveEmail").value;
        var date = document.getElementById("reserveDate").value;
        var guests = document.getElementById("reserveGuests").value;
        var roomType = document.getElementById("roomType").value;

        if (!name) name = '-';
        if (!email) email = '-';
        if (!date) date = '-';
        if (!guests) guests = '-';
        if (!roomType) roomType = '-';
        
        // Sweet Alert 2 oznam
        Swal.fire({
            title: 'Rezervacia prijata',
            html: 
                '<p><strong>Typ izby:</strong> ' + roomType + '</p>' +
                '<p><strong>Meno:</strong> ' + name + '</p>' +
                '<p><strong>Email:</strong> ' + email + '</p>' +
                '<p><strong>Datum prichodu:</strong> ' + date + '</p>' +
                '<p><strong>Pocet osob:</strong> ' + guests + '</p>',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    };
}

// CONTACT.HTML - Vypis kontaktneho formulara
var contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.onsubmit = function(e) {
        e.preventDefault();
        var name = document.getElementById("contactName").value;
        var email = document.getElementById("contactEmail").value;
        var message = document.getElementById("contactMessage").value;
        
        // Ak nemame hodnotu, dame -
        if (!name) name = '-';
        if (!email) email = '-';
        if (!message) message = '-';
        
        // Sweet Alert 2 oznam
        Swal.fire({
            position: "center",
            icon: "success",
            draggable: true,
            title: "Sprava odoslana",
            html:
                '<p><strong>Meno:</strong> ' + name + '</p>' +
                '<p><strong>Email:</strong> ' + email + '</p>' +
                '<p><strong>Sprava:</strong> ' + message + '</p>',
            showConfirmButton: true,
        });
    };
}

// GALLERY.HTML - Filtrovanie obrazkov
function filterGallery(category, button) {
    var sections = document.querySelectorAll(".gallery-section");
    var buttons = document.querySelectorAll(".filter-btn");
    
    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        var hasCategory = section.querySelector(".gallery-item." + category);
        
        if (category === "all" || hasCategory) {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    }
    for (var j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove("active");
    }
    button.classList.add("active");
}

// GALLERY.HTML - Otvaranie/zavaranie sekcii
function toggleSection(titleElement) {
    var grid = titleElement.nextElementSibling;
    
    if (grid.classList.contains("collapsed")) {
        grid.classList.remove("collapsed");
    } else {
        grid.classList.add("collapsed");
    }
}

// GALLERY.HTML - Lightbox (galeria obrazkov)
var currentImageIndex = 0;
var galleryImages = [];

function openLightbox(img) {
    var allImages = document.querySelectorAll(".gallery-item img");
    galleryImages = [];
    
    for (var i = 0; i < allImages.length; i++) {
        galleryImages.push(allImages[i]);
    }
    currentImageIndex = -1;
    for (var j = 0; j < galleryImages.length; j++) {
        if (galleryImages[j] === img) {
            currentImageIndex = j;
            break;
        }
    }

    document.getElementById("lightbox").classList.add("show");
    document.querySelector(".lightbox-image").src = img.src;
    document.querySelector(".lightbox-image").alt = img.alt;
}

function closeLightbox() {
    document.getElementById("lightbox").classList.remove("show");
}

function changeLightboxImage(n) {
    currentImageIndex = currentImageIndex + n;

    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }

    document.querySelector(".lightbox-image").src = galleryImages[currentImageIndex].src;
    document.querySelector(".lightbox-image").alt = galleryImages[currentImageIndex].alt;
}

document.onkeydown = function(e) {
    var lightbox = document.getElementById("lightbox");
    if (lightbox && lightbox.classList.contains("show")) {
        if (e.key === "ArrowLeft") {
            changeLightboxImage(-1);
        }
        if (e.key === "ArrowRight") {
            changeLightboxImage(1);
        }
        if (e.key === "Escape") {
            closeLightbox();
        }
    }
};

var lightboxElement = document.getElementById("lightbox");
if (lightboxElement) {
    lightboxElement.onclick = function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    };
}