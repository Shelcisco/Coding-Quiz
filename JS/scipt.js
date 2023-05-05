// Questions
let questions = [
    {
        numb: 1,
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheet",
        options: [
            "Coding Style Sheet",
            "Cascading Sheet Style",
            "Cascading Style Sheet",
            "Computing Style Sheet"
        ]
    },
    {
        numb: 2,
        question: "What does HTML stand for?",
        answer: "Hyper Text Markup Language",
        options: [
            "Hyper Text Magic Language",
            "Hyper Text Markup Language",
            "Handy Text Markup Language",
            "Hyper Text Maker Language"
        ]
    },
    {
        numb: 3,
        question: "Why do we use JavaScript?",
        answer: "To make web pages interactive",
        options: [
            "To Create the Structure of a Webpage",
            "To Make Better Coffee",
            "To make web pages interactive",
            "To make a page accessible"
        ]
    },
    {
        numb: 4,
        question: "What are Boolean Values?",
        answer: "True/False Values",
        options: [
            "True/False Values",
            "If/Else Values",
            "The Values of Boolean",
            "Javascript Values"
        ]
    },
    {
        numb: 5,
        question: "What are Arrays used for?",
        answer: "To store multiple values in a single variable",
        options: [
            "To make a page more aesthetically pleasing",
            "To store a single variable in multiple values",
            "To trigger the next event",
            "To store multiple values in a single variable"
        ]
    },
];

//Elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const score_btn = document.querySelector ("#score");
const in_input = document.querySelector ("#highscores")
const scoreHistory = [];


// startTimerLine function
let time = 75;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let widthValue = 0;
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if startQuiz button clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo");
    startTimer();
}
// if exitQuiz button clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
}
// if continueQuiz button clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
}

// // if SaveScore button clicked
// score_btn.onclick = () => {
//     result_box.classList.remove("activeResult");
//     high_score.classList.add("highscores")

// }


// if restartQuiz button clicked
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    time = 75;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    startTimer();
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
}
// if quitQuiz button clicked
quit_quiz.onclick = () => {
    window.location.reload();
}
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");




// if Next Question button clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        timeText.textContent = "Time Left";
        next_btn.classList.remove("show");
    } else {
        showResult();
    }
}
// getting questions and options from array
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//Function for option selction
function optionSelected(answer) {
    let userAns = answer.textContent;
    let correcAns = questions[que_count].answer;
    const allOptions = option_list.children.length;

    if (userAns == correcAns) {
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect");
        time -= 10
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        console.log("Wrong Answer");
        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");
}
//Function for results
function showResult() {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3) {
        let scoreTag = '<span> Congrats! You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 1) {
        let scoreTag = '<span>You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = '<span>You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}
//Timer Functions
function startTimer() {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter)
            showResult()
            timeText.textContent = "Time Off";
            const allOptions = option_list.children.length;
            let correcAns = questions[que_count].answer;
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.classList.add("show");
        }
    }
}
//Function for Question/Score Counter 
function queCounter(index) {
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}

// //Save Score/Initial

// score_btn.on ("click", function (event) {
//     event.preventDefault();
  
//     if (que_count.val() == 0 || in_input.val() == 0) {
//       return false;
// }
  
//     const searchValue = que_count.val();
//     console.log(searchValue);
//     console.log(in_input.val());

// // Saves the search history of cities to an array
// function history (in_input, searchValue) {
//     if (locationInputEl && searchValue) {
//       if (scoreHistory.indexOf(in_input + " " + searchValue) === -1) {
//         scoreHistory.push(in_input + " " + searchValue);
//         listArray();
//       }
//     }
//   }
  
// //   // Lists array of search history
// function listArray() {
//  searchHistoryListEl.empty();
// searchHistory.forEach(function (findings) {
// const searchHistoryItem = $('<p class="list-group-item">');
//  searchHistoryItem.attr("data-value", findings);
// searchHistoryItem.text(findings);
// searchHistoryListEl.prepend(searchHistoryItem);
// });
// localStorage.setItem("searches", JSON.stringify(searchHistory));
//   }

