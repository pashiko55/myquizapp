'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: '世界で一番大きな湖は?', c: ['カスピ海','カリブ海','琵琶湖']},
    {q: '2の8乗は?', c: ['256','64','1024']},
    {q: '次のうち、最初にリリースされた言語は?', c: ['Python','JavaScript','HTML']},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    
    for(let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] =[arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if(isAnswered){
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]){
      li.classList.add('correct');  //addメソッド 指定した文字列などをclassに対して追加するメソッド。　JavaScriptでHTMLのタグを取得すると[classList]がプロパティとして入っている。　classListは、HTMLのClassの変更や削除などの操作をするメソッドを持っており、その中の要素に対して追加を行うメソッドがadd。
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled'); //remove関数 指定したList型の要素を１つだけ削除する・
  }

  function setQuiz() {
    isAnswered = false;
    question.textContent = quizSet[currentNum].q; //textContent ノード及びその子孫のテキスト情報を取得・設定

    while(choices.firstChild){
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => { //forEach 配列に格納されたデータを一気に繰り返し処理したいときに使う
      const li = document.createElement('li'); //createElement HTML要素を動的に生成するために使用 
      li.textContent = choice;
      li.addEventListener('click', () => { //addEventListener イベントに合わせて実行させる関数を登録するためのメソッド。
        checkAnswer(li);
      });
      choices.appendChild(li); //特定の親ノードの子ノードの最後に追加が可能。なお追加しようとしたノードがすでに存在していた場合、既存のノードが新しいノードに置き換わる。ノードとは集合体を意味する。
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click', () =>{
    if (btn.classList.contains('disabled')){
      return;
    }    
    btn.classList.add('disabled');

    if(currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}