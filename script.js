const quizData=[
    {
      question : 'what is the real name of shadow',
      options : ['claire kagano','cid kagano','Alpha','Delta'],
      answer : 'cid kagano',
    },
    {
      question : 'who had better iq in classroom of elite',
      options : ['Ayanokoji','Koenji','Sakayanagi','Ryuen'],
      answer : 'Ayanokoji',
    },
  ];
  const quizContainer = document.getElementById('quiz');
  const resultContainer=document.getElementById('result');
  const submitButton=document.getElementById('submit');
  const retryButton=document.getElementById('retry');
  const showAnswerButton=document.getElementById('showAnswer');
  let currentQuestion=0;
  let score=0;
  let incorrectAnswers=[];
  function displayQuestions(){
    const questionData=quizData[currentQuestion];
    const questionElement=document.createElement('div');
    questionElement.className='question';
    questionElement.innerHTML=questionData.question;
    const optionsElement=document.createElement('div');
    optionsElement.className='options';
    const shuffledOptions=[...questionData.options];
    for(let i=0;i<shuffledOptions.length;i++)
    {
      const option=document.createElement('label');
      option.className='option';
      const radio=document.createElement('input');
      radio.type='radio';
      radio.name='quiz';
      radio.value=shuffledOptions[i];
      const optionText=document.createTextNode(shuffledOptions[i]);
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
    quizContainer.innerHTML='';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  
    
  
  }
  function checkAnswer(){
    const selectOption=document.querySelector('input[name="quiz"]:checked');
    if(selectOption){
      const answer=selectOption.value;
      if(answer==quizData[currentQuestion].answer)
      {
        score++;
  
      }
      else {
        incorrectAnswers.push({
          question : quizData[currentQuestion].question,
          incorrectAnswer : answer,
          correctAnswer : quizData[currentQuestion].answer,
        });
  
      }
      currentQuestion++;
      selectOption.checked=false;
      if(currentQuestion<quizData.length)
      {
        displayQuestions();
      }
      else {
        displayResult();
      }
    }
  }
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  console.log(score)
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestions();
  }
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
if(incorrectAnswersHtml.length!=0){
    
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  else {
    resultContainer.innerHTML = `
      <p>NO wrong answer</p>
    `;
  }
}


    showAnswerButton.addEventListener('click', showAnswer);
    retryButton.addEventListener('click', retryQuiz);
    submitButton.addEventListener('click',checkAnswer);



 

console.log(score);
  
 
  displayQuestions();
  