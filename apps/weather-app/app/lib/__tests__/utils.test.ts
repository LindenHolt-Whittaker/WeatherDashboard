import {
  convertTemp,
  formatDate,
  formatTime,
  formatLocationName,
  getFormattedConditions,
} from '../utils';

describe('convertTemp', () => {
  it('should return same value when converting Celsius to Celsius', () => {
    expect(convertTemp(20, 'C')).toBe(20);
    expect(convertTemp(0, 'C')).toBe(0);
    expect(convertTemp(-10, 'C')).toBe(-10);
  });

  it('should correctly convert Celsius to Fahrenheit', () => {
    expect(convertTemp(0, 'F')).toBe(32);
    expect(convertTemp(100, 'F')).toBe(212);
    expect(convertTemp(-40, 'F')).toBe(-40);
    expect(convertTemp(20, 'F')).toBe(68);
  });

  it('should handle decimal temperatures', () => {
    expect(convertTemp(18.5, 'F')).toBeCloseTo(65.3, 1);
    expect(convertTemp(22.3, 'F')).toBeCloseTo(72.14, 1);
  });

  it('should handle negative temperatures', () => {
    expect(convertTemp(-10, 'F')).toBe(14);
    expect(convertTemp(-20, 'C')).toBe(-20);
  });
});

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2025-01-25T12:00:00');
    const formatted = formatDate(date);
    expect(formatted).toMatch(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), \d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/);
  });

  it('should handle different days of week', () => {
    const monday = new Date('2025-01-27T12:00:00');
    expect(formatDate(monday)).toContain('Mon');
    
    const friday = new Date('2025-01-31T12:00:00');
    expect(formatDate(friday)).toContain('Fri');
    
    const sunday = new Date('2025-02-02T12:00:00');
    expect(formatDate(sunday)).toContain('Sun');
  });

  it('should handle different months', () => {
    const january = new Date('2025-01-15T12:00:00');
    expect(formatDate(january)).toContain('Jan');
    
    const december = new Date('2025-12-15T12:00:00');
    expect(formatDate(december)).toContain('Dec');
    
    const july = new Date('2025-07-15T12:00:00');
    expect(formatDate(july)).toContain('Jul');
  });

  it('should handle first and last day of month', () => {
    const firstDay = new Date('2025-01-01T12:00:00');
    expect(formatDate(firstDay)).toContain('1');
    
    const lastDay = new Date('2025-01-31T12:00:00');
    expect(formatDate(lastDay)).toContain('31');
  });

  it('should format day and month correctly together', () => {
    const date = new Date('2025-03-15T12:00:00');
    const formatted = formatDate(date);
    expect(formatted).toContain('15');
    expect(formatted).toContain('Mar');
  });
});

describe('formatTime', () => {
  it('should extract HH:MM from HH:MM:SS', () => {
    expect(formatTime('14:30:45')).toBe('14:30');
    expect(formatTime('06:15:00')).toBe('06:15');
    expect(formatTime('23:59:59')).toBe('23:59');
  });

  it('should handle edge cases', () => {
    expect(formatTime('00:00:00')).toBe('00:00');
    expect(formatTime('12:00:00')).toBe('12:00');
  });

  it('should handle single digit hours and minutes', () => {
    expect(formatTime('09:05:30')).toBe('09:05');
    expect(formatTime('01:01:01')).toBe('01:01');
  });
});

describe('formatLocationName', () => {
  it('should capitalize single word', () => {
    expect(formatLocationName('london')).toBe('London');
    expect(formatLocationName('PARIS')).toBe('Paris');
    expect(formatLocationName('Brighton')).toBe('Brighton');
  });

  it('should capitalize multiple words', () => {
    expect(formatLocationName('new york')).toBe('New York');
    expect(formatLocationName('NEW YORK')).toBe('New York');
    expect(formatLocationName('san francisco')).toBe('San Francisco');
  });

  it('should keep prepositions lowercase', () => {
    expect(formatLocationName('stratford upon avon')).toBe('Stratford upon Avon');
    expect(formatLocationName('newcastle upon tyne')).toBe('Newcastle upon Tyne');
    expect(formatLocationName('stoke on trent')).toBe('Stoke on Trent');
  });

  it('should handle hyphenated names', () => {
    expect(formatLocationName('stratford-upon-avon')).toBe('Stratford-upon-Avon');
    expect(formatLocationName('BERWICK-UPON-TWEED')).toBe('Berwick-upon-Tweed');
    expect(formatLocationName('newton-le-willows')).toBe('Newton-le-Willows');
  });

  it('should handle foreign prepositions', () => {
    expect(formatLocationName('rio de janeiro')).toBe('Rio de Janeiro');
    expect(formatLocationName('VAL-DE-MARNE')).toBe('Val-de-Marne');
    expect(formatLocationName('Frankfurt am Main')).toBe('Frankfurt am Main');
  });

  it('should always capitalize first word', () => {
    expect(formatLocationName('the hague')).toBe('The Hague');
    expect(formatLocationName('de panne')).toBe('De Panne');
    expect(formatLocationName('le havre')).toBe('Le Havre');
  });

  it('should handle already formatted names', () => {
    expect(formatLocationName('Brighton')).toBe('Brighton');
    expect(formatLocationName('New York')).toBe('New York');
  });

  it('should handle mixed case input', () => {
    expect(formatLocationName('NeW yOrK')).toBe('New York');
    expect(formatLocationName('lOnDoN')).toBe('London');
  });

  it('should handle lowercase articles and prepositions', () => {
    expect(formatLocationName('brighton and hove')).toBe('Brighton and Hove');
    expect(formatLocationName('bishop in the forest')).toBe('Bishop in the Forest');
  });

  it('should handle Dutch prepositions', () => {
    expect(formatLocationName('den haag')).toBe('Den Haag');
    expect(formatLocationName('s-hertogenbosch')).toBe('S-Hertogenbosch');
  });

  it('should capitalize after hyphens except for prepositions', () => {
    expect(formatLocationName('ashby-de-la-zouch')).toBe('Ashby-de-la-Zouch');
  });
});

describe('getFormattedConditions', () => {
  it('should split conditions by comma', () => {
    const result = getFormattedConditions('Partly cloudy, Breezy');
    expect(result).toHaveLength(2);
    expect(result[0]).toBe('Partly cloudy');
    expect(result[1]).toBe('Breezy');
  });

  it('should add non-breaking space for single condition', () => {
    const result = getFormattedConditions('Clear');
    expect(result).toHaveLength(2);
    expect(result[0]).toBe('Clear');
    expect(result[1]).toBe('\u00A0');
  });

  it('should handle multiple conditions', () => {
    const result = getFormattedConditions('Rain, Overcast, Windy');
    expect(result).toHaveLength(3);
    expect(result[0]).toBe('Rain');
    expect(result[1]).toBe('Overcast');
    expect(result[2]).toBe('Windy');
  });

  it('should handle empty string', () => {
    const result = getFormattedConditions('');
    expect(result).toHaveLength(2);
    expect(result[0]).toBe('');
    expect(result[1]).toBe('\u00A0');
  });

  it('should handle conditions without spaces after comma', () => {
    const result = getFormattedConditions('Cloudy,Humid');
    expect(result).toHaveLength(2);
    expect(result[0]).toBe('Cloudy');
    expect(result[1]).toBe('Humid');
  });
});
