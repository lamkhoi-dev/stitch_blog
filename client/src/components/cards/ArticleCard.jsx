import React from 'react';
import { Link } from 'react-router-dom';

const FALLBACK = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop';
const handleImgError = (e) => { if (e.target.src !== FALLBACK) e.target.src = FALLBACK; };

const ArticleCard = ({ article, variant = 'horizontal' }) => {
  const {
    tag,
    title,
    desc,
    img,
    author,
    date,
    link = '#',
  } = article;

  if (variant === 'featured') {
    return (
      <div className="group bg-white p-5 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="aspect-[16/9] overflow-hidden mb-8 rounded-sm">
          <Link to={link}>
            <img alt={tag || title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={img} onError={handleImgError} />
          </Link>
        </div>
        <div className="flex items-center gap-3 mb-5">
          {tag && <span className="text-xs font-bold text-tertiary-container bg-tertiary-fixed-dim px-3 py-1 rounded-sm uppercase tracking-wider">{tag}</span>}
          {date && <span className="text-xs text-outline italic">{date}</span>}
        </div>
        <Link to={link}>
          <h3 className="text-3xl serif font-bold text-primary mb-5 leading-tight group-hover:text-secondary transition-colors">{title}</h3>
        </Link>
        {desc && <p className="text-on-surface-variant text-lg leading-relaxed mb-6">{desc}</p>}
        <div className="mt-auto">
          <Link to={link} className="text-primary font-bold border-b border-primary/30 pb-1 hover:border-primary transition-all inline-block">Đọc bài viết đầy đủ</Link>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="group bg-white p-4 rounded-sm shadow-sm hover:shadow-lg transition-all flex gap-4">
        <div className="w-32 h-24 flex-shrink-0 overflow-hidden rounded-sm">
          <Link to={link}>
            <img alt={tag || title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={img} onError={handleImgError} />
          </Link>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            {tag && <span className="text-[10px] font-bold text-tertiary-container bg-tertiary-fixed-dim px-1.5 py-0.5 rounded-sm uppercase">{tag}</span>}
            {date && <span className="text-[10px] text-outline italic">{date}</span>}
          </div>
          <Link to={link}>
            <h4 className="text-base font-bold text-primary leading-tight group-hover:text-secondary transition-colors line-clamp-2">{title}</h4>
          </Link>
        </div>
      </div>
    );
  }

  // Default: horizontal
  return (
    <article className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center group">
      <div className="md:col-span-5 rounded-xl overflow-hidden shadow-lg aspect-square border border-outline-variant/10">
        <Link to={link}>
          <img alt={tag || title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={img} onError={handleImgError} />
        </Link>
      </div>
      <div className="md:col-span-7">
        {tag && <span className="text-xs font-bold text-secondary tracking-widest uppercase mb-4 block">{tag}</span>}
        <Link to={link}>
          <h4 className="font-headline text-2xl font-bold mb-5 text-primary group-hover:text-primary-container transition-colors leading-snug">{title}</h4>
        </Link>
        {desc && <p className="font-body text-on-surface-variant text-sm mb-8 leading-relaxed line-clamp-3">{desc}</p>}
        <div className="flex items-center justify-between pt-6 border-t border-outline-variant/20">
          {author && <span className="text-outline text-xs italic font-medium">Tác giả: {author}</span>}
          <Link className="text-primary font-bold text-sm flex items-center gap-1.5 hover:underline" to={link}>
            Đọc tiếp <span className="material-symbols-outlined text-sm">open_in_new</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
