// Importando a biblioteca readline para interagir com o usuário via linha de comando
const readline = require('readline');

// Criando uma interface para leitura e escrita no console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função que implementa a cifra de Vigenère
function cifraVigenere(msg, key) {
    // Passo 1: Preparando o texto, removendo espaços e caracteres especiais e convertendo para maiúsculas
    msg = msg.replace(/[^a-zA-Z]/g, '').toUpperCase();
    key = key.replace(/[^a-zA-Z]/g, '').toUpperCase();

    // Passo 2: Repetir a chave até que obtenha o mesmo tamanho da mensagem
    while (key.length < msg.length) {
        key += key;
    }
    key = key.slice(0, msg.length); // Ajustando o comprimento da chave

    let msgEncriptada = '';

    // Passo 3: Cifrar a mensagem
    for (let i = 0; i < msg.length; i++) {
        const msgChar = msg.charAt(i); // Obtém o caractere atual da mensagem
        const keyChar = key.charAt(i); // Obtém o caractere correspondente da chave
    
        // Utilizando a cifra de César para cifrar cada caractere da mensagem e da chave
        const encrypt = String.fromCharCode(((msgChar.charCodeAt(0) - 65 + keyChar.charCodeAt(0) - 65) % 26) + 65);
    
        msgEncriptada += encrypt; // Concatena o caractere cifrado ao resultado
    }
    
    return msgEncriptada; // Retorna a mensagem cifrada
}

// decifrando a mensagem cifrada
function decifraVigenere(msg, key) {
    msg = msg.replace(/[^a-zA-Z]/g, '').toUpperCase();
    key = key.replace(/[^a-zA-Z]/g, '').toUpperCase();

    while (key.length < msg.length) {
        key += key;
    }
    key = key.slice(0, msg.length);

    let msgDecifrada = '';

    for (let i = 0; i < msg.length; i++) {
        const msgChar = msg.charAt(i);
        const keyChar = key.charAt(i);

        const decrypt = String.fromCharCode(((msgChar.charCodeAt(0) - keyChar.charCodeAt(0) + 26) % 26) + 65);

        msgDecifrada += decrypt;
    }

    return msgDecifrada;
}

console.log("Utilize a Cifra de Vigenère para encriptar uma mensagem!");
rl.question('Digite uma frase para cifrar: ', (msg) => {
    rl.question('Agora digite uma chave: ', (key) => {
        const textoCifrado = cifraVigenere(msg, key);
        console.log("Texto Cifrado: ", textoCifrado);
        // Decifrando 
        const textoDecifrado = decifraVigenere(textoCifrado, key);
        console.log("Texto Decifrado: ", textoDecifrado);

        rl.close();
    });
});
