import React from 'react';

const NewsFlash = ({ items = [], className = '', showViewAll = false }) => {
  return (
    <div className={`bg-surface-container-lowest p-8 rounded-2xl shadow-md border border-outline-variant/10 ${className}`}>
      <h3 className="font-headline text-2xl font-bold mb-8 text-primary flex items-center gap-3">
        <span className="material-symbols-outlined text-secondary">bolt</span> Tin vắn 24h
      </h3>
      <div className="space-y-8">
        {items.map((item, i) => (
          <div key={i} className="group cursor-pointer relative pl-6 border-l-2 border-primary/10 hover:border-primary transition-colors">
            <p className="text-[10px] text-outline font-bold uppercase mb-2 tracking-widest">{item.time}</p>
            <h5 className="font-body text-sm font-semibold text-on-surface group-hover:text-primary transition-colors leading-relaxed">{item.title}</h5>
          </div>
        ))}
      </div>
      {showViewAll && (
        <button className="w-full mt-10 py-3.5 border border-outline-variant text-primary font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-primary hover:text-white transition-all">
          Xem tất cả tin vắn
        </button>
      )}
    </div>
  );
};

export default NewsFlash;
