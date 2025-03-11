document.addEventListener("DOMContentLoaded", function () {
    /*
      Load Navbar 
     */
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        });

    /*
      Populate Dropdowns 
     */
      function setValues() {
        const populateDropdown = (id) => {
            let select = document.getElementById(id);
            if (select) {
                for (let i = 0; i <= 255; i += 5) {
                    let option = document.createElement("option");
                    option.value = i;
                    option.textContent = i;
                    select.appendChild(option);
                }
            }
        };
    
        // Populate both RGB and CMY dropdowns
        ["red", "green", "blue", "cyan", "magenta", "yellow"].forEach(populateDropdown);
    }
    
    // Initialize dropdown values
    setValues();

    /* 
      Generate Random Colors Table 
     */
      function generateRandomColors() {
        // Generate random RGB values
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
    
        // Convert to float values (0-1 range)
        let redFloat = (red / 255).toFixed(2);
        let greenFloat = (green / 255).toFixed(2);
        let blueFloat = (blue / 255).toFixed(2);
    
        // Convert to Hexadecimal format
        let hexColor = `#${red.toString(16).padStart(2, "0")}${green.toString(16).padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;
    
        // Update the UI
        document.getElementById("rgbValues").textContent = `(${redFloat}, ${greenFloat}, ${blueFloat})`;
        document.getElementById("hexValue").textContent = hexColor;
        document.getElementById("colorDisplay").style.backgroundColor = hexColor;
    }
    

    /**  
      RGB Letters Dynamic Coloring (Red, Green, Blue Only)
      */
    function animateRGBLetters() {
        const letters = document.querySelectorAll(".rgb-letter");
        const colors = ["red", "green", "blue"]; // Only RGB colors

        setInterval(() => {
            letters.forEach(letter => {
                let randomColor = colors[Math.floor(Math.random() * colors.length)]; // Pick a random RGB color
                letter.style.color = randomColor;
            });
        }, 500); // Change colors every 500ms
    }

    // Initialize RGB animation
    animateRGBLetters();

    // Expose functions to global scope (if needed elsewhere)
    window.setValues = setValues;
    window.generateRandomColors = generateRandomColors;
});function displayCMYColor() {
    // Get selected values from dropdowns
    let C = parseInt(document.getElementById("cyan").value);
    let M = parseInt(document.getElementById("magenta").value);
    let Y = parseInt(document.getElementById("yellow").value);

    // Convert CMY to RGB using the formula (R,G,B) = (255 − C,255 − M,255 − Y)
    let R = 255 - C;
    let G = 255 - M;
    let B = 255 - Y;

    // Convert RGB to float values (range 0 to 1)
    let R_float = (R / 255).toFixed(2);
    let G_float = (G / 255).toFixed(2);
    let B_float = (B / 255).toFixed(2);

    // Convert RGB to Hex
    let hexColor = rgbToHex(R, G, B);

    // Update Table Data
    document.getElementById("cmyValues").textContent = `(${R_float}, ${G_float}, ${B_float})`;
    document.getElementById("hexCMYValue").textContent = hexColor;
    document.getElementById("cmyDisplay").style.backgroundColor = hexColor;
}

// ✅ Function to Convert RGB to Hexadecimal (Moved Outside)
function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

// ✅ Function to Animate CMY Letters
function animateCMYLetters() {
    const letters = document.querySelectorAll(".cmy-letter"); // Target CMY letters
    const colors = ["cyan", "magenta", "yellow"]; // CMY colors

    setInterval(() => {
        letters.forEach(letter => {
            let randomColor = colors[Math.floor(Math.random() * colors.length)]; // Pick a random CMY color
            letter.style.color = randomColor;
        });
    }, 500); // Change colors every 500ms
}

// ✅ Attach Event Listeners to Dropdowns
document.getElementById("cyan").addEventListener("change", displayCMYColor);
document.getElementById("magenta").addEventListener("change", displayCMYColor);
document.getElementById("yellow").addEventListener("change", displayCMYColor);

// ✅ Initialize CMY animation
animateCMYLetters();

// ✅ Initial Call to Set Default Values
displayCMYColor();
