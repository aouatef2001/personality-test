const questions = [
  {q: "Do you trust people easily?", a:[["Observe first, trust later","mach"],["Trust but stay alert","soc"],["Rarely feel anything","psy"],["Trust fully","none"]]},
  {q: "If someone offends you:", a:[["Plan a subtle comeback","mach"],["Snap immediately","soc"],["Feel nothing","psy"],["Forgive and move on","none"]]},
  {q: "If you know a secret:", a:[["Use it if needed","mach"],["Might tell impulsively","soc"],["Keep it always","psy"],["Ignore it","none"]]},
  {q: "You prefer:", a:[["Playing chess with people","mach"],["Fast thrill, dangerous situations","soc"],["Calm calculated risks","psy"],["Safe choices","none"]]},
  {q: "If a stranger cries:", a:[["Study for advantage","mach"],["Feel irritated","soc"],["Remain detached","psy"],["Try to help","none"]]},
  {q: "When someone lies:", a:[["Turn it around","mach"],["Explode","soc"],["Feel nothing","psy"],["Confront calmly","none"]]},
  {q: "At a party, you are:", a:[["Observing quietly","mach"],["Seeking attention","soc"],["Detached","psy"],["Friendly","none"]]},
  {q: "If you need someone to do your work:", a:[["Persuade carefully","mach"],["Pressure them","soc"],["Take it myself","psy"],["Do it honestly","none"]]},
  {q: "If betrayed, first thought:", a:[["Plan revenge","mach"],["React without thinking","soc"],["Ignore it","psy"],["Forgive","none"]]},
  {q: "Power means:", a:[["Influence/control","mach"],["Act freely/dominate","soc"],["Remain untouchable","psy"],["Respect/fairness","none"]]},
  {q: "Rules exist to:", a:[["Bend them","mach"],["Follow if convenient","soc"],["Don’t matter","psy"],["Keep safe","none"]]},
  {q: "How do you describe yourself?", a:[["Strategic/calculating","mach"],["Impulsive/emotional","soc"],["Calm/detached","psy"],["Kind/honest","none"]]}
];

let scores = { mach:0, psy:0, soc:0 };
let currentIndex = 0;
const quizDiv = document.getElementById("quiz");

function renderQuestion(){
  if(currentIndex >= questions.length){
    localStorage.setItem('darkTestScores', JSON.stringify(scores));
    window.location.href = "result.html";
    return;
  }
  const item = questions[currentIndex];
  let qBlock = `<div class="question"><p>${currentIndex+1}. ${item.q}</p>`;
  item.a.forEach(ans => {
    qBlock += `<button onclick="answer('${ans[1]}', this)">${ans[0]}</button>`;
  });
  qBlock += "</div>";
  quizDiv.innerHTML = qBlock;
  updateProgress();
}

function answer(type, btn){
  if(type!=="none") scores[type]++;
  btn.style.background="#ff4500";
  btn.style.color="#fff";
  const buttons = btn.parentElement.querySelectorAll("button");
  buttons.forEach(b => b.disabled=true);
  setTimeout(()=>{
    currentIndex++;
    renderQuestion();
  },300);
}

function updateProgress(){
  let percent = Math.round((currentIndex/questions.length)*100);
  document.getElementById("progress-bar").style.width = percent+"%";
}

renderQuestion();