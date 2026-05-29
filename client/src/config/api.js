/** Empty string = same-origin (Docker nginx proxies /api and /uploads). */
export const API_URL = import.meta.env.VITE_API_URL ?? '';
