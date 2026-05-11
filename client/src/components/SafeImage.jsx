/**
 * SafeImage — img tag with automatic fallback on error.
 * Prevents broken image icons from showing in the UI.
 */
const FALLBACK_BOOK = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=560&fit=crop';
const FALLBACK_ARTICLE = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop';
const FALLBACK_DOC = 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&h=300&fit=crop';

export const FALLBACKS = {
  book: FALLBACK_BOOK,
  article: FALLBACK_ARTICLE,
  document: FALLBACK_DOC,
};

/**
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text
 * @param {'book'|'article'|'document'} type - Determines fallback image
 * @param {string} className - CSS class string
 * @param {object} rest - Any other img props
 */
export default function SafeImage({ src, alt = '', type = 'article', className = '', ...rest }) {
  const fallback = FALLBACKS[type] || FALLBACK_ARTICLE;

  return (
    <img
      src={src || fallback}
      alt={alt}
      className={className}
      onError={(e) => {
        if (e.target.src !== fallback) {
          e.target.src = fallback;
        }
      }}
      {...rest}
    />
  );
}
