const micBtn = document.getElementById('microphone')
const panelsData = document.getElementById('panels-data')
const transcript = document.getElementById('transcript')
const screen = document.getElementById('screen')

// pascal case- class containing embedded codes. first letter capitalized
// deciding which speech recognition library to use
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition()

const commands = ['eat', 'sleep', 'dance']

// fuction to add class 'talking' to panel-data element
function onStartListening(){

    recognition.start()

    panelsData.classList.add('talking')
}

function onResult(event){
    panelsData.classList.remove('talking')

    const text = event.results[0][0].transcript

    transcript.innerText = `you said: ${text}`

    // look at the commands im allowed to say
    action = commands.find(function(command){
        // does COMMAND match TEXT
        return text.toLowerCase().includes(command)
    })
    // look at the text generated from speech recognition
    // check if text = allowed commands
    if (action){
        // if it does, do some css
        screen.classList.add(`codigotchi-screen_${action}`)
    } else{
        // if not, let me know
        transcript.textContent += ' - Invalid command!'
    }


    setTimeout(function(){
        screen.classList.remove(`codigotchi-screen_${action}`)
        transcript.innerText = ''
    }, 3000)
    
} 
// when button is clicked, run that fuction
micBtn.addEventListener('click', onStartListening)
recognition.addEventListener('result', onResult)