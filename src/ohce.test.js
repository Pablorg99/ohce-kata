import Ohce from './ohce';

describe('Ohce', () => {
  const userName = 'Pedro';

  let printer;
  let clock = {};
  let reader = {};

  beforeEach(() => {
    printer = jest.fn();
    clock.hour = jest.fn();
    reader.get = jest.fn();
  });

  describe('Greets you', () => {
    test.each([10, 6, 12])('in the morning at %p', (hour) => {
      clock.hour.mockReturnValue(hour);
      reader.get.mockReturnValueOnce('Stop!');

      const ohce = new Ohce(printer, clock, reader);
      ohce.start(userName);

      expect(printer).toHaveBeenCalledWith(`¡Buenos días Pedro!`);
    });

    test.each([16, 13, 20])('in the afternoon at %p', (hour) => {
      clock.hour.mockReturnValue(hour);
      reader.get.mockReturnValueOnce('Stop!');

      const ohce = new Ohce(printer, clock, reader);
      ohce.start(userName);

      expect(printer).toHaveBeenCalledWith(`¡Buenas tardes Pedro!`);
    });

    test.each([22, 21, 23, 0, 5])('in the night at %p', (hour) => {
      clock.hour.mockReturnValue(hour);
      reader.get.mockReturnValueOnce('Stop!');

      const ohce = new Ohce(printer, clock, reader);
      ohce.start(userName);

      expect(printer).toHaveBeenCalledWith(`¡Buenas noches Pedro!`);
    });

    test.each([10, 19, 23])('with your name at %p', (hour) => {
      clock.hour.mockReturnValue(hour);
      reader.get.mockReturnValueOnce('Stop!');

      const ohce = new Ohce(printer, clock, reader);
      ohce.start('Javi');

      expect(printer).toHaveBeenCalledWith(expect.stringMatching(/.+Javi!/));
    });
  });

  describe('Says goodbye', () => {
    test('with your name', () => {
      clock.hour.mockReturnValue(10);
      reader.get.mockReturnValueOnce('Stop!');

      const ohce = new Ohce(printer, clock, reader);
      ohce.start('Javi');

      expect(printer).toHaveBeenCalledWith('Adiós Javi');
    });
  });

  describe('Listen to words', () => {
    test('reverse words', () => {
      reader.get
        .mockReturnValueOnce('word')
        .mockReturnValueOnce('javi')
        .mockReturnValueOnce('Stop!');
      clock.hour.mockReturnValue(10);
      const ohce = new Ohce(printer, clock, reader);

      ohce.start(userName);

      expect(printer.mock.calls).toEqual([
        [`¡Buenos días ${userName}!`],
        ['drow'],
        ['ivaj'],
        [`Adiós ${userName}`],
      ]);
    });

    test('detects palindromes', () => {
      reader.get.mockReturnValueOnce('ana').mockReturnValueOnce('Stop!');
      clock.hour.mockReturnValue(10);
      const ohce = new Ohce(printer, clock, reader);

      ohce.start(userName);

      expect(printer.mock.calls).toEqual([
        [`¡Buenos días ${userName}!`],
        ['ana'],
        ['¡Bonita palabra!'],
        [`Adiós ${userName}`],
      ]);
    });
  });
});
