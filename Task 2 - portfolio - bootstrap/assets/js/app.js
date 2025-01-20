
function displayWelcomeMessage() {
    const name = prompt("Enter your name:");
    const age = prompt("Enter your age:");

    if (name && age) {
        const welcomeMessage = `Welcome, ${name}! `;

       
        alert(welcomeMessage);
    } else {
        alert("Please enter valid details.");
    }
}


window.onload = () => {
    displayWelcomeMessage();
};