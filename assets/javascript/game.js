var target,
    score,
    wins = 0,
    losses = 0;
const numberOfCrystals = 4;

// Returns an integer between 1 and 12.
function randomCrystalValue() {
    return Math.floor(Math.random() * 12) + 1;
}

// Resets the game to the initial conditions.
function initializeTheGame() {
    // Sets the target number to an integer between 19 and 120.
    target = Math.floor(Math.random() * 102) + 19;
    score = 0;
    var numberOptions = [];

    // Populates the random values a crystal can take.
    for (let i = 0; i < numberOfCrystals; i++) {
        var number = randomCrystalValue();
        numberOptions.push(number);
    }

    // Displays relevant numbers to the player.
    $("#target").text(target);
    $("#score").text(score);
    $("#wins").text(wins);
    $("#losses").text(losses);

    // Assigns a random value to each crystal.
    for (var i = 0; i < numberOptions.length; i++) {
        var imageCrystal = $(`#crystal${i}`);
        imageCrystal.attr("data-crystalvalue", numberOptions[i]);
    }
}

// Creates the crystals to be clicked.
for (var i = 0; i < numberOfCrystals; i++) {
    // For each iteration, we will create an imageCrystal
    var imageCrystal = $("<img>");

    // First each crystal will be given the class ".crystal-image".
    // This will allow the CSS to take effect.
    imageCrystal.addClass("crystal-image");
    imageCrystal.attr("id", "crystal" + i);

    // Each imageCrystal will be given a src link to the crystal image
    imageCrystal.attr("src", "http://cdn.playbuzz.com/cdn/35910209-2844-45c0-b099-f4d82878d54f/00261fda-4062-4096-81fd-8cf96b9034e8.jpg");
    $("#crystals").append(imageCrystal);
}

// Start the game for the first time.
initializeTheGame();

// This time, our click event applies to every single crystal on the page. Not just one.
$(".crystal-image").on("click", function () {

    // Determining the crystal's value requires us to extract the value from the data attribute.
    // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
    // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
    // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the score
    var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);
    // We then add the crystalValue to the user's "score" which is a global variable.
    // Every click, from every crystal adds to the global score.
    score += crystalValue;

    // All of the same game win-lose logic applies. So the rest remains unchanged.
    $("#score").text(score);

    if (score === target) {
        alert("You win!");
        wins++;
        initializeTheGame();
    } else if (score >= target) {
        alert("You lose!!");
        losses++;
        initializeTheGame();
    }
});