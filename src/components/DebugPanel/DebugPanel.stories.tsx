import type { Meta, StoryObj } from '@storybook/react-vite'

import { DebugPanel } from './DebugPanel'

const meta = {
  title: 'Components/DebugPanel',
  component: DebugPanel,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DebugPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: {
      file: { name: 'test.txt', size: 2048 },
      isChunking: false,
      hasEncoded: false,
      encodingProgress: 0,
      error: null,
      currentChunk: 0,
      totalChunks: 0,
    },
  },
}

export const WithFileData: Story = {
  args: {
    data: {
      file: { name: 'test.txt', size: 1024000 },
      isChunking: false,
      hasEncoded: false,
      encodingProgress: 50,
      error: null,
      currentChunk: 5,
      totalChunks: 10,
      fileChunks: [
        { index: 0, size: 102400 },
        { index: 1, size: 102400 },
        { index: 2, size: 102400 },
      ],
    },
  },
}
