var questionNum = -1;
var numOfCorrectAnswers = 0;
var answered = false;

var query = decodeURIComponent(window.location.search.substring(1));
populateNavbar(exams);
var questions = exams[query];
if (exams[query] === undefined) {
    query = "all";
    questions = getAllQuestions(exams);
}
var jquerySelector = "." + query.split(" ").join(".")

$('li.active').removeClass('active');
$('li' + jquerySelector).addClass('active');
$('#examversion').html(query);
shuffle(questions);

function populateNavbar(exams) {
    for (var key in exams) {
        $(".examchooser-header").after('<li class="'+key+'"><a href="?' + key + '">' + key + '</a></li>');
    }
    $(".examchooser-header").after('<li class="all"><a href="?">Alle</a></li>');
}

function shuffle(o) {
    for(var j, x, i = o.length; i > 0; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){};
        return o;
}

function loadNextQuestion() {
    questionNum += 1;
    answered = false;
    clearQuestionLayout();
    if (questionNum+1 >= questions.length) {
        finished();
        return;
    }
    setHTMLdataFromQuestion(questions[questionNum]);
}

function clearQuestionLayout() {
    $('.btn-danger').removeClass('btn-danger');
    $('.btn-success').removeClass('btn-success');
    $('#explanation').html('');
}

function setHTMLdataFromQuestion(question) {
    $('#question').html(question.question);
    $('#0').html("a) " + question.alternatives[0]);
    $('#1').html("b) " + question.alternatives[1]);
    $('#2').html("c) " + question.alternatives[2]);
    $('#3').html("d) " + question.alternatives[3]);
}

function finished() {
    $('.hero-unit').html('<a href="" class="btn btn-primary btn-large">AGAIN!</a>');
    if (numOfCorrectAnswers/i < 0.4) {
        $('.hero-unit').prepend("<h2>PHAIL.</h2> <p>Du strøyk. Skjerpings!</p>");
        $('.btn-large').addClass('btn-danger');
    }
    else {
        $('.hero-unit').prepend("<h2>WIN.</h2> <p>Sånn. Du har stått, og kan nå lese de nyttige faga istedet.</p>");
        $('.btn-large').addClass('btn-success');
    }
    
}

function submitAnswer(alternativ) {
    if (answered)
        loadNextQuestion();
    else {
        $('#explanation').html("Forklaring: " + questions[questionNum].explaination);
        answered = true;
        if (alternativ == questions[questionNum].solution)
            numOfCorrectAnswers += 1;
        else
            $('#' + alternativ).parent().addClass("btn-danger");
        $('#' + questions[questionNum].solution).parent().addClass("btn-success");
        $('#points').html(numOfCorrectAnswers + " av " + (questionNum+1) + " riktige.");
        $('#karakter').html("Karakter: " + calculateGrade(numOfCorrectAnswers, questionNum+1));
        // update progressbar
        $('#examprogress').css({"width": (questionNum+1)*100/questions.length + "%"});

    }
}

function calculateGrade(correct, total) {
    var percent = 100*correct/total;
    if (percent >= 90)
        return "A";
    if (percent >= 80)
        return "B";
    if (percent >= 60)
        return "C";
    if (percent >= 50)
        return "D";
    if (percent >= 40)
        return "E";
    else
        return "F (" + percent.toFixed(1) + " %)";
}

function getAllQuestions(exam) {
    var questions = [];
    
    for (var key in exam)
        questions = questions.concat(exam[key]);

    return questions;
}

$(document).ready(function() {
    loadNextQuestion();

    $(".alt").hover(
        function () {
            $(this).addClass("hover");
        },
        function () {
            $(this).removeClass("hover");
        }
    );

 });