import type { Preview } from '@storybook/react-vite'
import '../src/index.css'
import { StrictMode } from 'react'
import { CssBaseline } from '@mui/material'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <StrictMode>
        <CssBaseline />
        <Story />
      </StrictMode>
    ),
  ],
}

export default preview
