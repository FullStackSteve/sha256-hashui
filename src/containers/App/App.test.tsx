import { test, describe, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import * as hashWasm from 'hash-wasm'

vi.mock('hash-wasm', async () => {
  const actual = await vi.importActual<typeof hashWasm>('hash-wasm')
  return {
    ...actual,
    createSHA256: vi.fn(actual.createSHA256),
  }
})

describe('App.tsx', async () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('it renders the homepage', async () => {
    // ARRANGE
    render(<App />)

    // ACT
    const heading = await screen.findByTestId('heading')

    // ASSERT
    expect(heading).toHaveTextContent('Sha256 Encoder')
  })

  test('it can click the button', async () => {
    // ARRANGE
    render(<App />)

    // ACT
    const button = await screen.findByTestId('encode-button')
    await userEvent.click(button)
    const error = await screen.findByTestId('encode-error')

    // ASSERT
    expect(error).toHaveTextContent('No file selected for encoding')
  })

  test('it can select a file', async () => {
    // ARRANGE
    render(<App />)

    // ACT
    const file = new File(['test'], 'test.txt', { type: 'text/plain' })
    const input = await screen.findByTestId('file-input')
    await userEvent.upload(input, file)

    // ASSERT
    expect((input as HTMLInputElement).files?.[0]).toBe(file)
  })

  test('it can encode a file', async () => {
    // ARRANGE
    render(<App />)

    // ACT
    const buffer = Buffer.from('test', 'utf-8')
    const file = new File([buffer], 'test.txt', { type: 'text/plain' })

    const input = await screen.findByTestId('file-input')
    await userEvent.upload(input, file)

    const button = await screen.findByTestId('encode-button')
    await userEvent.click(button)

    const output = await screen.findByTestId('encode-success')

    // ASSERT
    expect(output).toHaveTextContent(
      '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
    )
  })

  test('it can handle errors when no file is selected', async () => {
    // ARRANGE
    render(<App />)

    // ACT
    const button = await screen.findByTestId('encode-button')
    await userEvent.click(button)
    const output = await screen.findByTestId('encode-error')

    // ASSERT
    expect(output).toHaveTextContent('No file selected for encoding')
  })

  test('it can handle errors when encoding a file', async () => {
    // ARRANGE
    const mockCreateSHA256 = vi.mocked(hashWasm.createSHA256)
    mockCreateSHA256.mockRejectedValueOnce(new Error('Hash creation failed'))

    render(<App />)

    // ACT
    const buffer = Buffer.from('test', 'utf-8')
    const file = new File([buffer], 'test.txt', { type: 'text/plain' })

    const input = await screen.findByTestId('file-input')
    await userEvent.upload(input, file)

    const button = await screen.findByTestId('encode-button')
    await userEvent.click(button)

    const output = await screen.findByTestId('encode-error')

    // ASSERT
    expect(output).toHaveTextContent(
      'Error during encoding: Hash creation failed'
    )
  })
})
