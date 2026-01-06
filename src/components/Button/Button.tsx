import {
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
} from '@mui/material'

export interface ButtonProps extends MuiButtonProps {
  dataTestId: string
  label?: string
}

export function Button({
  onClick,
  dataTestId,
  label = 'Button',
  ...props
}: ButtonProps) {
  return (
    <MuiButton
      data-testid={dataTestId}
      variant="contained"
      onClick={onClick}
      sx={{ mb: 2 }}
      {...props}
    >
      {label}
    </MuiButton>
  )
}

export default Button
