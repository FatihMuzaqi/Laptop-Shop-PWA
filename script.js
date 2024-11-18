window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 10) { 
        navbar.style.backdropFilter = "blur(20px)";
        navbar.style.webkitBackdropFilter = "blur(20px)"; 
        navbar.style.backgroundColor = "rgba(255, 255, 255, 0.534)";
    } else {
        navbar.style.backdropFilter = "none";
        navbar.style.webkitBackdropFilter = "none";
        navbar.style.backgroundColor = "transparent"; 
    }
});

const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

const text = "WELCOME TO FATHCOMP SHOP";
    let index = 0;

    function typeEffect() {
        const h1Element = document.getElementById('typing-text');

        if (index < text.length) {
            h1Element.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeEffect, 100);
        } else {
            setTimeout(() => {
                h1Element.innerHTML = ''; 
                index = 0;
                typeEffect(); 
            }, 2000);
        }
}

    window.onload = function() {
        typeEffect();
    };

    const totalWidth = document.documentElement.scrollWidth;
    const totalHeight = document.documentElement.scrollHeight;
    
    console.log("Lebar total:", totalWidth);
    console.log("Tinggi total:", totalHeight);



    const putih = document.querySelector("#putih");
    const hitam = document.querySelector("#hitam");
    const merah = document.querySelector("#merah");

    const gambar = document.querySelector('#gambar');

    putih.addEventListener('click', () => {
        gambar.src = './images/laptop_putih.png';
        gambar.style.display = 'block';
    })

    hitam.addEventListener('click', () => {
        gambar.src = './images/laptop_hitam.png'; 
        gambar.style.display = 'block'; 
    });

    merah.addEventListener('click', () => {
        gambar.src = './images/laptop_merah.png'; 
        gambar.style.display = 'block';
    });



const modal = document.getElementById("myModal");
const closeBtn = document.getElementsByClassName("close")[0];

function beliProduk() {
    alert('Produk berhasil di beli')
}

function openModal(button) {
    const card = button.closest('.card');
    const productName = card.getAttribute('data-name');
    const productPrice = card.getAttribute('data-price');
    const productImage = card.getAttribute('data-image');

    document.getElementById("modalName").textContent = productName;
    document.getElementById("modalPrice").textContent = productPrice;
    document.getElementById("modalImage").src = productImage;

    modal.classList.add("show");
}

function closeModal() {
    modal.classList.remove("show");
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

closeBtn.onclick = function() {
    closeModal();
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

let db;
const request = indexedDB.open("messagesDB", 1);

request.onerror = function(event) {
    console.error("Database error:", event.target.errorCode);
};

request.onsuccess = function (event) {
    db = event.target.result;
    console.log("Database initialized");

    const kirimButton = document.querySelector('button[name="button"]');
    if (kirimButton) {
        kirimButton.addEventListener("click", () => {
            const inputNama = document.querySelector(".input-nama input").value;
            const inputPesan = document.querySelector(".input-pesan textarea").value;

            if (inputNama && inputPesan) {
                saveMessagesToIndexedDB(inputNama, inputPesan);
            } else {
                alert("Nama dan Pesan harus diisi!");
            }
        });
    } else {
        console.error("Tombol kirim tidak ditemukan!");
    }
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    const objectStore = db.createObjectStore("messages", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("nama", "nama", { unique: false });
    objectStore.createIndex("pesan", "pesan", { unique: false });
    console.log("Object Store created");
};

function requestNotificationPermission() {
    if (Notification.permission === "default") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Notification permission granted");
            }
        });
    }
}

function showNotification() {
    if (Notification.permission === "granted") {
        try {
            new Notification("Pesan Baru", {
                body: "Data berhasil disimpan di IndexedDB",
                icon: "/images/logos.png",
                vibrate: [200, 100, 200],
            });
        } catch (error) {
            console.error("Gagal menampilkan notifikasi:", error);
        }
    } else {
        console.log("Permission not granted for Notification");
    }
}

function saveMessagesToIndexedDB(nama, pesan) {
    const tx = db.transaction(["messages"], "readwrite");
    const objectStore = tx.objectStore("messages");

    const contactData = { nama, pesan };
    const request = objectStore.add(contactData);

    request.onsuccess = function() {
        console.log("Data berhasil disimpan");
        alert("Pesan anda telah terkirim");
        showNotification();
    };

    request.onerror = function(event) {
        console.error("Error saat menyimpan data:", event.target.errorCode);
    };
}

document.addEventListener("DOMContentLoaded", () => {
    requestNotificationPermission();
});
