import { useEffect, useEffectEvent, useState } from 'react'
import {
  Container,
  Box,
  Typography,
  Button,
  LinearProgress,
  TextField,
  CircularProgress,
} from '@mui/material'
import { createSHA256 } from 'hash-wasm'
import './App.css'

export function App() {
  const [file, setFile] = useState<File | null>(null)
  const [isChunking, setIsChunking] = useState(false)
  const [fileChunks, setFileChunks] = useState<File[]>([])
  const [currentChunk, setCurrentChunk] = useState(0)

  const [isEncoding, setIsEncoding] = useState(false)
  const [hasEncoded, setHasEncoded] = useState(false)
  const [encodingProgress, setEncodingProgress] = useState(0)

  const [hash, setHash] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null
    setFile(selectedFile)
    setHasEncoded(false)
    setEncodingProgress(0)
    setError(null)
  }

  const handleEncoded = () => {
    setIsChunking(false)
    setHasEncoded(true)
  }

  const handleChunkEncoded = (chunkIndex: number) => {
    const totalChunks = fileChunks.length
    const newProgress = Math.floor(((chunkIndex + 1) / totalChunks) * 100)
    console.log('Encoding progress:', newProgress, '%')
    setEncodingProgress(newProgress)

    if (newProgress >= 100) {
      handleEncoded()
    }
  }

  const handleSetFileChunks = useEffectEvent((chunks: File[]) => {
    setFileChunks(chunks)
    setIsChunking(false)
    setIsEncoding(true)
    console.log('File chunked into', chunks.length, 'chunks')
  })

  const handleError = useEffectEvent((errorMessage: string) => {
    setIsChunking(false)
    setIsEncoding(false)
    setError(errorMessage)
  })

  const handleEncodeChunks = useEffectEvent(async () => {
    const hasher = await createSHA256()
    hasher.init()

    for (let i = 0; i < fileChunks.length; i++) {
      console.log('Encoding chunk: ', i + 1, ' of ', fileChunks.length)
      const chunk = fileChunks[i]
      setCurrentChunk(i)
      const chunkArrayBuffer = await chunk.arrayBuffer()
      const chunkUint8Array = new Uint8Array(chunkArrayBuffer)

      hasher.update(chunkUint8Array)
      handleChunkEncoded(i)
    }

    const finalHash = hasher.digest('hex')
    console.log('SHA-256 Hash:', finalHash)

    setHash(finalHash)
    setHasEncoded(true)
    setEncodingProgress(100)
    setIsEncoding(false)
  })

  useEffect(() => {
    if (isChunking) {
      if (file) {
        console.log('Starting chunking for file:', file.name)
        const chunkSize = 1024 * 1024 // 1MB
        const chunks: File[] = []

        for (let start = 0; start < file.size; start += chunkSize) {
          const end = Math.min(start + chunkSize, file.size)
          const chunk = file.slice(start, end)
          chunks.push(chunk as File)
        }
        handleSetFileChunks(chunks)
      } else {
        handleError('No file selected for encoding')
      }
    }
  }, [file, isChunking])

  useEffect(() => {
    if (isEncoding) {
      handleEncodeChunks().catch((err) => {
        const message = `Error during encoding: ${err instanceof Error ? err.message : String(err)}`
        console.error(message)
        handleError(message)
      })
    }
  }, [isEncoding, fileChunks])

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
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
