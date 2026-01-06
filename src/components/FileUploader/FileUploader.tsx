export interface FileUploaderProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  dataTestId?: string
}

export function FileUploader({
  onChange,
  dataTestId = 'file-input',
}: FileUploaderProps) {
  return <input type="file" data-testid={dataTestId} onChange={onChange} />
}

export default FileUploader
