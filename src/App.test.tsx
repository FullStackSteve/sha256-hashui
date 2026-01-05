import { test, describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App.tsx', async () => {
  test('it renders the homepage', async () => {
    // ARRANGE
    render(<App />)

    // ACT
    const heading = await screen.findByTestId('heading')

    // ASSERT
    expect(heading).toHaveTextContent('Vite + React')
  })
  test('it can click the button', async () => {
    // ARRANGE
    render(<App />)

    // ACT
    const button = await screen.findByTestId('button-count')
    await userEvent.click(button)

    // ASSERT
    expect(button).toHaveTextContent('count is 1')
  })
})
