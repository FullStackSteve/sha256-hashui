import { TextField, type TextFieldProps } from '@mui/material'

export interface InputProps extends Omit<
  TextFieldProps<'outlined'>,
  'variant'
> {
  label?: string
  maxLength?: number
}

export function Input({ label, maxLength = 500, ...props }: InputProps) {
  return (
    <TextField
      label={label}
      multiline
      rows={4}
      fullWidth
      sx={{ mt: 2 }}
      slotProps={{ htmlInput: { maxLength } }}
      {...props}
      variant="outlined"
    />
  )
}
