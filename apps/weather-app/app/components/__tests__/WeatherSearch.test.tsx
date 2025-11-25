import { render, screen, fireEvent } from '@testing-library/react';
import WeatherSearch from '../WeatherSearch';

describe('WeatherSearch', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('should render input and button', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={false} />);
    
    expect(screen.getByRole('textbox')).toBeTruthy();
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('should have placeholder text', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={false} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.placeholder).toBe('Search for a location...');
  });

  it('should update input value when user types', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={false} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'London' } });
    
    expect(input.value).toBe('London');
  });

  it('should call onSearch with trimmed input on submit', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={false} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const button = screen.getByRole('button');
    
    fireEvent.change(input, { target: { value: '  London  ' } });
    fireEvent.click(button);
    
    expect(mockOnSearch).toHaveBeenCalledWith('London');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('should call onSearch on form submit', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={false} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const form = input.closest('form');
    
    fireEvent.change(input, { target: { value: 'Paris' } });
    fireEvent.submit(form!);
    
    expect(mockOnSearch).toHaveBeenCalledWith('Paris');
  });

  it('should not call onSearch with empty input', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={false} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('should not call onSearch with whitespace-only input', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={false} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const button = screen.getByRole('button');
    
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);
    
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('should disable input when loading', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={true} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('should disable button when loading', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={true} />);
    
    const button = screen.getByRole('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it('should disable button when input is empty', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={false} />);
    
    const button = screen.getByRole('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it('should enable button when input has value', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={false} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const button = screen.getByRole('button') as HTMLButtonElement;
    
    fireEvent.change(input, { target: { value: 'London' } });
    
    expect(button.disabled).toBe(false);
  });

  it('should disable button when input has only whitespace', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={false} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const button = screen.getByRole('button') as HTMLButtonElement;
    
    fireEvent.change(input, { target: { value: '   ' } });
    
    expect(button.disabled).toBe(true);
  });

  it('should handle Enter key press', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={false} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const form = input.closest('form');
    
    fireEvent.change(input, { target: { value: 'Berlin' } });
    fireEvent.submit(form!);
    
    expect(mockOnSearch).toHaveBeenCalledWith('Berlin');
  });

  it('should prevent default form submission', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={false} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const form = input.closest('form');
    
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault');
    
    fireEvent.change(input, { target: { value: 'Madrid' } });
    form!.dispatchEvent(submitEvent);
    
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should have correct CSS classes', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={false} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const button = screen.getByRole('button') as HTMLButtonElement;
    
    expect(input.className).toBe('search-input');
    expect(button.className).toBe('search-button');
  });

  it('should render SVG icon in button', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={false} />);
    
    const button = screen.getByRole('button');
    const svg = button.querySelector('svg');
    
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('width')).toBe('24');
    expect(svg?.getAttribute('height')).toBe('24');
  });

  it('should maintain input value when button is clicked', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={false} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const button = screen.getByRole('button');
    
    fireEvent.change(input, { target: { value: 'Tokyo' } });
    fireEvent.click(button);
    
    expect(input.value).toBe('Tokyo');
  });

  it('should handle multiple searches', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={false} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const button = screen.getByRole('button');
    
    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.click(button);
    
    fireEvent.change(input, { target: { value: 'Paris' } });
    fireEvent.click(button);
    
    expect(mockOnSearch).toHaveBeenCalledTimes(2);
    expect(mockOnSearch).toHaveBeenNthCalledWith(1, 'London');
    expect(mockOnSearch).toHaveBeenNthCalledWith(2, 'Paris');
  });

  it('should handle rapid input changes', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={false} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'L' } });
    expect(input.value).toBe('L');
    
    fireEvent.change(input, { target: { value: 'Lo' } });
    expect(input.value).toBe('Lo');
    
    fireEvent.change(input, { target: { value: 'Lon' } });
    expect(input.value).toBe('Lon');
    
    fireEvent.change(input, { target: { value: 'London' } });
    expect(input.value).toBe('London');
  });
});