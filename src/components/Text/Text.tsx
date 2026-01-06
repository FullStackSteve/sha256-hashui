import { Typography, type TypographyProps } from '@mui/material'

export interface TextProps extends TypographyProps {
  message: string
  dataTestId?: string
}

export function Text({ message, dataTestId, ...props }: TextProps) {
  return (
    <Typography
      variant="h6"
      component="p"
      data-testid={dataTestId}
      sx={{ mb: 2 }}
      {...props}
    >
      {message}
    </Typography>
  )
}

export default Text
