import type { Meta, StoryObj } from '@storybook/react-vite'

import { ProgressBar, type ProgressBarProps } from './ProgressBar'
import { Box } from '@mui/material'

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    progress: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary = (props: ProgressBarProps) => {
  return (
    <Box width={500}>
      <ProgressBar {...props} />
    </Box>
  )
}

export const WithProgress: Story = {
  args: {
    progress: 75,
  },
}
