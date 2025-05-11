import React, { useState } from 'react';
import { useFiles, File } from '../contexts/FileContext';
import { 
  List, Grid, SlidersHorizontal, FileUp, 
  SortAsc, SortDesc, Search, Filter
} from 'lucide-react';
import FileCard from '../components/FileCard';
import FileGridItem from '../components/FileGridItem';

const Files = () => {
  const { files } = useFiles();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter files based on search query
  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort files based on sortBy and sortOrder
  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'date') {
      return sortOrder === 'asc'
        ? new Date(a.uploaded).getTime() - new Date(b.uploaded).getTime()
        : new Date(b.uploaded).getTime() - new Date(a.uploaded).getTime();
    } else { // size
      return sortOrder === 'asc' ? a.size - b.size : b.size - a.size;
    }
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortByChange = (value: 'name' | 'date' | 'size') => {
    if (sortBy === value) {
      toggleSortOrder();
    } else {
      setSortBy(value);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Files</h1>
          <p className="text-gray-600 mt-1">Manage and organize your files</p>
        </div>
        
        <button className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors sm:w-auto w-full">
          <FileUp size={18} className="mr-2" />
          Upload File
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input 
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                <Filter size={18} className="mr-1" />
                <span className="text-sm">Filter</span>
              </button>
            </div>
            
            <div className="relative">
              <button 
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
                onClick={toggleSortOrder}
              >
                {sortOrder === 'asc' ? (
                  <SortAsc size={18} className="mr-1" />
                ) : (
                  <SortDesc size={18} className="mr-1" />
                )}
                <span className="text-sm capitalize">{sortBy}</span>
              </button>
            </div>
            
            <div className="relative">
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                <SlidersHorizontal size={18} className="mr-1" />
              </button>
            </div>
            
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button 
                className={`px-3 py-2 ${view === 'list' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => setView('list')}
              >
                <List size={18} />
              </button>
              <button 
                className={`px-3 py-2 ${view === 'grid' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => setView('grid')}
              >
                <Grid size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Sort Options */}
        <div className="flex mt-4 border-t pt-4">
          <div className="text-sm text-gray-500 mr-4">Sort by:</div>
          {['name', 'date', 'size'].map((option) => (
            <button
              key={option}
              className={`mr-4 text-sm ${sortBy === option ? 'text-blue-600 font-medium' : 'text-gray-600'}`}
              onClick={() => handleSortByChange(option as 'name' | 'date' | 'size')}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
              {sortBy === option && (
                <span className="ml-1">
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* File List/Grid */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {sortedFiles.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FolderOpen size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-1">No files found</h3>
            <p className="text-gray-500">
              {searchQuery ? `No results for "${searchQuery}"` : "You haven't uploaded any files yet"}
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Upload Your First File
            </button>
          </div>
        ) : view === 'list' ? (
          <div className="divide-y">
            {sortedFiles.map(file => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedFiles.map(file => (
              <FileGridItem key={file.id} file={file} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Files;