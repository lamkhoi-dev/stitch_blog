import React from 'react';

const NewsletterSidebar = ({ className = '' }) => {
  return (
    <div className={`bg-[#0F3453] p-10 rounded-2xl text-white shadow-xl relative overflow-hidden ${className}`}>
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <span className="material-symbols-outlined text-[120px]">mail</span>
      </div>
      <div className="relative z-10">
        <h4 className="font-headline text-2xl font-bold mb-5 italic">Bản tin hàng tuần</h4>
        <p className="text-sm text-white/70 mb-8 leading-relaxed">
          Nhận những phân tích sâu nhất về thị trường trực tiếp vào hộp thư của bạn vào mỗi sáng thứ Hai.
        </p>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input 
            className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-sm placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white transition-all text-white" 
            placeholder="Email của bạn" 
            type="email"
          />
          <button 
            className="w-full bg-white text-[#0F3453] font-bold py-4 rounded-lg text-sm uppercase tracking-wider hover:bg-secondary-container transition-colors shadow-md" 
            type="submit"
          >
            Đăng ký ngay
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSidebar;
