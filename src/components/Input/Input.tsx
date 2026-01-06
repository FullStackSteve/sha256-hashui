import { TextField, type TextFieldProps } from '@mui/material'

export interface InputProps extends Omit<
  TextFieldProps<'outlined'>,
  'variant'
> {
  label?: string
}

export function Input({ label, ...props }: InputProps) {
  return (
    <TextField
      label={label}
      multiline
      rows={4}
      fullWidth
      sx={{ mt: 2 }}
      {...props}
      variant="outlined"
    />
  )
}
