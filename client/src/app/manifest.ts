import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ProQ Noti',
    short_name: 'ProQ',
    description: '프로들의 협곡을 실시간으로',
    start_url: '/userpage',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: '/android-192x192.png',
        sizes: '192x192',
        purpose: 'monochrome'
      }
    ]
  };
}
