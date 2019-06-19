$(document).ready(function() {
    var audioBad = document.getElementById("badAudio");
    var audioGood = document.getElementById("goodAudio");
    var audioFinal = document.getElementById("finalAudio");
    var errorAudio = document.getElementById("errorAudio");
  
    //section memorie
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
        "assets/img/trojans.png",
        "assets/img/bad-card.jpeg",
        "assets/img/bad-card.jpeg",
        "assets/img/bad-card.jpeg",
        "assets/img/bad-card.jpeg",
        "assets/img/bad-card.jpeg",
        "assets/img/bad-card.jpeg"
        
    ];

    function clicked() { // clicked function so i can unbind click event to prevet shit like clicking more then 2 fields at one try
        if ($(this).find(".inner-wrap").hasClass("flipped")) {
            return;
        }
        $(this).find(".inner-wrap").toggleClass("flipped");
        checkArray.push($(this).find("img").attr("src"));
        idCheck.push($(this).attr("id"));
        check();
        badCard();
        questionCard();
    }

    $(".field").on("click", clicked);

    function badCard(){
        if(checkArray[0] === "assets/img/bad-card.jpeg" || checkArray[1] === "assets/img/bad-card.jpeg"){
            console.log(checkArray[0]);
            audioBad.play();
            $('#table-game').addClass('animated shake');
            $(".field").off("click", clicked); // disabling click event to prevet shit
            setTimeout(function() {
            $("#" + idCheck[0]).find(".inner-wrap").removeClass("flipped"); // flip the field back
            $("#" + idCheck[1]).find(".inner-wrap").removeClass("flipped"); // flip the field back
            checkArray = []; //empty checking array for the next 2 clicks
            idCheck = []; // same with this one
            counter+=5;
            console.log("badcard");
            document.querySelector(".counter").innerHTML = counter;
            $(".field").on("click", clicked); // disabling click event to prevet shit
            $('#table-game').removeClass('animated shake');
         },800);
            
         
        }
    }
    function questionCard(){
        if(checkArray[0] === "assets/img/question-card.jpeg" || checkArray[1] === "assets/img/question-card.jpeg"){
            play();
            console.log(checkArray[0]);
            $(".field").off("click", clicked); // disabling click event to prevet shit
            setTimeout(function() {
            $('#modal').click();
            $("#" + idCheck[0]).find(".inner-wrap").removeClass("flipped"); // flip the field back
            $("#" + idCheck[1]).find(".inner-wrap").removeClass("flipped"); // flip the field back
            checkArray = []; //empty checking array for the next 2 clicks
            idCheck = []; // same with this one
            counter+=5;
            console.log("badcard");
            document.querySelector(".counter").innerHTML = counter;
            $(".field").on("click", clicked); // disabling click event to prevet shit
            $('#table-game').removeClass('animated shake');
         },800);
            
         
        }
    }
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
            alert("Memory game is over but you have a last chance in the question game be ready ");
            $('#table-game').hide();
            $('#begin').click();
          
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
                    errorAudio.play();
                    counter++;
                    checkArray = []; //empty checking array for the next 2 clicks
                    idCheck = []; // same with this one
                    $(".field").on("click", clicked); // bind the click back again
                }else {
                  audioGood.play();
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

    //quiz section
    const quizArray = [
        {
          question: 'What is the definition of cybersecurity?',
          options: ['Use of knowledge in computing to gain unauthorized access to a system.', 'Practice of protecting systems.', 'Classify cyber attacks into different types based on their main goal. ','An attack launched from one or more computers against another computer.'],
          answer: 'option2'
        },
        {
          question: 'Which is the attack that is done through telephony services?',
          options: ['Vishing', 'Sacreware',' Phishing', 'Baiting' ],
          answer: 'option1'
        },
        {
          question: 'Which is the cyber attacks that asks for exchange of money?',
          options: ['Malware', 'Vishing', 'Ransomware', 'Social engineering'],
          answer: 'option3'
        },
        {
          question: 'A hacker is …',
          options: ['A criminal', 'Someone smart', 'A bad person', 'Not that good at computing'],
          answer: 'option2'
        },
        {
          question: 'The importance of cybersecurity is..',
          options: ['Protect the user&#39;s information', 'Make sure everyone is safe on the internet.', 'Encrypt all the data from a computer in exchange for money.', 'Make sure no one tries to steal the users information.'],
          answer: 'option1'
        },
        
    ];
    let result = 0;
    let questionNumber = 1;
    let question = 0;
    let answer;
    
    function checkQ(){
        $('#question').append('<p class="number">Question ' + questionNumber + ' of ' + quizArray.length + '</p>');
        $('#question').append('<p class="questions">' + quizArray[question].question + '</p>');
        $('#question').append('<div><div class="choose"><input type="radio" name="options" value="option1">' + quizArray[question].options[0] + '</div><div class="choose"><input type="radio" name="options" value="option2">' + quizArray[question].options[1] + '</div><div class="choose"><input type="radio" name="options" value="option3">' + quizArray[question].options[2] + '</div><div class="choose"><input type="radio" name="options" value="option4">' + quizArray[question].options[3] + '</div></div>');
        $('#question').append('<button id="next" disabled class="mb-4">Next</button>');
        question++;
        questionNumber++;
    }
        $('#begin').click(function() {
          $('body').css('background-image', 'none');
          $('body').css('background-color', 'white');
          $('#landingPage').css('display', 'none');
          $('#question').css('display', 'block');
          checkQ();
        });
      
        $('#question').on('click', '.choose', function () {
          $('#question').find('*').removeAttr('style');
          $(this).children().prop("checked", true);
          $(this).css('background-color', '#4CAF50');
          answer = $(this).children().val();
          if(question <= 4){
            $('#next').css('opacity', '1');
            $('#next').css('cursor', 'pointer');
            $('#next').removeAttr('disabled');
          } else {
            $('#next').css('display', 'none');
          }
          $('#submit').css('opacity', '1');
          $('#submit').css('cursor', 'pointer');
          $('#submit').removeAttr('disabled');
        });
      
        $('#question').on('click', '#next', function (){
          if(answer === quizArray[question - 1].answer) {
            audioGood.play();
            counter -= 5;
            if(counter < 0){
              counter = 0;
            }
            document.querySelector(".counter").innerHTML = counter;
          }else{
            errorAudio.play();
              counter += 5;
              document.querySelector(".counter").innerHTML = counter;
            
          }
          $('#question').children().remove();
          checkQ();
          if((questionNumber - 1) === quizArray.length) {
            $('#next').css('display', 'none');
            $('#question').append('<button id="submit" disabled>Submit</button>');
          }
        });
      
        $('#question').on('click', '#submit', function(){
          if(answer === quizArray[question - 1].answer) {
         
            counter -= 5;
            if(counter < 0){
              counter = 0;
            }
            document.querySelector(".counter").innerHTML = counter;
          }else{
            
              counter += 5;
              document.querySelector(".counter").innerHTML = counter;
            
          }
          audioFinal.play();
          $('#question').css('display', 'none');
          $('#result').css('display', 'block');
          $('#result').append('<div class=results><p>Thanks for completed the game </p>');
          $('#result').append('<button id="finish">Finish</button>');
        });
      
        $('#result').on('click', '#finish', function(){
          window.location.replace("https://andyrojasc.github.io/EnglishProject/")
        });
      

    
    


    //call function

    startGame();

});