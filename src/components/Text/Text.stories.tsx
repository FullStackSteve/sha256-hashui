import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from './Text'

const meta = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    message: 'File encoded successfully',
  },
}
