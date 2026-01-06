import { Container, Box } from '@mui/material'

import './App.css'
import { useEncode } from '@/hooks/useEncode'
import FileUploader from '@/components/FileUploader'
import Button from '@/components/Button'
import ProgressIndicator from '@/components/ProgressBar'
import DebugPanel from '@/components/DebugPanel'
import Text from '@/components/Text'
import { Input } from '@/components/Input'

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
        <Text message="Sha256 Encoder" data-testid="heading" />
        {!isChunking && !isEncoding && (
          <FileUploader onChange={handleFileSelect} />
        )}
        {!isChunking && !isEncoding && (
          <Button
            onClick={() => setIsChunking(true)}
            dataTestId={'encode-button'}
            label="Encode"
          />
        )}
        {isEncoding && <ProgressIndicator progress={encodingProgress} />}
        {hasEncoded && (
          <Text
            message={`File encoded successfully ${hash}`}
            dataTestId="encode-success"
          />
        )}
        {error && <Text message={error} dataTestId="encode-error" />}
        <Input label={'Test entering text here :-)'} />
        <DebugPanel
          data={{
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
          }}
        />
      </Box>
    </Container>
  )
}

export default App
