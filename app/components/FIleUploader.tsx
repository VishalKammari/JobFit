import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { formatSize } from '../lib/utils'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {

    const [file, setFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selectedFile = acceptedFiles[0] || null;

        setFile(selectedFile);
        onFileSelect?.(selectedFile);

    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024;

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'application/pdf': ['.pdf']
        },
        maxSize: maxFileSize,
    });

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFile(null);
        onFileSelect?.(null);
    }

    return (
        <div className="w-full gradient-border">
            <div {...getRootProps()}>
                <input {...getInputProps()} />

                <div className="space-y-4 cursor-pointer">
                    {file ? (
                        <div className="uploader-selected-file">
                            <img src="/images/pdf.png" alt="pdf" className="size-10" />

                            <div>
                                <p>{file.name}</p>
                                <p>{formatSize(file.size)}</p>
                            </div>

                            <button
                                className="p-2 cursor-pointer"
                                onClick={handleRemove}
                            >
                                <img
                                    src="/icons/cross.svg"
                                    alt="remove"
                                    className="w-4 h-4"
                                />
                            </button>

                        </div>
                    ) : (
                        <div>
                            <p>Click to upload or drag and drop</p>
                            <p>PDF (max {formatSize(maxFileSize)})</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FileUploader