var done = false;
var timerRunning = false;
var currentQuestionNumber = 0;
var answerSubmitted = false;
var numOfQuestions = 5;
var time = 30;
var gameStarted = false;
var question1 = new Question('In what organ of the human body would you find the cochlea?', 'eye', 'nose', 'heart', 'ear', 3);
var question2 = new Question('Something that is described as "vespine" resembles what type of insect?', 'dragonfly', 'wasp', 'beatle', 'centipede', 1)
var question3 = new Question('What "-itis" is an inflammation of the liver?', 'colitis', 'gastroenteritis', 'hepatitis', 'encephalitis', 2);
var question4 = new Question('On average, a dragonfly eats how many mosquitoes per day?', '100', '300', '150', '50', 1);
var question5 = new Question('"Coulrophobia" is the fear of what?', 'swimming pools', 'bears', 'rainbows', 'clowns', 3);
var questionArray = [question1, question2, question3, question4, question5];
var currentQuestion = questionArray[currentQuestionNumber];
var correct = 0;
var incorrect = 0;

// Constructors are a thing ... 

function Question(question, answer1, answer2, answer3, answer4, correctAnswerIndex) {
    this.question = question;
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.answer3 = answer3;
    this.answer4 = answer4;
    this.correctAnswerIndex = correctAnswerIndex;
    this.answerArray = [answer1, answer2, answer3, answer4]
}



var nextQuestion = function () {
    currentQuestionNumber++
    setupQuestion(currentQuestionNumber);
}


var setupQuestion = function (questionArrayNumber) {
    currentQuestion = questionArray[questionArrayNumber];
    $('#question').text(currentQuestion.question);
    $('#choiceOne').text(currentQuestion.answer1);
    $('#choiceTwo').text(currentQuestion.answer2);
    $('#choiceThree').text(currentQuestion.answer3);
    $('#choiceFour').text(currentQuestion.answer4);
    answerSubmitted = false;
}

$('.answerChoice').click(function () {
    $(this).addClass('userChoice border');
    $(this).siblings().removeClass('userChoice border');
    $('#submitButton').show();
})


$('#submitButton').click(function () {
    $(this).hide()
    answer = $('.userChoice').text();
    console.log(answer);

    if (currentQuestion.answerArray.indexOf(answer) === currentQuestion.correctAnswerIndex) {
        console.log("correct")
        correct++;
    } else {
        incorrect++;
    }
    if (currentQuestionNumber === numOfQuestions - 1) {
        return answerSubmitted = true;
    } else {
        nextQuestion();
        return answerSubmitted = true;

    }
})

var endGame = function () {
    $('.playScreen').hide();
    $('#correct').text(correct);
    $('#numOfQuestions').text(numOfQuestions)
    $('.endScreen').show();
    ending();
}

var timer = function (timeAlloted, numOfQuestions) {
    gameStarted = true;
    // Prevents multiple iterations of timer at same time
    if (timerRunning == true) {
        return;
    }
    //
    else {
        timerRunning = true;
        var time = timeAlloted;
        var i = 0;
        var countdown = setInterval(function () {
            time--;
            $('#timer').text(time);
            if (time == 0 && i < numOfQuestions) {
                time = timeAlloted;
                done = true;
                i++;

            } else if ((i === numOfQuestions - 1 && answerSubmitted === true) || (i === numOfQuestions - 1 && time === 0)) {
                timerRunning = false;
                time = 0;
                clearInterval(countdown);
                endGame();
                return;
            } else if (answerSubmitted === true) {
                time = timeAlloted;
                i++;
                answerSubmitted = false;

            }



        }, 1000)

    }
    return;
}


$('#startButton').click(function () {
    $(this).hide();
    timer(30, 5);
    currentQuestionNumber = 0;

    if (gameStarted === true) {
        setupQuestion(currentQuestionNumber);
    }
});

$('#restartButton').click(function () {
    done = false;
    timerRunning = false;
    currentQuestionNumber = 0;
    answerSubmitted = false;
    numOfQuestions = 5;
    time = 30;
    gameStarted = false;
    questionArray = [question1, question2, question3, question4, question5];
    currentQuestion = questionArray[currentQuestionNumber];
    correct = 0;
    incorrect = 0;

    $('.endScreen').hide();
    $('.playScreen').show();
    timer(30, 5);
    currentQuestionNumber = 0;

    if (gameStarted === true) {
        setupQuestion(currentQuestionNumber);
    }
})



// That was easy...
//alt for testing 
// I'm using es6 because it's better
// $('#startButton').click(() => {

var endGame = () => {
    $('.playScreen').hide();
    $('#correct').text(correct);
    $('#numOfQuestions').text(numOfQuestions)
    $('.endScreen').show();
    ending();
}

var ending = () => {
    $('.itsasecret').html('<button class="btn btn-dark btn-sm">Hey....</button>')
    var message = setTimeout(() => {
        $('.itsasecret').html('<button class="btn btn-dark btn-sm">Hey... click me</button>')
    }, 3000);
    message = setTimeout(() => {
        $('.itsasecret').html('<button class="btn btn-dark btn-sm">Hey... right here</button>')
    }, 7000);
}
var ahhh = ['A', 'H', 'H'];
var ahhhh = ['A', 'H', 'H', 'H'];
var ahhhhh = ['A', 'H', 'H', 'H', 'H']

var stop = () => {
    $('.endScreen').hide();
    $('.jumbotron').html('<h1 class="display-4">Stop.</h1>');
    message = setTimeout(() => {
        $('.display-4').text("Let's play the real game....")
    }, 3000)
    $('#realStartButton').text("super awesome actual start button").addClass('float-right').delay(5000).slideDown(500);
}

$('.itsasecret').click(() => {
    $('.itsasecret').text('Ah')
    message = setTimeout(() => {
        $('.itsasecret').text('AHH')
    }, 2000)
    message = setTimeout(() => {
        var ahhhIterator = setInterval(() => {
            ahhh.push('H')
            $('.itsasecret').text(ahhh.join(''))
            if (ahhh.length >= 150) {
                clearInterval(ahhhIterator);
                $('.display-4').text(ahhhh)
                var ahhhhIterator = setInterval(() => {
                    ahhhh.push('H')
                    $('.display-4').text(ahhhh.join(''))
                    if (ahhhh.length >= 50) {
                        clearInterval(ahhhhIterator);
                        $('#restartButton').text(ahhhhh)
                        var ahhhhhIterator = setInterval(() => {
                            ahhhhh.push('H')
                            $('#restartButton').text(ahhhhh.join(''))
                            if (ahhhhh.length >= 150) {
                                clearInterval(ahhhhhIterator);
                                stop();
                                return;
                            }
                        }, 25)
                    }
                }, 35)
            }
        }, 50)

    }, 5000)

})

var startGame = () => {
    $('canvas').show();
    $('.container').hide();
    theGame();
}


// skip for debugging
// endGame();


// Slow Version/////////////

// ending();

/////////////////////////////

// fast version/////////

// var stopFast = () => {
//     $('.endScreen').hide();
//     $('.jumbotron').html('<h1 class="display-4">Stop.</h1>');
//     message = setTimeout(() => {
//         $('.display-4').text("Let's play the real game....")
//     }, 10)
//     $('#realStartButton').text("super awesome actual start button").addClass('float-right').slideDown(500);
// }

// stopFast();

/////////////////////


$('#realStartButton').click(() => {
    startGame();
})

var playingField = document.getElementById('playingField');
var ctx = playingField.getContext('2d');

var resetPlayingField = () => {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';

    ctx.fillRect(0, 0, playingField.width, playingField.height);
    ctx.strokeRect(0, 0, playingField.width, playingField.height);
}

var snake = [{
        x: 250,
        y: 250
    },
    {
        x: 240,
        y: 250
    },
    {
        x: 230,
        y: 250
    },
    {
        x: 220,
        y: 250
    },
    {
        x: 210,
        y: 250
    },
]

var drawSnakeBits = function (snakeBit) {
    ctx.fillStyle = 'grey';
    ctx.strokeStyle = 'black';

    ctx.fillRect(snakeBit.x, snakeBit.y, 10, 10);
    ctx.strokeRect(snakeBit.x, snakeBit.y, 10, 10);
}

var drawSnake = () => {
    snake.forEach(drawSnakeBits)
}

var speedX = 10;
var speedY = 0;
var score = 0;


var moveSnake = () => {
    var snakeHead = {
        x: snake[0].x + speedX,
        y: snake[0].y + speedY
    }
    snake.unshift(snakeHead);
    if (snake[0].x === foodX && snake[0].y === foodY) {
        score++;
        makeFood()
    } else {
        snake.pop();
    }

}

var generateRandomCords = (max, min) => {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;

}

var foodX;
var foodY;

var makeFood = () => {

    foodX = generateRandomCords(490, 0);
    foodY = generateRandomCords(490, 0);


    snake.forEach(
        (snakeBit) => {
            if (snakeBit.x === foodX && snakeBit.y === foodY) {
                makeFood();
            }
        }
    )

    console.log(foodX + ' ' + foodY)

}

var placeFood = () => {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'black';
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);

}

var butDidYouDieThough = () => {
    if (snake[0].x < 0 || snake[0].x > 490 || snake[0].y < 0 || snake[0].y > 490) {
        console.log('topBork')
        return true;

    }
    // shoutout to freeCodeCamp for explaining why the index starts at 4. logic or whatever. 
    for (var i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            console.log('bottomBork');
            return true;
        }
    }
}

drawSnake();
makeFood();

var paused = false;


document.onkeydown = function (event) {
    if (event.key === 'ArrowRight' && speedX === 0) {
        speedX = 10;
        speedY = 0;
    }
    if (event.key === 'ArrowLeft' && speedX === 0) {
        speedX = -10;
        speedY = 0;
    }
    if (event.key === 'ArrowUp' && speedY === 0) {
        speedY = -10;
        speedX = 0;
    }
    if (event.key === 'ArrowDown' && speedY === 0) {
        speedY = 10;
        speedX = 0;
    }

    // debugging feature 
    if (event.key === 'p') {
        speedY = 0;
        speedX = 0;
    }
    //

}

var resetButtonButForTheSnakeThing = () => {
    $('.gameOverScreen').hide()
    $('canvas').show();
    score = 0;
    snake = [{
            x: 250,
            y: 250
        },
        {
            x: 240,
            y: 250
        },
        {
            x: 230,
            y: 250
        },
        {
            x: 220,
            y: 250
        },
        {
            x: 210,
            y: 250
        },
    ]

    drawSnake();
    makeFood();
    theGame();
}

var theGame = () => {



    var gameRunning = setInterval(function () {
        resetPlayingField();
        moveSnake();
        drawSnake();
        placeFood();
        if (butDidYouDieThough()) {
            console.log('borked');
            clearInterval(gameRunning);
            $('canvas').hide();
            $('.gameOverScreen').show();
            $('#score').text("Score: " + score);
            
        }
    }, 50);
}

$('#reRestart').click(() => {
    resetButtonButForTheSnakeThing()}
);