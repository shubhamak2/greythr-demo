import readline from 'readline';

const askQuestion = (question) => {
  const readLineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    readLineInterface.question(question, (answer) => {
      resolve(answer)
      readLineInterface.close();
    });  
  })
}

export default askQuestion;
