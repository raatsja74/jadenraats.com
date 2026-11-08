import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import PhotoGallery, { type Photo } from './photo-gallery';

const LIBRARY = 'https://jadenraats-field-notes-private.jadenraats74.chatgpt.site';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Photos | Jaden Raats',
  description: 'A personal photo journal by Jaden Raats.',
  alternates: { canonical: '/photos' },
  openGraph: { title: 'Photos | Jaden Raats', description: 'A personal photo journal by Jaden Raats.', url: 'https://jadenraats.com/photos' },
};

export default async function PhotosPage() {
  const photos: Photo[] = [{ id: 'kayak', title: 'A day on the water', album: 'Outdoors', src: `${LIBRARY}/media/jaden-kayaking.jpeg` }];
  let unavailable = false;
  try {
    // Public requests carry no visitor credentials. Drafts never leave the library.
    const response = await fetch(`${LIBRARY}/api/photos`, { cache: 'no-store', signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error('Photo library unavailable');
    const data: unknown = await response.json();
    if (!data || typeof data !== 'object' || !('photos' in data) || !Array.isArray(data.photos)) throw new Error('Invalid photo response');
    for (const value of data.photos) {
      if (!value || typeof value !== 'object' || value.published !== true || typeof value.id !== 'string' || !/^[a-zA-Z0-9-]{1,60}$/.test(value.id)) continue;
      if (typeof value.title !== 'string' || typeof value.album !== 'string') continue;
      photos.push({ id: value.id, title: value.title, album: value.album, src: `${LIBRARY}/api/photos/file/${value.id}` });
    }
  } catch { unavailable = true; }
  return <><Nav /><PhotoGallery photos={photos} unavailable={unavailable} manageUrl={`${LIBRARY}/photos`} /></>;
}
