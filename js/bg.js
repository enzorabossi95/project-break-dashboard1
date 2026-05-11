const bgImages = [
  '../images/image1.jpg', 
  '../images/image2.jpg',
  '../images/image3.jpg',
  '../images/image4.jpg',
  '../images/image5.jpg',
  '../images/image6.jpg',
  '../images/image7.jpg',
  '../images/image8.jpg',
  '../images/image9.jpg',  
];

let currentBgIndex = Math.floor(Math.random() * bgImages.length);

function changeBg() {
  document.body.style.backgroundImage = `url('${bgImages[currentBgIndex]}')`;
  currentBgIndex = (currentBgIndex + 1) % bgImages.length;
}

changeBg();
setInterval(changeBg, 15000);
