var triviaQuestions = [{
    question: "What is the only U.S. state that only borders one other?",
    answerList: ["Rhode Island", "Maine", "Washington", "Florida"],
    notes: "This state shares a border only with New Hampshire (and Canada). Maine also has another distinction as well—it’s the only state with a one-syllable name",
    answer: 1
},{
	question: "Name the number that is three more than one-fifth of one-tenth of one-half of 5,000.",
	answerList: ["503", "103", "53", "108"],
	notes: "Work backward! Half of 5,000 is 2,500. One-tenth of that is 250. One-fifth of that is 50. Add three, and you’ve got your answer.",
	answer: 2
	
},{
	question: "What’s the missing number? 1,1,2,3,5,8,13,_,34",
	answerList: ["20", "21", "25", "17"],
	notes: "Each number is the previous two numbers added together. The eighth number is the sixth and seventh numbers—8 and 13—added together",
	answer: 1
},{
	question: "What is the oldest inhabited city in the world?",
	answerList: ["Istanbul,Turkey", "Athens,Greece", "Jerusalem", "Damascus,Syria"],
	notes: "Evidence of civilization in Damascus dates all the way back to 9000 BC",
    answer: 3
    
},{
	question: "Find the distance: Two people are standing back to back. They each walk away from each other for three feet. Then they both turn left and walk for another four feet, and then stop. Now, how many feet apart are they standing?",
	answerList: ["10", "7", "25", "5"],
	notes: "If you remember the a2 + b2 = c2 rule from math class, that’s what’ll help you solve this problem.",
	answer: 0
},{
	question: "What is the only U.S. state with a Spanish motto?",
	answerList: ["Idaho", "California", "Montana", "Arizona"],
	notes: "Montana’s motto is Oro y plata, which means Gold and silver.",
	answer: 2
},{
	question: "The United States animal is a bald eagle… but in this context, “bald” doesn’t mean “hairless.” The “bald” part of the bird’s name comes from an Old English word meaning what?",
	answerList: ["Beautiful", "Swooping", "Majestic", "White"],
	notes: "These majestic birds were named for their white feathers… not for their round, smooth heads that kind of make them look bald.",
    answer: 3
    
},{
	question: "James’s mom has four children. Their names are April, May, June, and ______?",
	answerList: ["July", "March", "Annie", "James"],
	notes: "Don’t let the sequential month names fool you. It’s James’s mother, so James has to be one of the four children. Did we get you with this one?!",
    answer: 3
    
},{
	question: "Think of a word with six letters.  If you take away one you are left with twelve",
	answerList: ["Hexagon", "Twelve", "Dozens", "Bakers"],
	notes: "“Dozens” is a six-letter word. Take away the “s,” and you have “dozen,” another word for “twelve.” (We never said it was twelve letters!)",
	answer: 3

}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect; 
var notes = triviaQuestions.notes; 

var messages = {
	correct: "You got it!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
};

$(".container").animate({
	scrollTop: $('.container')[0].scrollHeight - $('.container')[0].clientHeight
  }, 1000);
  
$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
    unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//new questions with answer choices
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//pause time when clickig answers
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 20;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//reduces time
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	var rightAnswerNote = triviaQuestions[currentQuestion].notes;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to type of answer
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct + " " + rightAnswerNote);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText + " " + rightAnswerNote);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText + " " + rightAnswerNote);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}