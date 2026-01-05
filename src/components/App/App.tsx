import {
  Container,
  Box,
  Typography,
  Button,
  LinearProgress,
  TextField,
  CircularProgress,
} from '@mui/material'

import './App.css'
import { useEncode } from '@/hooks/useEncode'

export function App() {
  const {
    file,
    isChunking,
    isEncoding,
    hasEncoded,
    encodingProgress,
    hash,
    error,
    currentChunk,
    fileChunks,
    handleFileSelect,
    setIsChunking,
  } = useEncode()

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography
          data-testid="heading"
          variant="h2"
          component="h1"
          sx={{ mb: 2 }}
        >
          Sha256 Encoder
        </Typography>
        {!isChunking && !isEncoding && (
          <input
            type="file"
            data-testid="file-input"
            onChange={(e) => {
              handleFileSelect(e)
            }}
          />
        )}
        {!isChunking && !isEncoding && (
          <Button
            data-testid="encode-button"
            variant="contained"
            onClick={() => setIsChunking(true)}
            sx={{ mb: 2 }}
          >
            Encode file
          </Button>
        )}
        {isChunking && <CircularProgress data-testid="chunking-progress" />}
        {isEncoding && (
          <LinearProgress
            data-testid="encode-progress"
            variant="determinate"
            value={encodingProgress}
          />
        )}
        {hasEncoded && (
          <Typography variant="h6" component="p" data-testid="encode-success">
            File encoded successfully {hash}
          </Typography>
        )}
        {error && (
          <Typography color="error" data-testid="encode-error">
            {error}
          </Typography>
        )}
        <TextField
          label="Test entering text here :-)"
          variant="outlined"
          multiline
          rows={4}
          sx={{ mt: 2 }}
        />
        <Box sx={{ mt: 4, textAlign: 'left' }}>
          <Typography variant="h2">Debugger</Typography>
          <pre data-testid="debug-info">
            {JSON.stringify(
              {
                file: file ? { name: file.name, size: file.size } : null,
                isChunking,
                hasEncoded,
                encodingProgress,
                error,
                currentChunk,
                totalChunks: fileChunks.length,
                fileChunks: fileChunks.map((chunk, index) => ({
                  index,
                  size: chunk.size,
                })),
              },
              null,
              2
            )}
          </pre>
        </Box>
      </Box>
    </Container>
  )
}

export default App
