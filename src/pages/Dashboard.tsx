import React from 'react';
import { useFiles } from '../contexts/FileContext';
import { FileUp, FolderOpen, Share2, Clock, Plus, MoreVertical } from 'lucide-react';
import FileCard from '../components/FileCard';
import StorageUsage from '../components/StorageUsage';

const Dashboard = () => {
  const { files } = useFiles();
  
  // Get recent files (last 3)
  const recentFiles = [...files].sort((a, b) => 
    new Date(b.uploaded).getTime() - new Date(a.uploaded).getTime()
  ).slice(0, 3);
  
  // Get shared files
  const sharedFiles = files.filter(file => file.shared).slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to your file manager</p>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <FileUp size={20} />, color: 'bg-blue-500', label: 'Upload Files' },
          { icon: <FolderOpen size={20} />, color: 'bg-purple-500', label: 'My Files' },
          { icon: <Share2 size={20} />, color: 'bg-teal-500', label: 'Shared Files' },
          { icon: <Clock size={20} />, color: 'bg-amber-500', label: 'Recent Files' }
        ].map((action, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className={`${action.color} text-white p-3 rounded-lg inline-flex mb-3`}>
              {action.icon}
            </div>
            <h3 className="font-medium">{action.label}</h3>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Files */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold text-gray-800">Recent Files</h2>
            <button className="text-blue-600 text-sm font-medium">View All</button>
          </div>
          <div className="p-4 space-y-2">
            {recentFiles.map(file => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        </div>
        
        {/* Storage Usage */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-800">Storage Usage</h2>
          </div>
          <div className="p-4">
            <StorageUsage />
          </div>
        </div>
      </div>
      
      {/* Shared with you */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-gray-800">Shared with You</h2>
          <button className="text-blue-600 text-sm font-medium">View All</button>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sharedFiles.map(file => (
              <div key={file.id} className="border rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 relative">
                  {file.preview ? (
                    <img src={file.preview} alt={file.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                      <FolderOpen size={48} />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 rounded-full bg-white shadow-sm text-gray-700 hover:bg-gray-100">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-800 truncate">{file.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(file.uploaded).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            
            <div className="border border-dashed rounded-lg overflow-hidden flex items-center justify-center p-6 h-full">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-3">
                  <Plus size={24} />
                </div>
                <p className="text-gray-700 font-medium">Upload More</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;