import { Box } from '@mui/material'
import Text from '@/components/Text'

export interface DebugPanelProps {
  data: Record<string, unknown>
}

export function DebugPanel({ data }: DebugPanelProps) {
  return (
    <Box sx={{ mt: 4, textAlign: 'left' }}>
      <Text message="Debug Information" />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Box>
  )
}

export default DebugPanel
