$(document).ready(function() {
  var correct = 0;
  var incorrect = 0;
  var unanswered = 0;
  var secondsLeft = 30;
  var displayTimer = $(".timer");
  var start = $("<button>");
  var submit = $("<button>");

  var timer;
  var container = $(".quiz");
  var correct;
  var incorrect;

  function countDown() {
    if (secondsLeft === 0) {
      displayTimer.text("Time remaining: " + secondsLeft);
      checkAnswer();
      clearTimeout(timer);
    } else {
      displayTimer.text("Time remaining: " + secondsLeft);

      secondsLeft--;
    }
  }

  start.text("Start");
  start.attr("class", "button");
  $(".container").append(start);

  submit.text("Submit");
  submit.attr("class", "submit");

  var questions = [
    {
      question: "What house was Harry placed in?",
      choices: ["Slytherin", "Gryffindor", "Hufflepuff", "Ravenclaw"],
      answer: "Gryffindor"
    },
    {
      question: "Who killed Serius Black?",
      choices: ["Voldemort", "Snape", "Bellatrix", "He did not die"],
      answer: "Bellatrix"
    },
    {
      question: "Who is Harry Potter's love interest?",
      choices: [
        "Hermoine Granger",
        "Ginny Weasley",
        "Luna Lovegood",
        "Ron Weasley"
      ],
      answer: "Ginny Weasley"
    },
    {
      question: "What is the name of Harry's owl?",
      choices: ["Hedwig", "Dobby", "Scabbers", "Crookshanks"],
      answer: "Hedwig"
    },
    {
      question: "What was Harry's position in quiditch?",
      choices: ["Keeper", "Chaser", "Seeker", "Beaters"],
      answer: "Seeker"
    }
  ];

  function game() {
    for (var x = 0; x < questions.length; x++) {
      container.append("<h4>" + questions[x].question + "</h4>");

      for (var y = 0; y < questions[x].choices.length; y++) {
        container.append(
          "<input type='radio' name='question-" +
            x +
            "' value='" +
            questions[x].choices[y] +
            "''>" +
            questions[x].choices[y] +
            "<br></br>"
        );
      }
    }
    container.append(submit);

    submit.click(function() {
      checkAnswer();
    });
  }

  function checkAnswer() {
    var selected = container.children("input:checked");
    for (var i = 0; i < selected.length; i++) {
      if (questions[i].answer === $(selected[i]).val()) {
        correct++;
      } else {
        incorrect++;
      }
    }
    results();
  }
  function results() {
    container.html("<h1> Final Scoring </h1>");
    container.append("<h2> Correct " + correct + "</h2> <br></br>");
    container.append("<h2> Incorrect " + incorrect + "</h2>");
  }

  start.click(function() {
    timer = setInterval(countDown, 1000);
    start.hide();
    countDown();
    game();
    $("#my_audio")
      .get(0)
      .play();
  });
});
