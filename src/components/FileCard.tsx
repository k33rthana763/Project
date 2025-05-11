import React from 'react';
import { File } from '../contexts/FileContext';
import { Download, Share2, Trash2 } from 'lucide-react';

interface FileCardProps {
  file: File;
}

const FileCard: React.FC<FileCardProps> = ({ file }) => {
  // Format file size to human-readable format
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format file date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Get icon based on file type
  const getFileIcon = () => {
    const iconMap: Record<string, string> = {
      pdf: '📄',
      doc: '📝',
      docx: '📝',
      xls: '📊',
      xlsx: '📊',
      ppt: '📊',
      pptx: '📊',
      jpg: '🖼️',
      jpeg: '🖼️',
      png: '🖼️',
      gif: '🖼️',
      mp4: '🎬',
      mp3: '🎵',
      zip: '📦',
      rar: '📦',
    };
    
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    return iconMap[extension] || '📄';
  };

  return (
    <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors group">
      <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-lg">
        {getFileIcon()}
      </div>
      
      <div className="ml-3 flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-800 truncate">{file.name}</h3>
        <div className="flex items-center text-xs text-gray-500 mt-0.5">
          <span>{formatFileSize(file.size)}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(file.uploaded)}</span>
          {file.shared && (
            <>
              <span className="mx-2">•</span>
              <span className="flex items-center text-blue-600">
                <Share2 size={12} className="mr-1" />
                Shared
              </span>
            </>
          )}
        </div>
      </div>
      
      <div className="ml-4 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1 rounded text-gray-600 hover:bg-gray-100" title="Download">
          <Download size={16} />
        </button>
        <button className="p-1 rounded text-gray-600 hover:bg-gray-100" title="Share">
          <Share2 size={16} />
        </button>
        <button className="p-1 rounded text-gray-600 hover:bg-gray-100" title="Delete">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default FileCard;