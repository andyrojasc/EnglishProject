$(document).ready(function() {

    var checkArray = []; // checking if both clicked fields are the same fruit
    var idCheck = []; // helper array for storing clicked fields IDs so i can remove "flipped" class if they are different
    var counter = 0;
    var end = 0; // for detecting if all fields are done
    var fields = document.querySelectorAll(".back");
    var images = [
        "assets/img/hacker.png",
        "assets/img/cyberatack.png",
        "assets/img/cybersecurity.png",
        "assets/img/ransomware.png",
        "assets/img/malware.png",
        "assets/img/social.png",
        "assets/img/vishing.png",
        "assets/img/scareware.png",
        "assets/img/baiting.png",
        "assets/img/phishing.png",
        "assets/img/spyware.png",
        "assets/img/trojans.png",
        "assets/img/hacker.png",
        "assets/img/cyberatack.png",
        "assets/img/cybersecurity.png",
        "assets/img/ransomware.png",
        "assets/img/malware.png",
        "assets/img/social.png",
        "assets/img/vishing.png",
        "assets/img/scareware.png",
        "assets/img/baiting.png",
        "assets/img/phishing.png",
        "assets/img/spyware.png",
        "assets/img/trojans.png"
    ];

    function clicked() { // clicked function so i can unbind click event to prevet shit like clicking more then 2 fields at one try
        if ($(this).find(".inner-wrap").hasClass("flipped")) {
            return;
        }
        $(this).find(".inner-wrap").toggleClass("flipped");
        checkArray.push($(this).find("img").attr("src"));
        idCheck.push($(this).attr("id"));
        check();
    }

    $(".field").on("click", clicked);


    function restart() {
        $(".back").find("img").remove(); //remove all current images from the field
        $(".field .inner-wrap").removeClass("flipped"); // remove flipped class so they can flip back again at the starting position
        checkArray = []; // empty check array
        idCheck = []; // empty IDs check array
        counter = 0; // reset counter
        end = 0; // reset ending variable
        startGame();
    }

    function checkEnd() {
        if (end === 24) { //if all 24 fields are uncovered
            alert("Game is over! Your score is " + counter);
            restart();
        }
    }

    function shuffleArray(array) { // shuffle array with images
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    function startGame() {

        var arr = shuffleArray(images); // stores the array of shuffled images

        for (var i = 0; i < fields.length; i++) { // appending those images to the div with class "back"
            var img = document.createElement("img");
            img.src = arr[i];
            fields[i].appendChild(img);
        }


    }

    function check() {
        if (checkArray.length === 2) { // if fields are clicked 2 times we are doing check
            $(".field").off("click", clicked); // disabling click event to prevet shit
            setTimeout(function() {
                if (checkArray[0] !== checkArray[1]) { // if there is  no match
                    $("#" + idCheck[0]).find(".inner-wrap").removeClass("flipped"); // flip the field back
                    $("#" + idCheck[1]).find(".inner-wrap").removeClass("flipped"); // second one flip back as well
                    counter++;
                    checkArray = []; //empty checking array for the next 2 clicks
                    idCheck = []; // same with this one
                    $(".field").on("click", clicked); // bind the click back again
                } else {
                    counter++;
                    end += 2; // if there is a match "end" is raised by 2 as 2 fields are uncovered
                    checkArray = []; // empty array for the next try
                    idCheck = []; // this one as well
                    checkEnd(); // check if game has eneded
                    $(".field").on("click", clicked); // bind click again
                }
                document.querySelector(".counter").innerHTML = counter;
            }, 800);
        }
    }



    startGame();

});