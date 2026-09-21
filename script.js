/* =====================================================
   BIRTHDAY WEBSITE
   GOOGLE APPS SCRIPT URL
   =====================================================

   NANTI GANTI BAGIAN INI DENGAN URL GOOGLE APPS SCRIPT
*/

const GOOGLE_SCRIPT_URL =
  "PASTE_URL_GOOGLE_APPS_SCRIPT_DI_SINI";


/* =====================================================
   SYSTEM
   ===================================================== */

let currentScene = 1;
const totalScenes = 18;

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

let musicStarted = false;


/* =====================================================
   OPEN WEBSITE + MUSIC
   ===================================================== */

function startExperience() {

  if (!musicStarted) {

    music.volume = 0.4;

    music.play()
      .then(() => {
        musicStarted = true;
        musicButton.textContent = "🎵";
      })
      .catch(() => {
        musicStarted = false;
      });

  }

  nextScene();
}


/* =====================================================
   MUSIC
   ===================================================== */

function toggleMusic() {

  if (music.paused) {

    music.play()
      .then(() => {
        musicButton.textContent = "🎵";
      })
      .catch(() => {});

  } else {

    music.pause();
    musicButton.textContent = "🔇";

  }

}


/* =====================================================
   SCENE NAVIGATION
   ===================================================== */

function showScene(number) {

  document.querySelectorAll(".scene").forEach(scene => {
    scene.classList.remove("active");
  });

  const target = document.getElementById("scene" + number);

  if (target) {
    target.classList.add("active");
    currentScene = number;

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

}


function nextScene() {

  if (currentScene < totalScenes) {
    showScene(currentScene + 1);
  }

}


/* =====================================================
   SEND ANSWER TO GOOGLE SHEETS
   ===================================================== */

function sendAnswer(type, question, answer) {

  if (
    !GOOGLE_SCRIPT_URL ||
    GOOGLE_SCRIPT_URL.includes("PASTE_URL")
  ) {

    console.log(
      "Google Apps Script belum terhubung.",
      {
        type,
        question,
        answer
      }
    );

    return;

  }


  const form = document.createElement("form");

  form.method = "POST";
  form.action = GOOGLE_SCRIPT_URL;
  form.target = "submitFrame";

  form.style.display = "none";


  const fields = {

    type: type,

    question: question,

    answer: answer,

    time: new Date().toLocaleString("id-ID")

  };


  Object.keys(fields).forEach(key => {

    const input = document.createElement("input");

    input.type = "hidden";

    input.name = key;

    input.value = fields[key];

    form.appendChild(input);

  });


  document.body.appendChild(form);

  form.submit();

  setTimeout(() => {
    form.remove();
  }, 1000);

}


/* =====================================================
   FOTO
   ===================================================== */

function photoChoice(number) {

  const response =
    document.getElementById("photoResponse");

  response.innerHTML = `
    Foto ${number} memang salah satu yang Mas suka. ❤️
    <br><br>
    Tapi ternyata ada satu foto yang jauh lebih Mas tunggu.
    <br><br>
    <strong>Foto kita yang belum kita ambil. ❤️</strong>
  `;

  sendAnswer(
    "quiz",
    "Foto kita yang paling kamu suka",
    "Foto " + number
  );

  document
    .getElementById("photoNext")
    .classList.remove("hidden");

}


/* =====================================================
   LOVE
   ===================================================== */

function loveChoice(choice) {

  const response =
    document.getElementById("loveResponse");


  let message = "";


  if (choice === "10%") {

    message = "Hehe... masih jauh banget. 😌";

  }

  else if (choice === "50%") {

    message = "Belum sampai setengahnya.";

  }

  else if (choice === "100%") {

    message =
      "Sudah mendekati, tapi ternyata masih kurang.";

  }

  else if (choice === "∞%") {

    message =
      "Nah, ini baru mendekati jawabannya. ❤️";

  }


  response.innerHTML = message;


  sendAnswer(
    "quiz",
    "Menurut kamu, seberapa besar Mas sayang sama kamu?",
    choice
  );


  setTimeout(() => {

    response.innerHTML += `
      <br><br>
      Kalau cinta Mas bisa dihitung,
      berarti suatu hari cinta itu bisa habis.
      Mas nggak mau cinta Mas punya batas.
    `;

    document
      .getElementById("loveNext")
      .classList.remove("hidden");

  }, 900);

}


/* =====================================================
   SURPRISE
   ===================================================== */

function surpriseChoice(choice) {

  const response =
    document.getElementById("surpriseResponse");

  let message = "";


  if (choice === "peluk") {

    message =
      "Mas tahu kamu bakal pilih ini. ❤️";

  }

  else if (choice === "marah") {

    message =
      "Marahnya nanti aja. Sekarang peluk dulu.";

  }

  else if (choice === "nangis") {

    message =
      "Jangan nangis... nanti Mas ikut.";

  }

  else if (choice === "senyum") {

    message =
      "Mas sudah bisa membayangkan senyum kamu.";

  }


  response.textContent = message;


  sendAnswer(
    "quiz",
    "Kalau Mas tiba-tiba muncul di depan kamu, apa yang pertama kali kamu lakukan?",
    choice
  );


  document
    .getElementById("surpriseNext")
    .classList.remove("hidden");

}


/* =====================================================
   WHO LOVES MORE
   ===================================================== */

function whoChoice(choice) {

  const response =
    document.getElementById("whoResponse");


  response.innerHTML = `
    Mas nggak mau menghitung siapa yang lebih sayang.
    <br><br>
    Mas cuma ingin kita sama-sama terus memilih satu sama lain.
  `;


  sendAnswer(
    "quiz",
    "Menurut kamu, siapa yang lebih sayang?",
    choice
  );


  document
    .getElementById("whoNext")
    .classList.remove("hidden");

}


/* =====================================================
   PLACE
   ===================================================== */

function placeChoice(choice) {

  const response =
    document.getElementById("placeResponse");

  let message = "";


  if (choice === "Pantai") {

    message =
      "Oke. Berarti Mas harus cari sunset yang bagus buat kita.";

  }

  else if (choice === "Gunung") {

    message =
      "Siap. Tapi kalau capek jangan salahkan Mas ya. 😂";

  }

  else if (choice === "Jalan-jalan") {

    message =
      "Ke mana pun boleh, yang penting Mas sama kamu.";

  }

  else if (choice === "Rumah") {

    message =
      "Hmm... sepertinya kamu memang cuma butuh Mas. 😌❤️";

  }


  response.textContent = message;


  sendAnswer(
    "quiz",
    "Kalau Mas ngajak kamu pergi sekarang, kamu pilih apa?",
    choice
  );


  document
    .getElementById("placeNext")
    .classList.remove("hidden");

}


/* =====================================================
   MAKE A WISH
   ===================================================== */

function makeWish() {

  const scene =
    document.getElementById("scene9");

  const result =
    document.getElementById("wishResult");


  scene.classList.add("candle-off");


  result.innerHTML = `
    Semoga terkabul. ❤️
    <br><br>
    Mas mungkin nggak bisa mewujudkan semua harapan kamu.
    Tapi Mas akan selalu mendoakan yang terbaik untuk kamu.
  `;


  createConfetti();


  setTimeout(() => {

    const button = document.querySelector(".wish-button");

    if (button) {
      button.disabled = true;
      button.style.opacity = "0.5";
    }

  }, 100);


}


/* =====================================================
   CONFETTI
   ===================================================== */

function createConfetti() {

  const symbols = [
    "♥",
    "✦",
    "•",
    "✧",
    "♡"
  ];


  for (let i = 0; i < 80; i++) {

    const piece =
      document.createElement("div");

    piece.className = "confetti";

    piece.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];


    piece.style.left =
      Math.random() * 100 + "vw";


    piece.style.fontSize =
      (8 + Math.random() * 12) + "px";


    piece.style.animationDelay =
      Math.random() * 1.5 + "s";


    document.body.appendChild(piece);


    setTimeout(() => {
      piece.remove();
    }, 5000);

  }

}


/* =====================================================
   WISH TEXT
   ===================================================== */

function submitWish() {

  const input =
    document.getElementById("wishText");

  const result =
    document.getElementById("wishSubmitResult");

  const wish =
    input.value.trim();


  if (!wish) {

    result.textContent =
      "Tulis dulu harapan kamu ya. ❤️";

    return;

  }


  sendAnswer(
    "wish",
    "Harapan kamu untuk umur yang baru",
    wish
  );


  result.innerHTML = `
    Terima kasih sudah menuliskannya.
    <br><br>
    Beberapa harapan memang cukup kamu dan Tuhan yang tahu.
    <br><br>
    Semoga suatu hari nanti kamu bisa membaca tulisan ini lagi
    dan berkata...
    <br><br>
    <strong>
      "Ternyata harapan aku waktu itu menjadi nyata."
    </strong>
  `;


  input.disabled = true;


  document
    .getElementById("wishNext")
    .classList.remove("hidden");

}


/* =====================================================
   FOUR QUESTIONS
   ===================================================== */

function submitAnswers() {

  const answers = [

    {
      id: "answer1",
      question: "Hal apa yang paling kamu suka dari Mas?"
    },

    {
      id: "answer2",
      question: "Menurut kamu, apa yang membuat kita masih bertahan sampai sekarang?"
    },

    {
      id: "answer3",
      question: "Kalau suatu hari jarak ini sudah nggak ada, hal pertama yang ingin kamu lakukan bersama Mas apa?"
    },

    {
      id: "answer4",
      question: "Kalau kamu bisa mengatakan satu hal kepada Mas sekarang, apa yang ingin kamu bilang?"
    }

  ];


  let valid = true;


  answers.forEach(item => {

    const value =
      document.getElementById(item.id).value.trim();

    if (!value) {
      valid = false;
    }

  });


  const result =
    document.getElementById("answersResult");


  if (!valid) {

    result.textContent =
      "Mas ingin membaca semuanya. Jawab semuanya dulu ya. ❤️";

    return;

  }


  answers.forEach(item => {

    const value =
      document.getElementById(item.id).value.trim();


    sendAnswer(
      "answer",
      item.question,
      value
    );

  });


  result.innerHTML = `
    Mas sudah menyimpan jawaban kamu. ❤️
    <br><br>
    Terima kasih sudah menjawab dengan jujur.
  `;


  answers.forEach(item => {

    document.getElementById(item.id).disabled = true;

  });


  document
    .getElementById("answersNext")
    .classList.remove("hidden");

}


/* =====================================================
   MEET
   ===================================================== */

function meetChoice(choice) {

  const response =
    document.getElementById("meetResponse");


  response.innerHTML = `
    Apa pun yang kita lakukan nanti...
    <br><br>
    <strong>
      Mas cuma ingin hari itu benar-benar terjadi.
    </strong>
  `;


  sendAnswer(
    "quiz",
    "Kalau suatu hari nanti Mas tiba-tiba berdiri di depan kamu, apa yang ingin dilakukan?",
    choice
  );


  document
    .getElementById("meetNext")
    .classList.remove("hidden");

}


/* =====================================================
   KNOW MAS
   ===================================================== */

let knowAnswers = {
  1: false,
  2: false
};


function knowChoice(questionNumber, choice) {

  knowAnswers[questionNumber] = true;


  sendAnswer(
    "quiz",
    questionNumber === 1
      ? "Kalau Mas lagi bingung, biasanya Mas lebih suka..."
      : "Kalau Mas lagi capek, yang paling Mas butuhkan biasanya...",
    choice
  );


  const response =
    document.getElementById("knowResponse");


  if (
    knowAnswers[1] &&
    knowAnswers[2]
  ) {

    response.innerHTML = `
      Ternyata masih ada beberapa hal tentang Mas
      yang harus kamu pelajari. ❤️
      <br><br>
      Berarti kita masih punya banyak waktu
      untuk saling mengenal.
    `;


    document
      .getElementById("knowNext")
      .classList.remove("hidden");

  }

}


/* =====================================================
   FINAL QUESTION
   ===================================================== */

let noClickCount = 0;


function finalNo() {

  noClickCount++;


  const button =
    document.getElementById("noButton");

  const response =
    document.getElementById("finalNoResponse");


  if (noClickCount === 1) {

    response.textContent =
      "Hmm... coba pikir lagi.";

  }

  else if (noClickCount === 2) {

    response.textContent =
      "Mas kasih kesempatan kedua.";

  }

  else if (noClickCount === 3) {

    response.textContent =
      "Kayaknya tombol ini memang nggak cocok buat kamu. 😌";

  }

  else {

    response.textContent =
      "Mas bercanda ❤️";

  }


  const x =
    Math.random() * 180 - 90;

  const y =
    Math.random() * 120 - 60;


  button.style.transform =
    `translate(${x}px, ${y}px)`;

}


function finalYes() {

  sendAnswer(
    "final",
    "Maukah kamu tetap berjalan bersama Mas?",
    "MAU ❤️"
  );


  showScene(18);


  createConfetti();

}
