export default class {
  constructor(printer, clock) {
    this.printer = printer;
    this.clock = clock;
  }

  run(input) {
    const currentHour = this.clock.hour();
    const isMorningTime = currentHour >= 6 && currentHour <= 12;
    const isAfternoonTime = currentHour >= 13 && currentHour <= 20;

    if (isMorningTime) {
      return this.printer(`¡Buenos días ${input}!`);
    }

    if (isAfternoonTime) {
      return this.printer(`¡Buenas tardes ${input}!`);
    }

    this.printer(`¡Buenas noches ${input}!`);
  }
}
