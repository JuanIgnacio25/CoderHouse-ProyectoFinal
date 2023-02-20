const socket = io();

const sendMessage = (e) => {
    const message = document.getElementById('message').value;
    const email = document.getElementById('email').value
    const newMessage = { message, email };
    if (message !== '') {
        message.innerHTML = ''
        socket.emit('new_message', newMessage);
    }
    return false;
}

const createMessageTag = (messageInfo) => {
    const { email, message, time_Stamp } = messageInfo;
    return `
    <div class="text-dark">
        <div class="d-flex flex-row">
            <div class="p-1">
                <strong >${email}</strong>
                <p >${time_Stamp}</p>
            </div>

            <div class="p-1">
                <i >${message}</i>
            </div>
        </div>
        
    </div>
    `;
}

const addMessages = (message) => {
    if (message !== '') {
        const finalMessage = message.map(message => createMessageTag(message)).join(' ');
        const messages = document.getElementById('messages');
        messages.innerHTML = finalMessage;
        messages.scrollTop = messages.scrollHeight;
        document.getElementById('message').value = " ";
    }
}

socket.on('messages', (messages) => addMessages(messages));