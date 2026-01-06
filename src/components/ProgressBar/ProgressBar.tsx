import { LinearProgress, type LinearProgressProps } from '@mui/material'

export interface ProgressBarProps extends LinearProgressProps {
  progress?: number
  dataTestId?: string
}

export function ProgressBar({
  progress = 0,
  dataTestId,
  ...props
}: ProgressBarProps) {
  return (
    <LinearProgress
      data-testid={dataTestId}
      variant="determinate"
      value={progress}
      {...props}
    />
  )
}

export default ProgressBar
