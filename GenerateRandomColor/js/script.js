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
     * Populate Dropdowns 
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

        // Populate RGB dropdowns
        ["red", "green", "blue"].forEach(populateDropdown);
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
});
