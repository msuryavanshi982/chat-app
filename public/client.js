const socket = io();
let nameOfuser;
let textArea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area');
do {
    nameOfuser = prompt('Please enter your name')
} while (!nameOfuser)

textArea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
})

function sendMessage(message) {
    let msg = {
        user: nameOfuser,
        message: message.trim()
    }

    appendMessage(msg, 'outgoing')
    textArea.value = '';
    scrollToBottom();
    socket.emit('message', msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type;
    mainDiv.classList.add(className, 'message')

    let markUp = `
       <h4>${msg.user}</h4>
       <p>${msg.message}</p>
       `
    mainDiv.innerHTML = markUp
    messageArea.appendChild(mainDiv)
}

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom();
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}