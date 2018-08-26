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
    nextQuestion();
    return answerSubmitted = true;
})
 
var endGame = function() {
    $('.playScreen').hide();
    $('#correct').text(correct);
    $('#numOfQuestions').text(numOfQuestions)
    $('.endScreen').show();
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
              
            }
            else if (answerSubmitted === true) {
                time = timeAlloted;
                i++;
                answerSubmitted = false;
              
            }
            if (i === numOfQuestions - 1 ) {
                timerRunning = false;
                time = 0;
                clearInterval(countdown);
                endGame();
                return;
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

        // for (currentQuestionNumber; currentQuestionNumber < numOfQuestions; currentQuestionNumber++) {
        setupQuestion(currentQuestionNumber);

        // var answerTime = setInterval(function () {
        //     console.log(questionArray[currentQuestionNumber].question)
        //     setupQuestion(currentQuestionNumber);
        //     currentQuestionNumber++;
        //     if (currentQuestionNumber >= numOfQuestions) {
        //         clearInterval(answerTime);
        //     }
        //     currentQuestionNumber++;

        // }, 1000 * 30)
    }
});