import React from 'react';
import { PieChart, FolderOpen, Image, FileText, Film, Music, Package } from 'lucide-react';

const StorageUsage: React.FC = () => {
  // Demo storage data
  const storageData = {
    total: 15, // GB
    used: 5.7, // GB
    categories: [
      { name: 'Documents', size: 1.2, icon: <FileText size={16} className="text-blue-500" />, color: 'bg-blue-500' },
      { name: 'Images', size: 2.3, icon: <Image size={16} className="text-purple-500" />, color: 'bg-purple-500' },
      { name: 'Videos', size: 1.5, icon: <Film size={16} className="text-teal-500" />, color: 'bg-teal-500' },
      { name: 'Audio', size: 0.4, icon: <Music size={16} className="text-amber-500" />, color: 'bg-amber-500' },
      { name: 'Archives', size: 0.3, icon: <Package size={16} className="text-rose-500" />, color: 'bg-rose-500' },
    ]
  };

  const usedPercentage = (storageData.used / storageData.total) * 100;
  const remaining = storageData.total - storageData.used;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <PieChart size={20} className="text-blue-600" />
          <h3 className="font-medium">Storage Overview</h3>
        </div>
        <span className="text-sm text-gray-500">15 GB Plan</span>
      </div>

      {/* Usage Circle */}
      <div className="relative w-40 h-40 mx-auto">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="none" 
            stroke="#e5e7eb" 
            strokeWidth="10"
          />
          
          {/* Progress circle - using strokeDasharray and strokeDashoffset to create partial circle */}
          <circle 
            cx="50" 
            cy="50" 
            r="40"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="10"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (251.2 * usedPercentage / 100)}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold">{Math.round(usedPercentage)}%</span>
          <span className="text-sm text-gray-500">Used</span>
        </div>
      </div>

      <div className="flex justify-between text-sm">
        <div>
          <div className="text-gray-500">Used</div>
          <div className="font-medium">{storageData.used} GB</div>
        </div>
        <div>
          <div className="text-gray-500">Total</div>
          <div className="font-medium">{storageData.total} GB</div>
        </div>
        <div>
          <div className="text-gray-500">Free</div>
          <div className="font-medium">{remaining.toFixed(1)} GB</div>
        </div>
      </div>

      {/* File Type Breakdown */}
      <div className="space-y-3 pt-2">
        <h4 className="font-medium text-sm text-gray-600">Storage Breakdown</h4>
        
        {storageData.categories.map((category, index) => (
          <div key={index} className="flex items-center">
            <div className="mr-3">{category.icon}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">{category.name}</span>
                <span className="text-sm text-gray-500">{category.size} GB</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className={`${category.color} h-1.5 rounded-full`} style={{ width: `${(category.size / storageData.used) * 100}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-2 px-4 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm font-medium transition-colors">
        Upgrade Storage
      </button>
    </div>
  );
};

export default StorageUsage;