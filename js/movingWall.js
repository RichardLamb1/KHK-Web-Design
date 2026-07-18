/**
 * movingWall.js
 * 
 * Creates a dynamic effect where images move in a wall-like pattern in
 * Bootstrap 5. The KHK website uses this effect on the employers page to
 * create a visually engaging experience for users. The effect is achieved by
 * manipulating the position of images based on user interactions, such as
 * scrolling or mouse movement.
 * 
 * To use this script, paste the following HTML structure:
 * <div class="wall-container">
 *      <div class="wall-track">
 *          <!-- JavaScript will populate these with the moving wall images -->
 *          <!-- Add or remove wall tracks as desired -->
 *      </div>
 *      <div class="wall-track"></div>
 *      <div class="wall-track"></div>
 *      <div class="wall-track"></div>
 *  </div>
 *  <script src="movingWall.js"></script>
 * 
 * @author Richard Lamb
 * @version 1.0
 * @license MIT
 */

const wallImages = [
  { src: "assets/logos/Google-Logo.wine.svg", alt: "Google Logo" },
  { src: "assets/logos/Tesla,_Inc.-Logo.wine.svg", alt: "Tesla Logo" },
  { src: "assets/logos/Amazon_(company)-Logo.wine.svg", alt: "Amazon Logo" },
  { src: "assets/logos/Meta_Platforms-Logo.wine.svg", alt: "Meta Logo" },
  { src: "assets/logos/The_Walt_Disney_Company-Logo.wine.svg", alt: "Walt Disney Logo" },
  { src: "assets/logos/McKinsey_&_Company-Logo.wine.svg", alt: "McKinsey Logo" },
  { src: "assets/logos/Lockheed_Martin-Logo.wine.svg", alt: "Lockheed Martin Logo" },
  { src: "assets/logos/ExxonMobil-Logo.wine.svg", alt: "ExxonMobil Logo" },
  { src: "assets/logos/Snapchat-Logo.wine.svg", alt: "Snapchat Logo" },
  { src: "assets/logos/Honda-Logo.wine.svg", alt: "Honda Logo" },
  { src: "assets/logos/Capital_One-Logo.wine.svg", alt: "Capital One Logo" },
  { src: "assets/logos/Moderna_logo.svg", alt: "Moderna Logo" },
  { src: "assets/logos/Marathon_Petroleum-Logo.wine.svg", alt: "Marathon Petroleum Logo" },
  { src: "assets/logos/Boston_Scientific_Logo.svg", alt: "Boston Scientific Logo" },
  { src: "assets/logos/Cargill-Logo.wine.svg", alt: "Cargill Logo" },
  { src: "assets/logos/burns-and-mcdonnell-logo-vector.svg", alt: "Burns and McDonnell Logo" },
  { src: "assets/logos/GE_HealthCare_logo_2023.svg", alt: "GE Healthcare Logo" },
  { src: "assets/logos/Siemens-logo.svg", alt: "Siemens Logo" },
  { src: "assets/logos/Rivian_logo_and_wordmark.svg", alt: "Rivian Logo" },
  { src: "assets/logos/BP-Logo.wine.svg", alt: "BP Logo" },
  { src: "assets/logos/PepsiCo-Logo.wine.svg", alt: "PepsiCo Logo" },
  { src: "assets/logos/Tokyo_Electron-Logo.wine.svg", alt: "Tokyo Electron Logo" },
  { src: "assets/logos/Johnson_&_Johnson-Logo.wine.svg", alt: "Johnson & Johnson Logo" },
  { src: "assets/logos/Expedia-Logo.wine.svg", alt: "Expedia Logo" },
  { src: "assets/logos/Milwaukee_Logo.svg", alt: "Milwaukee Tool Logo" },
  { src: "assets/logos/Rockwell_Automation_logo_(2019).svg", alt: "Rockwell Automation Logo" },
  { src: "assets/logos/Sub-Zero_(logo).svg", alt: "Sub-Zero Logo" },
  { src: "assets/logos/Honeywell-Logo.wine.svg", alt: "Honeywell Logo" },
  { src: "assets/logos/Epic_Systems.svg", alt: "Epic Systems Logo" },
];

const wallTracks = document.querySelectorAll('.wall-track');

var counter = 0;

/**
 * getNext() is called by createWall() to get the next image to be displayed in
 * the track.
 * 
 * @param {number} trackIndex - The index of the track for which to get the next image
 * @return <img> element
 */
function getNext(trackIndex) {

  /* Calculate the index of the next image to be displayed */
  index = (counter * wallTracks.length + trackIndex) % wallImages.length;

  /* Create a new image element and set its src and alt attributes based on the index */
  const newElement = document.createElement('img');
  newElement.src = wallImages[index].src;
  newElement.alt = wallImages[index].alt;

  /* Increment the counter and return the new element */
  counter++;
  return newElement;
}

/**
 * createWall() is the main function.
 */
function createWall() {
  
  /* Loop through each track and populate it with images
     We need to create a seamless loop by duplicating the images */
  wallTracks.forEach((track, trackIndex) => {
    for (let i = 0; i < wallImages.length * 2; i++) {
      const newElement = getNext(trackIndex);
      track.appendChild(newElement);
    }
  });
}

createWall();
