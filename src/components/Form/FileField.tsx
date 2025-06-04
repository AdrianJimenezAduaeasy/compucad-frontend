import React, { useState, useCallback, useEffect } from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { StoredFile } from '../../models/GoogleCloud/StoredFile';
import { deleteFile, uploadFiles } from '../../services/GoogleCLoud/StoredFile.service';
import { Alert, Snackbar } from '@mui/material';

interface FileIcon {
  name: string;
  icon: React.ReactNode;
  file: File | null;
  downloadURL?: string;
}

interface FileFieldProps {
  id: string;
  label: string;
  value?: number[];
  setValue: (fileIds: number[]) => void;
  type?: string;
  accept?: string;
  fileIconsOld?: StoredFile[];
}

function FileField({ id, label, setValue, type = "file", fileIconsOld, accept="image/*,application/pdf,application/xml" }: FileFieldProps) {
  const [fileIcons, setFileIcons] = useState<FileIcon[]>([]);
  const [storedFiles, setStoredFiles] = useState<StoredFile[]>(fileIconsOld || []);
  const [isDragging, setIsDragging] = useState(false);
  const [deleteFileStatus, setDeleteFileStatus] = useState(false);
  
  useEffect(() => {
    if (fileIconsOld) {
      const convertedOldIcons = fileIconsOld.map(file => ({
        name: file.fileName,
        icon: getFileIconFromName(file.fileName),
        file: null,
        downloadURL: file.downloadURL
      }));
      setFileIcons(prev => [...convertedOldIcons, ...prev]);
    }
  }, [fileIconsOld]);

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon style={{ color: '#3b82f6' }} />;
    } else if (file.type === 'application/pdf') {
      return <PictureAsPdfIcon style={{ color: '#ef4444' }} />;
    }
    return <InsertDriveFileIcon style={{ color: '#6b7280' }} />;
  };

  const getFileIconFromName = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <ImageIcon style={{ color: '#3b82f6' }} />;
      case 'pdf':
        return <PictureAsPdfIcon style={{ color: '#ef4444' }} />;
      case 'xml':
        return <InsertDriveFileIcon style={{ color: '#10b981' }} />;
      default:
        return <InsertDriveFileIcon style={{ color: '#6b7280' }} />;
    }
  };

  const processFiles = useCallback((files: FileList) => {
    const fileList = Array.from(files);
    const newIcons = fileList.map(file => ({
      name: file.name,
      icon: getFileIcon(file),
      file
    }));

    fileList.forEach(async file => {
      if (storedFiles.some(storedFile => storedFile.fileName === file.name)) {
        alert(`El archivo ${file.name} ya ha sido subido.`);
      } else if (file.size > 10 * 1024 * 1024) {
        alert(`El archivo ${file.name} excede el tamaño máximo de 10MB.`);
      } else {
        const res = await uploadFiles([file]);
        const nuevosArchivos = [...storedFiles, ...res];
        setStoredFiles(nuevosArchivos);
        setValue(nuevosArchivos.map(file => file.id));
      }
    });

    setFileIcons(prevIcons => [...prevIcons, ...newIcons]);
  }, [storedFiles, setValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const handleRemove = async (e: React.MouseEvent, fileName: string) => {
    e.preventDefault();
    e.stopPropagation();

    const storedToDelete = storedFiles.find(f => f.fileName === fileName);
    if (!storedToDelete) return;

    const res = await deleteFile(storedToDelete.id);
    if (res.status === 200) {
      setDeleteFileStatus(true);
      const updatedFiles = fileIcons.filter(file => file.name !== fileName);
      const updatedStoredFiles = storedFiles.filter(f => f.id !== storedToDelete.id);
      setFileIcons(updatedFiles);
      setStoredFiles(updatedStoredFiles);
      setValue(updatedStoredFiles.map(file => file.id));
    } else {
      alert(`Error al eliminar el archivo ${fileName}.`);
    }
  };

  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>, action: 'enter' | 'leave' | 'over' | 'drop') => {
    e.preventDefault();
    e.stopPropagation();

    switch (action) {
      case 'enter':
        setIsDragging(true);
        break;
      case 'leave':
        setIsDragging(false);
        break;
      case 'drop':
        setIsDragging(false);
        if (e.dataTransfer.files.length > 0) {
          processFiles(e.dataTransfer.files);
        }
        break;
    }
  };

  return (
    <div className="col-span-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2">
        {label}
      </label>

      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={(e) => handleDragEvents(e, 'enter')}
        onDragLeave={(e) => handleDragEvents(e, 'leave')}
        onDragOver={(e) => handleDragEvents(e, 'over')}
        onDrop={(e) => handleDragEvents(e, 'drop')}
      >
        <label htmlFor={id} className="block cursor-pointer">
          <div className="flex flex-col items-center justify-center space-y-2">
            <CloudUploadIcon className="text-gray-400 text-4xl" />
            <p className="text-sm text-gray-600">
              <span className="font-medium text-blue-600">Haz clic para subir</span> o arrastra y suelta
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, PDF, XML (MAX. 10MB)</p>
          </div>
        </label>
      </div>

      <input
        id={id}
        name={id}
        accept={accept}
        multiple
        type={type}
        onChange={handleChange}
        className="hidden"
      />

      {fileIcons.length > 0 && (
        <div className="mt-4 space-y-2">
          {fileIcons.map((file: FileIcon, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
              <div className="flex items-center space-x-2">
                {file.icon}
                <a 
                  href={file.downloadURL}
                  download={file.name}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  <span className="text-sm truncate max-w-xs">{file.name}</span>
                </a>
              </div>
              <button
                onClick={(e) => handleRemove(e, file.name)}
                className="text-red-500 hover:text-red-700 p-1"
                aria-label="Eliminar archivo"
                type="button"
              >
                <DeleteIcon fontSize="small" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Snackbar
        open={deleteFileStatus}
        autoHideDuration={6000}
        onClose={() => setDeleteFileStatus(false)}
      >
        <Alert severity="success" variant="filled" onClose={() => setDeleteFileStatus(false)}>
          El archivo se eliminó correctamente.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default FileField;
