import type { Meta, StoryObj } from '@storybook/react-vite'

import { FileUploader } from './FileUploader'

const meta = {
  title: 'Components/FileUploader',
  component: FileUploader,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    onChange: () => {},
  },
} satisfies Meta<typeof FileUploader>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
