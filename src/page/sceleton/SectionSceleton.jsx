import React from 'react';

export function SectionSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="h-8 bg-gray-300/60 rounded w-36 mb-6"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="flex flex-col gap-6 md:col-span-1">
          <div className="flex flex-col">
            <div className="w-full aspect-4/3 bg-gray-300/60 rounded-sm mb-3"></div>
            <div className="h-5 bg-gray-300/60 rounded w-1/3 mb-1.5"></div>
            <div className="h-3.5 bg-gray-300/60 rounded w-1/2"></div>
          </div>

          <div className="flex flex-col">
            <div className="w-full aspect-4/3 bg-gray-300/60 rounded-sm mb-3"></div>
            <div className="h-5 bg-gray-300/60 rounded w-1/3 mb-1.5"></div>
            <div className="h-3.5 bg-gray-300/60 rounded w-1/2"></div>
          </div>
        </div>

        <div className="flex flex-col md:col-span-2 justify-between">
          <div className="w-full h-full min-h-75 bg-gray-300/60 rounded-sm mb-3"></div>
          <div>
            <div className="h-5 bg-gray-300/60 rounded w-1/4 mb-1.5"></div>
            <div className="h-3.5 bg-gray-300/60 rounded w-1/3"></div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SectionSkeleton;