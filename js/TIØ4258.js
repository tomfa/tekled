var i = -1;  // current questions
var numOfCorrectAnswers = 0; //
var answered = false;

var query = window.location.search.substring(1);

var questions = exams[query];
if (exams[query] === undefined) {
    questions = [];
    query = "h09-h12";
    questions = exams['h09'].concat(exams['v10']).concat(exams['k10']).concat(exams['h10']).concat(exams['v11']).concat(exams['k11']).concat(exams['h11']).concat(exams['v12']).concat(exams['k12']).concat(exams['h12']);
}
$('li.active').removeClass('active');
$('li.'+ query).addClass('active');
$('#examversion').html(query);
shuffle(questions);

// Shuffles array
function shuffle(o){ 
    for(var j, x, i = o.length; i > 0; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){};
        return o;
}

// 
function loadNextQuestion() {
    $('.btn-danger').removeClass('btn-danger');
    $('.btn-success').removeClass('btn-success');
    i += 1;
    answered = false;
    $('#explanation').html('');
    if (i+1 >= questions.length) {
        finished();
        return;
    }
    $('#question').html(questions[i].question);
    $('#0').html("a) " + questions[i].alternatives[0]);
    $('#1').html("b) " + questions[i].alternatives[1]);
    $('#2').html("c) " + questions[i].alternatives[2]);
    $('#3').html("d) " + questions[i].alternatives[3]);
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
        $('#explanation').html("Forklaring: " + questions[i].explaination);
        answered = true;
        if (alternativ == questions[i].solution)
            numOfCorrectAnswers += 1;
        else
            $('#' + alternativ).parent().addClass("btn-danger");
        $('#' + questions[i].solution).parent().addClass("btn-success");
        $('#points').html(numOfCorrectAnswers + " av " + (i+1) + " riktige.");
        $('#karakter').html("Karakter: " + calculateGrade(numOfCorrectAnswers, i+1));
        // update progressbar
        $('#examprogress').css({"width": (i+1)*100/questions.length + "%"});

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