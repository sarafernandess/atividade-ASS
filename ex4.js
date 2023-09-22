const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// cifrando uma mensagem
function cifraHill(mensagem, chave) {
    // Transformando a mensagem e a chave em matrizes de números
    const mensagemNumeros = mensagem.split('').map(char => char.charCodeAt(0) - 65);
    const chaveNumeros = chave.split('').map(char => char.charCodeAt(0) - 65);

    // Verificando se as matrizes sao do mesmo tamanho
    if (mensagemNumeros.length % 2 !== 0 || mensagemNumeros.length !== chaveNumeros.length) {
        throw new Error("Tamanhos de mensagem e chave incompatíveis.");
    }

    const resultado = [];

    for (let i = 0; i < mensagemNumeros.length; i += 2) {
        const a = mensagemNumeros[i];
        const b = mensagemNumeros[i + 1];

        // Realizando a multiplicação da matriz-chave com os blocos de mensagem
        const c = (a * chaveNumeros[0] + b * chaveNumeros[1]) % 26;
        const d = (a * chaveNumeros[2] + b * chaveNumeros[3]) % 26;

        // Convertendo os números resultantes em caracteres
        resultado.push(String.fromCharCode(c + 65), String.fromCharCode(d + 65));
    }

    return resultado.join('');
}

// decifrar uma mensagem usando uma matriz-chave
function decifraHill(mensagemCifrada, chave) {
    // Transformando a mensagem cifrada e a chave em matrizes de números
    const mensagemCifradaNumeros = mensagemCifrada.split('').map(char => char.charCodeAt(0) - 65);
    const chaveNumeros = chave.split('').map(char => char.charCodeAt(0) - 65);

    // Verificando se as matrizes têm tamanhos compatíveis
    if (mensagemCifradaNumeros.length % 2 !== 0 || mensagemCifradaNumeros.length !== chaveNumeros.length) {
        throw new Error("Tamanhos de mensagem cifrada e chave incompatíveis.");
    }

    const resultado = [];

    for (let i = 0; i < mensagemCifradaNumeros.length; i += 2) {
        const c = mensagemCifradaNumeros[i];
        const d = mensagemCifradaNumeros[i + 1];

        // Calculando a matriz inversa da chave (para uma matriz 2x2)
        const det = chaveNumeros[0] * chaveNumeros[3] - chaveNumeros[1] * chaveNumeros[2];
        const chaveInversa = [
            chaveNumeros[3] / det,
            -chaveNumeros[1] / det,
            -chaveNumeros[2] / det,
            chaveNumeros[0] / det
        ];

        // Realizando a multiplicação da matriz inversa com os blocos de mensagem cifrada
        const a = (c * chaveInversa[0] + d * chaveInversa[1] + 26) % 26;
        const b = (c * chaveInversa[2] + d * chaveInversa[3] + 26) % 26;

        // Convertendo os números resultantes em caracteres
        resultado.push(String.fromCharCode(a + 65), String.fromCharCode(b + 65));
    }

    return resultado.join('');
}

rl.question('Digite a mensagem: ', (mensagem) => {
    rl.question('Digite a chave: ', (chave) => {
        const mensagemCifrada = cifraHill(mensagem.toUpperCase(), chave.toUpperCase());
        console.log("Mensagem Cifrada: ", mensagemCifrada);

        const mensagemDecifrada = decifraHill(mensagemCifrada, chave.toUpperCase());
        console.log("Mensagem Decifrada: ", mensagemDecifrada);

        rl.close();
    });
});
