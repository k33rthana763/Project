import React from 'react';
import { File } from '../contexts/FileContext';
import { FileText, Image, Film, Music, Package, MoreVertical, Download, Share2, Trash2 } from 'lucide-react';

interface FileGridItemProps {
  file: File;
}

const FileGridItem: React.FC<FileGridItemProps> = ({ file }) => {
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

  // Get file icon based on file type
  const getFileIcon = () => {
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) {
      return <Image size={36} className="text-purple-500" />;
    } else if (['mp4', 'mov', 'avi', 'webm'].includes(extension)) {
      return <Film size={36} className="text-teal-500" />;
    } else if (['mp3', 'wav', 'ogg', 'flac'].includes(extension)) {
      return <Music size={36} className="text-amber-500" />;
    } else if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
      return <Package size={36} className="text-rose-500" />;
    } else {
      return <FileText size={36} className="text-blue-500" />;
    }
  };

  const [showActions, setShowActions] = useState(false);

  return (
    <div 
      className="border rounded-lg overflow-hidden group hover:shadow-md transition-shadow" 
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="aspect-square bg-gray-50 flex items-center justify-center relative">
        {file.preview ? (
          <img src={file.preview} alt={file.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center">
            {getFileIcon()}
            <div className="mt-2 text-xs text-gray-500 uppercase font-medium">
              {file.name.split('.').pop()}
            </div>
          </div>
        )}
        
        {/* Overlay actions */}
        {showActions && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-2">
            <button className="p-2 rounded-full bg-white text-gray-700 hover:bg-gray-100">
              <Download size={18} />
            </button>
            <button className="p-2 rounded-full bg-white text-gray-700 hover:bg-gray-100">
              <Share2 size={18} />
            </button>
            <button className="p-2 rounded-full bg-white text-gray-700 hover:bg-gray-100">
              <Trash2 size={18} />
            </button>
          </div>
        )}
        
        {/* More options */}
        <button className="absolute top-2 right-2 p-1 rounded-full bg-white shadow text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical size={16} />
        </button>
        
        {/* Shared indicator */}
        {file.shared && (
          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
            Shared
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-gray-800 truncate" title={file.name}>
          {file.name}
        </h3>
        <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
          <span>{formatFileSize(file.size)}</span>
          <span>{formatDate(file.uploaded)}</span>
        </div>
      </div>
    </div>
  );
};

export default FileGridItem;