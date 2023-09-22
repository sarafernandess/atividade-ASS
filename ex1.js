const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para converter um número decimal em uma representação binária
function convertToBin(num) {
  return (num >>> 0).toString(2); // Converte o número para binário
}

// Função para cifrar uma mensagem binária usando uma chave binária com operação XOR
function encrypt(xBin, kBin) {
  if (xBin.length !== kBin.length) {
    throw new Error("A mensagem e a chave devem ter o mesmo comprimento em binário."); //confeirndo se a chave e a mensagem possui o mesmo tamanho
  }

  const encrypt = []

  for (let i = 0; i < xBin.length; i++) {
    const msgBit = parseInt(xBin[i]);
    const keyBit = parseInt(kBin[i]);
    const encryptBit = msgBit ^ keyBit; // Realiza uma operação XOR entre os bits
    encrypt.push(encryptBit);
  }
  return encrypt.join('');
}


rl.question('Digite o número da mensagem (X): ', (x) => {
  rl.question('Digite o número da chave (K): ', (k) => {
      // Converte os números digitados em inteiros
    const xInt = parseInt(x);
    const kInt = parseInt(k);

    // Converte os números inteiros em representações binárias
    const msgBin = convertToBin(xInt);
    console.log("Mensagem (X): ", msgBin);

    const keyBin = convertToBin(kInt);
    console.log("Chave (K)", keyBin);

    // Realiza a cifragem da mensagem binária usando a chave binária
    const msgEncrypted = encrypt(msgBin, keyBin);
    console.log("Mensagem encriptada (Y): ", msgEncrypted);

    // Realiza a decifragem da mensagem encriptada usando a mesma chave binária
    // A decifragem é feita pela mesma função de cifragem
    const msgDecrypted = encrypt(msgEncrypted, keyBin);
    console.log("Mensagem decifrada (X): ", msgDecrypted);

    rl.close();
  });
});


