document.addEventListener("DOMContentLoaded", function () {
    /*
      Load Navbar 
    */
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            let navbarContainer = document.getElementById("navbar-container");
            if (navbarContainer) {
                navbarContainer.innerHTML = data;
            }
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
        if (!tbody) return;

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
            row.innerHTML = `
                <td>${rgbFloatText}</td>
                <td>${hexColor}</td>
                <td style="background-color: ${hexColor}; width: 50px; height: 50px;"></td>
            `;
            tbody.appendChild(row);
        }
    }

    let generateBtn = document.getElementById("generateColorsBtn");
    if (generateBtn) {
        generateBtn.addEventListener("click", generateRandomColors);
    }

    /*
      Update Selected Color Display
    */
    function updateSelectedColor() {
        let redElem = document.getElementById("red");
        let greenElem = document.getElementById("green");
        let blueElem = document.getElementById("blue");

        if (!redElem || !greenElem || !blueElem) return;

        let red = parseInt(redElem.value) || 0;
        let green = parseInt(greenElem.value) || 0;
        let blue = parseInt(blueElem.value) || 0;

        let redFloat = (red / 255).toFixed(2);
        let greenFloat = (green / 255).toFixed(2);
        let blueFloat = (blue / 255).toFixed(2);
        let hexColor = `#${red.toString(16).padStart(2, "0")}${green.toString(16).padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;

        let rgbValuesElem = document.getElementById("rgbValues");
        let hexValueElem = document.getElementById("hexValue");
        let colorDisplayElem = document.getElementById("colorDisplay");

        if (rgbValuesElem) rgbValuesElem.textContent = `(${redFloat}, ${greenFloat}, ${blueFloat})`;
        if (hexValueElem) hexValueElem.textContent = hexColor;
        if (colorDisplayElem) colorDisplayElem.style.backgroundColor = hexColor;
    }

    ["red", "green", "blue"].forEach(id => {
        let element = document.getElementById(id);
        if (element) element.addEventListener("change", updateSelectedColor);
    });

    /*
      Initialize CMY Color Display
    */
      function displayCMYColor() {
        let C = document.getElementById("cyan");
        let M = document.getElementById("magenta");
        let Y = document.getElementById("yellow");
        
        if (!C || !M || !Y) return;

        let cyan = parseInt(C.value) || 0;
        let magenta = parseInt(M.value) || 0;
        let yellow = parseInt(Y.value) || 0;

        let R = 255 - cyan;
        let G = 255 - magenta;
        let B = 255 - yellow;

        let R_float = (R / 255).toFixed(2);
        let G_float = (G / 255).toFixed(2);
        let B_float = (B / 255).toFixed(2);

        let hexColor = rgbToHex(R, G, B);

        let cmyValuesElem = document.getElementById("cmyValues");
        let hexCMYValueElem = document.getElementById("hexCMYValue");
        let cmyDisplayElem = document.getElementById("cmyDisplay");

        if (cmyValuesElem) cmyValuesElem.textContent = `(${R_float}, ${G_float}, ${B_float})`;
        if (hexCMYValueElem) hexCMYValueElem.textContent = hexColor;
        if (cmyDisplayElem) cmyDisplayElem.style.backgroundColor = hexColor;
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
   setTimeout(()=>{
    updateSelectedColor();
    displayCMYColor();
   },100);

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
