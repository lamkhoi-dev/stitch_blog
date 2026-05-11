import React from 'react';

const FilterBar = ({ 
  categories = ['Thị trường', 'Công nghệ', 'Chính sách', 'Giá cước', 'Bền vững'], 
  activeCategory = 'Tất cả', 
  onSelect 
}) => {
  return (
    <section className="bg-surface-container-low py-6 px-8 border-b border-outline-variant/10">
      <div className="max-w-screen-2xl mx-auto flex flex-wrap justify-center gap-3">
        <button 
          onClick={() => onSelect && onSelect('Tất cả')}
          className={`px-5 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase border transition-all ${
            activeCategory === 'Tất cả' 
              ? 'bg-secondary-container text-on-secondary-container border-transparent hover:border-on-secondary-container' 
              : 'bg-surface-container-highest text-on-surface border-transparent hover:bg-primary-container hover:text-white'
          }`}
        >
          Tất cả
        </button>
        
        {categories.map(category => (
          <button 
            key={category} 
            onClick={() => onSelect && onSelect(category)}
            className={`px-5 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase border transition-all ${
              activeCategory === category 
                ? 'bg-secondary-container text-on-secondary-container border-transparent hover:border-on-secondary-container' 
                : 'bg-surface-container-highest text-on-surface border-transparent hover:bg-primary-container hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
};

export default FilterBar;
