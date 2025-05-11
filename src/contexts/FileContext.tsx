import React, { createContext, useContext, useState } from 'react';

// File types
export interface File {
  id: string;
  name: string;
  type: string;
  size: number;
  uploaded: string;
  shared: boolean;
  owner: string;
  preview?: string;
}

interface FileContextType {
  files: File[];
  uploadFile: (file: File) => void;
  deleteFile: (id: string) => void;
  shareFile: (id: string) => void;
  getSharedFiles: () => File[];
}

const FileContext = createContext<FileContextType | undefined>(undefined);

// Demo files
const demoFiles: File[] = [
  {
    id: '1',
    name: 'Project Proposal.pdf',
    type: 'pdf',
    size: 2500000,
    uploaded: '2025-02-15T14:48:00',
    shared: true,
    owner: '1',
    preview: 'https://images.pexels.com/photos/1981473/pexels-photo-1981473.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '2',
    name: 'Financial Report Q1.xlsx',
    type: 'xlsx',
    size: 1800000,
    uploaded: '2025-02-10T09:30:00',
    shared: false,
    owner: '1',
  },
  {
    id: '3',
    name: 'Team Photo.jpg',
    type: 'jpg',
    size: 4200000,
    uploaded: '2025-02-05T16:20:00',
    shared: true,
    owner: '1',
    preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '4',
    name: 'Product Roadmap.pptx',
    type: 'pptx',
    size: 3500000,
    uploaded: '2025-01-28T11:15:00',
    shared: false,
    owner: '1',
  },
  {
    id: '5',
    name: 'Meeting Notes.docx',
    type: 'docx',
    size: 500000,
    uploaded: '2025-01-22T15:45:00',
    shared: true,
    owner: '1',
  },
];

export const FileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<File[]>(demoFiles);

  const uploadFile = (file: File) => {
    setFiles((prev) => [...prev, file]);
  };

  const deleteFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const shareFile = (id: string) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === id ? { ...file, shared: !file.shared } : file
      )
    );
  };

  const getSharedFiles = () => {
    return files.filter((file) => file.shared);
  };

  return (
    <FileContext.Provider value={{ files, uploadFile, deleteFile, shareFile, getSharedFiles }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFiles must be used within a FileProvider');
  }
  return context;
};