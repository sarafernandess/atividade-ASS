// Função para cifrar uma mensagem usando a Cifra de César
function cifraCesar(mensagem, chave) {
    let mensagemCifrada = '';
  
    for (let i = 0; i < mensagem.length; i++) {
      let char = mensagem[i];
  
      if (char.match(/[a-zA-Z]/)) {
        // Verifique se o caractere é uma letra
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
        const offset = isUpperCase ? 'Z'.charCodeAt(0) : 'z'.charCodeAt(0);
  
        // Aplique a cifra de César ao caractere
        char = String.fromCharCode(((char.charCodeAt(0) - base + chave) % 26) + base);
      }
  
      mensagemCifrada += char;
    }
  
    return mensagemCifrada;
  }
  
  // Função para decifrar uma mensagem cifrada com a Cifra de César
  function decifraCesar(mensagemCifrada, chave) {
    return cifraCesar(mensagemCifrada, -chave); // Decifrar é o mesmo que cifrar com um deslocamento negativo
  }
  
  // Exemplo de uso:
  const mensagemOriginal = "Hello, World!";
  const chave = 3; // Deslocamento de 3 posições
  const mensagemCifrada = cifraCesar(mensagemOriginal, chave);
  const mensagemDecifrada = decifraCesar(mensagemCifrada, chave);
  
  console.log("Mensagem Original:", mensagemOriginal);
  console.log("Mensagem Cifrada:", mensagemCifrada);
  console.log("Mensagem Decifrada:", mensagemDecifrada);
  