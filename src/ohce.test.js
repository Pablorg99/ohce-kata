import Ohce from './ohce';

describe('Greets you', () => {
  const input = 'Pedro';
  let printer;
  let clock = {};

  beforeEach(() => {
    printer = jest.fn();
    clock.hour = jest.fn();
  });

  test.each([10, 6, 12])('in the morning', (hour) => {
    clock.hour.mockReturnValue(hour);

    const ohce = new Ohce(printer, clock);
    ohce.run(input);

    expect(printer).toHaveBeenCalledWith(`¡Buenos días Pedro!`);
  });

  test.each([16, 13, 20])('in the afternoon', (hour) => {
    clock.hour.mockReturnValue(hour);

    const ohce = new Ohce(printer, clock);
    ohce.run(input);

    expect(printer).toHaveBeenCalledWith(`¡Buenas tardes Pedro!`);
  });

  test.each([22, 21, 23, 0, 5])('in the night', (hour) => {
    clock.hour.mockReturnValue(hour);

    const ohce = new Ohce(printer, clock);
    ohce.run(input);

    expect(printer).toHaveBeenCalledWith(`¡Buenas noches Pedro!`);
  });
});
