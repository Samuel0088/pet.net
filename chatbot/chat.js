let step = 0; // Controla em qual etapa do chatbot estamos
let petInfo = {};

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    // Mostra a mensagem do usuário na tela
    addMessage(userInput, 'user');
    document.getElementById('user-input').value = '';

    // Controle do fluxo
    switch (step) {
        case 0:
            handleServiceChoice(userInput);
            break;
        case 1:
            handleWeightChoice(userInput);
            break;
        case 2:
            handlePickupChoice(userInput);
            break;
        case 3:
            handlePaymentChoice(userInput);
            break;
        case 4:
            handleScheduleChoice(userInput);
            break;
        case 5:
            handleAddressInput(userInput);
            break;
        case 6:
            handleVaccineChoice(userInput);
            break;
        default:
            showInvalidInput();
            addMessage('Desculpe, houve um erro no fluxo. Por favor, tente novamente.', 'bot');
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.innerText = text;
    document.getElementById('chat-box').appendChild(messageDiv);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
}

function handleServiceChoice(choice) {
    if (choice == '1') {
        petInfo.service = 'Banho e Tosa';
        addMessage('Ok, poderia nos informar sobre o peso do seu pet?', 'bot');
        addMessage('1- 1kg a 4kg \n 2- 5kg a 8kg \n 3- 10kg a 15kg \n 4- 15kg a 20kg', 'bot');
        step = 1;
    } else if (choice == '2') {
        petInfo.service = 'Consulta';
        addMessage('Você gostaria de que nós pegássemos o seu pet em casa?', 'bot');
        addMessage('1- Sim, 2- Não', 'bot');
        step = 2;
    } else if (choice == '3') {
        petInfo.service = 'Vacinação';
        addMessage('Qual vacina você deseja agendar?', 'bot');
        addMessage('1- Antirrábica\n2- V8/V10\n3- Leptospirose\n4- Gripe\n5- Raiva', 'bot');
        step = 6; // Etapa para selecionar a vacina
    } else {
        showInvalidInput();
        addMessage('Por favor, escolha uma opção válida: 1, 2 ou 3.', 'bot');
    }
    updatePlaceholder(step);
}

function handleVaccineChoice(choice) {
    if (choice == '1' || choice == '2' || choice == '3' || choice == '4' || choice == '5') {
        petInfo.vaccine = choice == '1' ? 'Antirrábica' :
                          choice == '2' ? 'V8/V10' :
                          choice == '3' ? 'Leptospirose' :
                          choice == '4' ? 'Gripe' : 'Raiva';

        addMessage(`Vacina selecionada: ${petInfo.vaccine}.`, 'bot');
        addMessage('Você gostaria que nós pegássemos o seu pet em casa?', 'bot');
        addMessage('1- Sim, 2- Não', 'bot');

        // Transição para a etapa de retirada
        step = 2;
    } else {
        showInvalidInput();
        addMessage('Por favor, escolha uma opção válida: 1, 2, 3, 4 ou 5.', 'bot');
    }
    updatePlaceholder(step);
}

function handleWeightChoice(choice) {
    if (choice == '1' || choice == '2' || choice == '3' || choice == '4') {
        petInfo.weight = choice;
        addMessage('Você desejaria que nós pegássemos o seu pet na sua casa?', 'bot');
        addMessage('1- Sim, 2- Não', 'bot');
        step = 2; // Próxima etapa: escolha de retirada
    } else {
        showInvalidInput();
        addMessage('Por favor, escolha uma opção válida: 1, 2, 3 ou 4.', 'bot');
    }
    updatePlaceholder(step);
}

function handlePickupChoice(choice) {
    if (choice == '1') {
        petInfo.pickup = 'Sim'; // Armazena que é para buscar
        addMessage('Ok, coloque o seu endereço abaixo:', 'bot');
        step = 5; // Avança para coletar o endereço
    } else if (choice == '2') {
        petInfo.pickup = 'Não'; // Armazena que não é para buscar
        addMessage('Qual vai ser a forma de pagamento?', 'bot');
        addMessage('1- Dinheiro, 2- Cartão, 3- Pix', 'bot');
        step = 3; // Avança para a etapa de pagamento
    } else {
        showInvalidInput();
        addMessage('Por favor, escolha uma opção válida: 1 ou 2.', 'bot');
    }
    updatePlaceholder(step);
}

function handlePaymentChoice(choice) {
    if (choice == '1' || choice == '2' || choice == '3') {
        petInfo.payment = choice == '1' ? 'Dinheiro' : choice == '2' ? 'Cartão' : 'Pix';

        if (petInfo.service === 'Consulta') {
            addMessage('Escolha o horário para a consulta:', 'bot');
            addMessage('1- 9hrs, 2- 14hrs, 3- 16hrs', 'bot');
            step = 4; // Próxima etapa: escolher horário
        } else {
            sendToWhatsApp(); // Finaliza para outros serviços
        }
    } else {
        showInvalidInput();
        addMessage('Por favor, escolha uma opção válida: 1, 2 ou 3.', 'bot');
    }
    updatePlaceholder(step);
}

function handleScheduleChoice(choice) {
    if (choice == '1' || choice == '2' || choice == '3') {
        petInfo.time = choice == '1' ? '9hrs' : choice == '2' ? '14hrs' : '16hrs';
        addMessage('Consulta marcada para o serviço de ' + petInfo.service + ' às ' + petInfo.time + '.', 'bot');

        // Após marcar, envia para o WhatsApp
        sendToWhatsApp();
    } else {
        showInvalidInput();
        addMessage('Por favor, escolha uma opção válida: 1, 2 ou 3.', 'bot');
    }
    updatePlaceholder(step);
}

function handleAddressInput(address) {
    petInfo.address = address; // Armazena o endereço
    addMessage('Endereço recebido: ' + petInfo.address, 'bot');
    addMessage('Qual será a forma de pagamento?', 'bot');
    addMessage('1- Dinheiro, 2- Cartão, 3- Pix', 'bot');
    step = 3; // Próxima etapa: forma de pagamento
    updatePlaceholder(step);
}

function sendToWhatsApp() {
    const phoneNumber = '+5519996204031'; // Insira o número de telefone com código do país e DDD
    let message = `Olá! Gostaria de agendar os seguintes serviços para meu pet:\n\n` +
        `*Serviço*: ${petInfo.service}\n` +
        `*Peso do Pet*: ${petInfo.weight ? petInfo.weight : 'não informado'}\n` +
        `*Forma de Pagamento*: ${petInfo.payment ? petInfo.payment : 'não informado'}\n` +
        `*Horário*: ${petInfo.time ? petInfo.time : 'não agendado'}\n` +
        `*Retirada em casa*: ${petInfo.pickup}\n` + // Inclui "Sim" ou "Não"
        `*Endereço*: ${petInfo.address ? petInfo.address : 'não informado'}`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const whatsappUrl = isMobile 
        ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}` // Mobile
        : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`; // Desktop

    window.open(whatsappUrl, '_blank'); // Abre em uma nova guia
}

function updatePlaceholder(step) {
    const userInput = document.getElementById('user-input');
    if (step === 1) {
        userInput.placeholder = "Escolha o peso do seu pet...";
    } else if (step === 2) {
        userInput.placeholder = "Escolha a opção de retirada...";
    } else if (step === 3) {
        userInput.placeholder = "Digite o endereço ou escolha pagamento...";
    } else if (step === 4) {
        userInput.placeholder = "Escolha o horário para a busca...";
    } else if (step === 5) {
        userInput.placeholder = "Digite seu endereço...";
    } else {
        userInput.placeholder = "Digite aqui...";
    }
}

function showInvalidInput() {
    const userInput = document.getElementById('user-input');
    userInput.classList.add('invalid');
    setTimeout(() => userInput.classList.remove('invalid'), 500);
}
