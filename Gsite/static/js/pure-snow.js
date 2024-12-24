let snowflakesCount = 500; // Snowflake count, can be overwritten by attrs
let baseCSS = ``;


// set global attributes
if (typeof SNOWFLAKES_COUNT !== 'undefined') {
  snowflakesCount = SNOWFLAKES_COUNT;
}
if (typeof BASE_CSS !== 'undefined') {
  baseCSS = BASE_CSS;
}

let bodyHeightPx = null;
let pageHeightVh = null;

function setHeightVariables() {
  bodyHeightPx = document.body.offsetHeight;
  pageHeightVh = (100 * bodyHeightPx / window.innerHeight);
}

// get params set in snow div
function getSnowAttributes() {
  const snowWrapper = document.getElementById('snow');
  snowflakesCount = Number(
    snowWrapper?.dataset?.count || snowflakesCount
  );
}

// This function allows you to turn on and off the snow
function showSnow(value) {
  if (value) {
    document.getElementById('snow').style.display = "block";
  }
  else {
    document.getElementById('snow').style.display = "none";
  }
}

// Creating snowflakes
function generateSnow(snowDensity = 200) {
  snowDensity -= 1;
  const snowWrapper = document.getElementById('snow');
  snowWrapper.innerHTML = '';
  for (let i = 0; i < snowDensity; i++) {
    let board = document.createElement('div');
    board.className = "snowflake";
    const snowflakeCharacters = ['❄', '❅', '❆', '❉', '❊'];
    board.innerHTML = snowflakeCharacters[Math.floor(Math.random() * snowflakeCharacters.length)]; // Randomly select a snowflake character
    board.style.fontSize = '20px'; // Set font size for visibility
    board.style.color = 'white'; // Set color to white for better visibility
    snowWrapper.appendChild(board);
    // console.log(`Snowflake displayed: ${board.innerHTML}`); // Log the displayed snowflake character
  }
}

function getOrCreateCSSElement() {
  let cssElement = document.getElementById("psjs-css");
  if (cssElement) return cssElement;

  cssElement = document.createElement('style');
  cssElement.id = 'psjs-css';
  document.head.appendChild(cssElement);
  return cssElement;
}

// Append style for each snowflake to the head
function addCSS(rule) {
  const cssElement = getOrCreateCSSElement();
  cssElement.innerHTML = rule; // safe to use innerHTML
  document.head.appendChild(cssElement);
}

// Math
function randomInt(value = 100) {
  return Math.floor(Math.random() * value) + 1;
}

function randomIntRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// Create style for snowflake
function generateSnowCSS(snowDensity = 200) {
  let snowflakeName = "snowflake";
  let rule = baseCSS;

  for (let i = 1; i < snowDensity; i++) {
    let randomX = Math.random() * 100; // vw
    let randomOffset = Math.random() * 10 // vw;
    let randomXEnd = randomX + randomOffset;
    let randomXEndYoyo = randomX + (randomOffset / 2);
    let randomYoyoTime = getRandomArbitrary(0.3, 0.8);
    let randomYoyoY = randomYoyoTime * pageHeightVh; // vh
    let randomScale = Math.random();
    let fallDuration = randomIntRange(5, pageHeightVh / 10 * 4); // s (wider range for variability)
    let fallDelay = randomInt(pageHeightVh / 10 * 5) * -1; // s (increased delay for staggered effect)
    let opacity = Math.random();

    rule += `
      .${snowflakeName}:nth-child(${i}) {
        opacity: ${opacity};
        transform: translate(${randomX}vw, -10px) scale(${randomScale});
        animation: fall-${i} ${fallDuration}s ${fallDelay}s linear infinite;
      }
      @keyframes fall-${i} {
        ${randomYoyoTime * 100}% {
        transform: translate(${randomXEnd}vw, ${randomYoyoY}vh) scale(${randomScale}) rotate(${Math.random() * 360}deg); // Add rotation effect
        }
        to {
          transform: translate(${randomXEndYoyo}vw, ${pageHeightVh}vh) scale(${randomScale});
        }
      }
    `
  }
  addCSS(rule);
}

// Load the rules and execute after the DOM loads
function createSnow() {
  setHeightVariables();
  getSnowAttributes();
  generateSnowCSS(snowflakesCount);
  generateSnow(snowflakesCount);
};


window.addEventListener('resize', createSnow);

// export createSnow function if using node or CommonJS environment
if (typeof module !== 'undefined') {
  module.exports = {
    createSnow,
    showSnow,
  };
}
else {
  window.onload = createSnow;
}
