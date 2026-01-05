import { useEffect, useEffectEvent, useState } from 'react'
import {
  Container,
  Box,
  Typography,
  Button,
  LinearProgress,
} from '@mui/material'
import './App.css'

export function App() {
  const [progress, setProgress] = useState(0)
  const [isEncoding, setIsEncoding] = useState(false)
  const [hasEncoded, setHasEncoded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [fileChunks, setFileChunks] = useState<File[]>([])

  const handleEncoded = useEffectEvent(() => {
    setIsEncoding(false)
    setHasEncoded(true)
  })

  useEffect(() => {
    if (isEncoding && !hasEncoded) {
      let timer: NodeJS.Timeout
      if (progress < 100) {
        timer = setTimeout(() => {
          setProgress((prev) => Math.min(prev + 10, 100))
        }, 500)
      } else {
        handleEncoded()
      }
      return () => {
        if (timer) clearTimeout(timer)
      }
    }
  }, [hasEncoded, isEncoding, progress])

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
          Sha256 Encoder
        </Typography>
        {!hasEncoded && !isEncoding && (
          <Button
            data-testid="encode-button"
            variant="contained"
            onClick={() => setIsEncoding(true)}
            sx={{ mb: 2 }}
          >
            Encode file
          </Button>
        )}
        {isEncoding && (
          <LinearProgress
            data-testid="encode-progress"
            variant="determinate"
            value={progress}
          />
        )}
        {hasEncoded && (
          <Typography variant="h6" component="p" data-testid="encode-success">
            File encoded successfully!
          </Typography>
        )}
        {error && (
          <Typography color="error" data-testid="encode-error">
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  )
}

export default App
