import React from 'react';
import { useFiles } from '../contexts/FileContext';
import FileGridItem from '../components/FileGridItem';
import { Users, Link, Lock } from 'lucide-react';

const SharedFiles = () => {
  const { getSharedFiles } = useFiles();
  const sharedFiles = getSharedFiles();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Shared Files</h1>
        <p className="text-gray-600 mt-1">Files you have shared with others</p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { 
            icon: <Users size={20} className="text-purple-500" />, 
            label: 'Shared with Others', 
            value: sharedFiles.length,
            description: 'Files you shared' 
          },
          { 
            icon: <Link size={20} className="text-teal-500" />, 
            label: 'Public Links', 
            value: Math.floor(sharedFiles.length * 0.6),
            description: 'Anyone with the link' 
          },
          { 
            icon: <Lock size={20} className="text-blue-500" />, 
            label: 'Private Shares', 
            value: Math.ceil(sharedFiles.length * 0.4),
            description: 'Only specific people' 
          }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center mb-3">
              <div className="mr-3">{stat.icon}</div>
              <h3 className="font-medium text-gray-700">{stat.label}</h3>
            </div>
            <div className="flex items-end">
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className="ml-2 text-sm text-gray-500">{stat.description}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Shared Files */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-gray-800">Files You've Shared</h2>
        </div>
        
        {sharedFiles.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Share2 size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-1">No shared files found</h3>
            <p className="text-gray-500">
              You haven't shared any files yet. Share a file to see it here.
            </p>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sharedFiles.map(file => (
              <FileGridItem key={file.id} file={file} />
            ))}
          </div>
        )}
      </div>
      
      {/* Sharing Options */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-gray-800">Sharing Options</h2>
        </div>
        
        <div className="p-4">
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mr-3">
                  <Link size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Create Shareable Link</h3>
                  <p className="text-sm text-gray-500">
                    Generate a link that allows anyone to access your file
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 mr-3">
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Invite Specific People</h3>
                  <p className="text-sm text-gray-500">
                    Share with specific email addresses with custom permissions
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-500 mr-3">
                  <Lock size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Set Password Protection</h3>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security with password protection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedFiles;