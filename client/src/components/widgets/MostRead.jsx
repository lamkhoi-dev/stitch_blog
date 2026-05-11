import React from 'react';

const MostRead = ({ items = [], className = '' }) => {
  return (
    <div className={`${className}`}>
      <h3 className="font-headline text-2xl font-bold mb-8 text-primary">Đọc nhiều nhất</h3>
      <div className="space-y-10">
        {items.map((item, i) => (
          <div key={i} className="flex gap-6 group cursor-pointer">
            <span className="font-headline text-5xl text-outline-variant/30 font-black italic shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h5 className="font-body text-sm font-bold text-on-surface mb-2 group-hover:underline leading-relaxed">
                {item.title}
              </h5>
              <p className="text-[10px] text-outline-variant font-medium tracking-wide uppercase">
                {item.meta || `Bởi ${item.author}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostRead;
