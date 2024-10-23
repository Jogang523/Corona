const quizData = [
    {
        question: "1. 코로나19 감염 예방을 위해 실내 환기는 (  )시간에 (  )분씩 해야해요!",
        choices: ["4, 10", "5, 10", "2, 30", "2, 10"],
        answer: 3, // 정답의 인덱스
        explanation : ["주기적인 환기로 코로나19를 비롯한 감염병을 예방할 수 있어요.",
                        " 10분 내외 환기 시 공기전파 감염 위험도가 감소해요.",
                        "하루 최소 3회, 매회 10분 이상 실내를 환기하도록 해요!"],
        image : "assets/images/1.png"
    },
    {
        question: "2. 코로나19 기침예절로 올바르지 않은 것은?",
        choices: ["호흡기증상(기침 등) 있을 시 마스크 착용", "기침할 때는 휴지와 옷 소매로 입과 코 가리기", "기침한 후에는 물로 손씻기", "사용한 휴지나 마스크는 바로 쓰레기통에 버리기"],
        answer: 2,
        explanation : ["코로나19 예방을 위해서는 손 위생을 철저히 하는 것이 기본이에요.", "기침한 후에는 반드시 흐르는 물에 비누를 사용하여 손을 30초 이상", "닦아주어야 해요!"],
        image : "assets/images/2.png"    
    },
    {
        question: "3. 코로나 19 발열 및 호흡기 증상 발생시 가장 먼저 실시해야 할 대처 방안으로 올바른 것은?",
        choices: ["스스로 또는 전문가의 도움을 받아 신속항원검사를 실시한다.", "증상이 가벼우면 코로나19가 아닐 수 있으므로, 일상생활을 지속한다.", "주변사람이 병원에 가보라고 할 때까지 가만히 있는다.", "공부가 제일 중요하므로, 학교에 출석한다."],
        answer: 0,
        explanation : ["코로나19 증상 발현시 유증상자 행동수칙을 준수해야 합니다.", "신속하게 코로나 19임을 확인한 뒤, 자가격리와 증상에 따라", "의료기관에서 적절한 진료를 받는 것이 올바른 순서입니다."],
        image : "assets/images/3.png" 
    },
    {
        question: "4. 코로나19 자가격리 생활 수칙으로 올바르지 않은 것은?",
        choices: ["독립된 공간에서 혼자 생활한다.", "감염과 전파 방지를 위해 바깥 외출을 자제한다.", "가끔은 가족 또는 동거인과 대화한다.", "개인물품만을 사용하여 생활한다."],
        answer: 2,
        explanation : ["자가격리자는 가족 및 동거인과의 접촉을 최대한 제한하는 것이 좋아요.", "코로나 바이러스는 대화 과정에서 비말 분비로 감염될 수 있으므로", "대화를 비롯한 전반적인 접촉을 피해야 해요.", "만약 불가피하다면 얼굴을 맞대지 않고 마스크를 쓴 채 서로 2m이상 거리를 두어야합니다."],
        image : "assets/images/4.png"
    },

];


let currentQuiz = 0;
let score = 0;

function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];
    
    document.querySelector('.quiz__title').innerText = ``;
    document.querySelector('.quiz__question').innerText = currentQuizData.question;
    document.getElementById('quiz-image').src = currentQuizData.image;  // 이미지 동적 로드

    const choiceContainer = document.querySelector('.quiz__choice');
    choiceContainer.innerHTML = '';
    
    document.querySelector('.quiz__desc').innerHTML = '';
    
    currentQuizData.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.innerText = choice;
        button.classList.add('choice');
        button.addEventListener('click', () => checkAnswer(index));
        choiceContainer.appendChild(button);
    });
}


function showExplanation() {
    const currentQuizData = quizData[currentQuiz];
    const explanationContainer = document.querySelector('.quiz__desc');
    
    // 이전 해설 내용을 지우기
    explanationContainer.innerHTML = '';
    
    // 배열로 된 설명을 각각의 줄로 추가
    currentQuizData.explanation.forEach((line) => {
        const p = document.createElement('p');
        p.innerText = line;
        explanationContainer.appendChild(p);
    });
    
    explanationContainer.style.display = 'block';
    
    // '다음 문제' 버튼을 '다음 해설 보기' 버튼으로 전환
    document.querySelector('.next').innerText = '다음 문제';
}


function checkAnswer(selectedIndex) {
    const currentQuizData = quizData[currentQuiz];
    const resultMessage = document.querySelector('.quiz__view');
    
    if (selectedIndex === currentQuizData.answer) {
        resultMessage.querySelector('.true').style.display = 'block';
        resultMessage.querySelector('.false').style.display = 'none';
        score++;
    } else {
        resultMessage.querySelector('.true').style.display = 'none';
        resultMessage.querySelector('.false').style.display = 'block';
    }
    
    document.querySelector('.quiz__info b').innerText = `${score}점`;
    
    // 해설 표시 함수 호출
    showExplanation();
    
    // 다음 문제로 넘어가는 버튼을 활성화
    document.querySelector('.next').style.display = 'block';
}

document.querySelector('.next').addEventListener('click', () => {
    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz();
        document.querySelector('.quiz__view .true').style.display = 'none';
        document.querySelector('.quiz__view .false').style.display = 'none';
        document.querySelector('.next').style.display = 'none';
    } else {
        document.querySelector('.quiz__wrap').innerHTML = `<h2>퀴즈 완료! 총 점수: ${score}/${quizData.length}</h2>`;
    }
});

window.addEventListener('DOMContentLoaded', () => {
    loadQuiz();
});