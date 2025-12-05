// Hamburger Menu Toggle
const hb = document.querySelector('#hamburgerBtn');
const pw = document.querySelector('#pageWrapper');

hb.addEventListener('click', () => {
    pw.classList.toggle('moveOver');
});

// Close menu when clicking a navigation link
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        pw.classList.remove('moveOver');
    });
});

// Grab the hotel location data
import { hotels } from '../data/hoteldata.js';

const hotelCards = document.querySelector('#cards');

hotels.forEach(hotel => {
    const mySection = document.createElement('section');
    
    const theImage = document.createElement("img");
    theImage.src = `images/${hotel.photo}`;
    theImage.alt = hotel.name;
    
    const theName = document.createElement("h2");
    theName.textContent = hotel.name;
    
    const theAddress = document.createElement("address");
    theAddress.innerHTML = `${hotel.address[0]}<br>${hotel.address[1]}`;
    
    const thePhone = document.createElement("a");
    thePhone.textContent = hotel.phone;
    thePhone.href = `tel:${hotel.phone}`;
    
    mySection.appendChild(theImage);
    mySection.appendChild(theName);
    mySection.appendChild(theAddress);
    mySection.appendChild(thePhone);
    
    hotelCards.appendChild(mySection);
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
