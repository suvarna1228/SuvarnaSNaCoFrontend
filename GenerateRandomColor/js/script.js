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

        ["red", "green", "blue", "cyan", "magenta", "yellow"].forEach(populateDropdown);
    }
    
    setValues();

    /*
      Generate Random Colors Table 
    */
    function generateRandomColors() {
        let tbody = document.getElementById("colorTableBody");
        if (!tbody) {
            console.error("Table body not found!");
            return;
        }

        tbody.innerHTML = ""; // Clear previous rows

        for (let i = 0; i < 10; i++) {
            let red = Math.floor(Math.random() * 256);
            let green = Math.floor(Math.random() * 256);
            let blue = Math.floor(Math.random() * 256);

            let redFloat = (red / 255).toFixed(2);
            let greenFloat = (green / 255).toFixed(2);
            let blueFloat = (blue / 255).toFixed(2);
            let rgbFloatText = `(${redFloat}, ${greenFloat}, ${blueFloat})`;

            let hexColor = `#${red.toString(16).padStart(2, "0")}${green.toString(16).padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;

            let row = document.createElement("tr");

            let rgbFloatCell = document.createElement("td");
            rgbFloatCell.textContent = rgbFloatText;
            row.appendChild(rgbFloatCell);

            let hexCell = document.createElement("td");
            hexCell.textContent = hexColor;
            row.appendChild(hexCell);

            let colorCell = document.createElement("td");
            colorCell.style.backgroundColor = hexColor;
            colorCell.style.width = "50px";
            colorCell.style.height = "50px";
            row.appendChild(colorCell);

            tbody.appendChild(row);
        }
    }

    /*
      Attach Event Listeners
    */
    let generateBtn = document.getElementById("generateColorsBtn");
    if (generateBtn) {
        generateBtn.addEventListener("click", generateRandomColors);
    } else {
        console.error("Generate Colors button not found!");
    }

    /*
      Initialize Dynamic Color Display for RGB
    */
    function updateSelectedColor() {
        let red = parseInt(document.getElementById("red").value) || 0;
        let green = parseInt(document.getElementById("green").value) || 0;
        let blue = parseInt(document.getElementById("blue").value) || 0;

        let redFloat = (red / 255).toFixed(2);
        let greenFloat = (green / 255).toFixed(2);
        let blueFloat = (blue / 255).toFixed(2);

        let hexColor = `#${red.toString(16).padStart(2, "0")}${green.toString(16).padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;

        document.getElementById("rgbValues").textContent = `(${redFloat}, ${greenFloat}, ${blueFloat})`;
        document.getElementById("hexValue").textContent = hexColor;
        document.getElementById("colorDisplay").style.backgroundColor = hexColor;
    }

    ["red", "green", "blue"].forEach(id => {
        let element = document.getElementById(id);
        if (element) element.addEventListener("change", updateSelectedColor);
    });

    /*
      Initialize CMY Color Display
    */
    function displayCMYColor() {
        let C = parseInt(document.getElementById("cyan").value) || 0;
        let M = parseInt(document.getElementById("magenta").value) || 0;
        let Y = parseInt(document.getElementById("yellow").value) || 0;

        let R = 255 - C;
        let G = 255 - M;
        let B = 255 - Y;

        let R_float = (R / 255).toFixed(2);
        let G_float = (G / 255).toFixed(2);
        let B_float = (B / 255).toFixed(2);

        let hexColor = rgbToHex(R, G, B);

        document.getElementById("cmyValues").textContent = `(${R_float}, ${G_float}, ${B_float})`;
        document.getElementById("hexCMYValue").textContent = hexColor;
        document.getElementById("cmyDisplay").style.backgroundColor = hexColor;
    }

    function rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    }

    ["cyan", "magenta", "yellow"].forEach(id => {
        let element = document.getElementById(id);
        if (element) element.addEventListener("change", displayCMYColor);
    });

    /*
      Animate RGB and CMY Letters
    */
    function animateLetters(className, colors) {
        const letters = document.querySelectorAll(className);
        setInterval(() => {
            letters.forEach(letter => {
                letter.style.color = colors[Math.floor(Math.random() * colors.length)];
            });
        }, 500);
    }

    animateLetters(".rgb-letter", ["red", "green", "blue"]);
    animateLetters(".cmy-letter", ["cyan", "magenta", "yellow"]);

    /*
      Initialize Default Colors
    */
    updateSelectedColor();
    displayCMYColor();
});



function displaySafeColors() {
    const container = document.getElementById("colorGrid");
    container.innerHTML = ""; // Clear previous content

    const safeColors = ["00", "33", "66", "99", "CC", "FF"];
    let table = document.createElement("table");
    table.classList.add("table", "table-bordered", "mt-3", "mx-auto");

    for (let r = 0; r < safeColors.length; r++) {
        let row = document.createElement("tr");

        for (let g = 0; g < safeColors.length; g++) {
            for (let b = 0; b < safeColors.length; b++) {
                let color = `#${safeColors[r]}${safeColors[g]}${safeColors[b]}`;
                let cell = document.createElement("td");

                cell.style.backgroundColor = color;
                cell.style.width = "50px";
                cell.style.height = "50px";
                cell.style.border = "1px solid #000";
                cell.textContent = color;
                cell.style.color = "white";
                cell.style.textAlign = "center";
                row.appendChild(cell);
            }
        }

        table.appendChild(row);
    }

    container.appendChild(table);
}
