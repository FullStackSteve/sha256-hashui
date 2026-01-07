import { useEffect, useEffectEvent, useState } from 'react'
import { createSHA256 } from 'hash-wasm'

export function useEncode() {
  const [file, setFile] = useState<File | null>(null)
  const [isChunking, setIsChunking] = useState<boolean>(false)
  const [fileChunks, setFileChunks] = useState<File[]>([])
  const [currentChunk, setCurrentChunk] = useState<number>(0)

  const [isEncoding, setIsEncoding] = useState<boolean>(false)
  const [hasEncoded, setHasEncoded] = useState<boolean>(false)
  const [encodingProgress, setEncodingProgress] = useState<number>(0)
  const [hash, setHash] = useState<string>('')
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
    setHasEncoded(false)
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

  return {
    file,
    setFile,
    isChunking,
    setIsChunking,
    fileChunks,
    isEncoding,
    hasEncoded,
    encodingProgress,
    hash,
    error,
    currentChunk,
    handleFileSelect,
  }
}
