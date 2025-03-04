document.addEventListener("DOMContentLoaded", function () {
    // Load the navbar
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        });

    // Function to generate random colors
    function generateRandomColors() {
        let table = '<table class="table table-bordered"><tr>';
        for (let i = 0; i < 10; i++) {
            let color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            table += `<td style="background-color:${color}; height:50px; width:50px;"></td>`;
        }
        table += '</tr></table>';
        document.getElementById("colorTable").innerHTML = table;
    }

    // Expose function to the window object
    window.generateRandomColors = generateRandomColors;
});
 // Populate RGB dropdowns with values from 0 to 255
 const populateDropdown = (id) => {
    let select = document.getElementById(id);
    for (let i = 0; i <= 255; i += 5) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
    }
};

["red", "green", "blue"].forEach(populateDropdown);