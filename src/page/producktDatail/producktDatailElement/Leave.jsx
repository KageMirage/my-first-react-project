import React from 'react';
import { Link } from 'react-router-dom';

function HomeButton() {
  return (
    <div className="flex items-center gap-2 text-[#1a1a1a] text-base py-4 font-sans w-full pl-12">
      
      <Link to="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 1L1 7L7 13" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>На главную</span>
      </Link>

      <span className="text-gray-400 font-bold">•</span>

      <span className="underline font-medium">
        Каталог
      </span>

    </div>
  );
}

export default HomeButton;