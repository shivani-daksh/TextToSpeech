// let speech = new SpeechSynthesisUtterance();


// let voices = [];

// let voiceSelect = document.querySelector("select");
// window.speechSynthesis.onvoiceschanged = () => {
//   voices = window.speechSynthesis.getVoices();
//   speech.voice = voices[0];

//   voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
// };

// voiceSelect.addEventListener("change", () =>{
//   speech.voice = voices[voiceSelect.value];
// }  );

// document.querySelector("button").addEventListener("click" , () =>{

//     speech.text = document.querySelector("textarea").value;
//     window.speechSynthesis.speak(speech);

//   });

let speech = new SpeechSynthesisUtterance();
let voices = [];
let isPaused = false; // Flag to check if speech is paused
let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];

  voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
  if (window.speechSynthesis.speaking && !isPaused) {
    // If already speaking, pause it
    window.speechSynthesis.pause();
    isPaused = true;
    document.querySelector("button").innerText = "Resume Speech";
  } else if (isPaused) {
    // If paused, resume it
    window.speechSynthesis.resume();
    isPaused = false;
    document.querySelector("button").innerText = "Pause Speech";
  } else {
    // If not speaking, start speech
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
    isPaused = false;
    document.querySelector("button").innerText = "Pause Speech";
  }
});

// Reset button text when speech ends
speech.onend = () => {
  document.querySelector("button").innerText = "Start Speech";
};
