import { render, screen, fireEvent } from '@testing-library/react'
import Forecast from './forecast'

const mockData = {
  forecast: {
    forecastday: [
      {
        date: '2025-09-10',
        day: { maxtemp_c: 25, mintemp_c: 15, condition: { text: 'Sunny' } },
      },
      {
        date: '2025-09-11',
        day: { maxtemp_c: 22, mintemp_c: 12, condition: { text: 'Cloudy' } },
      },
      {
        date: '2025-09-12',
        day: { maxtemp_c: 20, mintemp_c: 10, condition: { text: 'Light rain' } },
      },
    ],
  },
}

describe('Forecast', () => {
  test('renders Today for the first forecast entry', () => {
    render(<Forecast data={mockData} setLocation={jest.fn()} />)
    expect(screen.getByText('Today')).toBeInTheDocument()
  })

  test('renders search input', () => {
    render(<Forecast data={mockData} setLocation={jest.fn()} />)
    expect(screen.getByPlaceholderText('Buscar..')).toBeInTheDocument()
  })

  test('calls setLocation when Enter is pressed with non-empty input', () => {
    const setLocation = jest.fn()
    render(<Forecast data={mockData} setLocation={setLocation} />)
    const input = screen.getByPlaceholderText('Buscar..')
    fireEvent.change(input, { target: { value: 'Madrid' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(setLocation).toHaveBeenCalledWith('Madrid')
  })

  test('clears input after Enter with non-empty value', () => {
    render(<Forecast data={mockData} setLocation={jest.fn()} />)
    const input = screen.getByPlaceholderText('Buscar..')
    fireEvent.change(input, { target: { value: 'Madrid' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(input.value).toBe('')
  })

  test('does not call setLocation when Enter is pressed with empty input', () => {
    const setLocation = jest.fn()
    render(<Forecast data={mockData} setLocation={setLocation} />)
    const input = screen.getByPlaceholderText('Buscar..')
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(setLocation).not.toHaveBeenCalled()
  })

  test('does not call setLocation when non-Enter key is pressed', () => {
    const setLocation = jest.fn()
    render(<Forecast data={mockData} setLocation={setLocation} />)
    const input = screen.getByPlaceholderText('Buscar..')
    fireEvent.change(input, { target: { value: 'Madrid' } })
    fireEvent.keyDown(input, { key: 'a' })
    expect(setLocation).not.toHaveBeenCalled()
  })

  test('renders weekday names for non-first entries on desktop', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true })
    render(<Forecast data={mockData} setLocation={jest.fn()} />)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const rendered = screen.getAllByText((text) => days.includes(text))
    expect(rendered.length).toBeGreaterThan(0)
  })

  test('renders short weekday names on mobile', () => {
    Object.defineProperty(window, 'innerWidth', { value: 375, writable: true })
    render(<Forecast data={mockData} setLocation={jest.fn()} />)
    const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const rendered = screen.getAllByText((text) => shortDays.includes(text))
    expect(rendered.length).toBeGreaterThan(0)
  })

  test('does not crash when data has no forecast', () => {
    render(<Forecast data={{}} setLocation={jest.fn()} />)
    expect(screen.getByPlaceholderText('Buscar..')).toBeInTheDocument()
  })
})
