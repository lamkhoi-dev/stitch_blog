export const getImageUrl = (path) => {
  if (!path) return '/placeholder.jpg'; // default placeholder if no image
  
  // if it's already an absolute URL (http or https)
  if (path.startsWith('http')) {
    return path;
  }
  
  // if it's a relative path, prepend the backend base URL
  const baseUrl = import.meta.env.VITE_API_BASE_URL 
    ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') 
    : 'http://localhost:5001';
    
  return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
};
