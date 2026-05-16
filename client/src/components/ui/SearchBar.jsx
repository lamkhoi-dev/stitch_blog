import React from 'react';

const SearchBar = ({ placeholder = "Tìm kiếm bài viết, báo cáo hoặc dữ liệu thị trường...", onSearch, onKeyDown, value }) => {
  return (
    <div className="w-full max-w-3xl relative">
      <input 
        className="w-full bg-white/10 border border-white/20 rounded-xl px-14 py-5 text-lg shadow-sm focus:ring-white/40 focus:border-white/40 text-white placeholder:text-white/50 backdrop-blur-sm" 
        placeholder={placeholder} 
        type="text"
        value={value}
        onChange={(e) => onSearch && onSearch(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-white/60 scale-125">search</span>
    </div>
  );
};

export default SearchBar;
