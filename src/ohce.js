export default class {
  constructor(printer, clock, reader) {
    this.printer = printer;
    this.clock = clock;
    this.reader = reader;
  }

  start(userName) {
    this.greets(userName);

    while (true) {
      const word = this.reader.get();

      if (word === 'Stop!') {
        break;
      }

      this.printer(reverse(word));

      if (isPalindrome(word)) {
        this.printer('¡Bonita palabra!');
      }
    }

    this.printer(`Adiós ${userName}`);
  }

  greets(userName) {
    const currentHour = this.clock.hour();
    const greeting = getGreeting(currentHour, userName);

    this.printer(greeting);
  }
}

function isPalindrome(word) {
  return word === reverse(word);
}

function getGreeting(currentHour, userName) {
  const isMorningTime = currentHour >= 6 && currentHour <= 12;
  const isAfternoonTime = currentHour >= 13 && currentHour <= 20;

  if (isMorningTime) {
    return `¡Buenos días ${userName}!`;
  }

  if (isAfternoonTime) {
    return `¡Buenas tardes ${userName}!`;
  }

  return `¡Buenas noches ${userName}!`;
}

function reverse(word) {
  return word.split('').reverse().join('');
}
