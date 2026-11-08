'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
export type Photo = { id: string; title: string; album: string; src: string };

export default function PhotoGallery({photos, unavailable, manageUrl}: {photos: Photo[]; unavailable: boolean; manageUrl: string}) {
  const [album, setAlbum] = useState('All photos');
  const [query, setQuery] = useState('');
  const [color, setColor] = useState(false);
  const [selected, setSelected] = useState<Photo | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const albums = useMemo(() => ['All photos', ...Array.from(new Set(photos.map(p => p.album)))], [photos]);
  const filtered = photos.filter(p => (album === 'All photos' || p.album === album) && `${p.title} ${p.album}`.toLowerCase().includes(query.toLowerCase()));
  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (selected) {
      if (!node.open) node.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = previous; };
    }
    if (node.open) node.close();
    trigger.current?.focus();
    return undefined;
  }, [selected]);
  function step(direction: number) {
    if (!selected || !filtered.length) return;
    const index = filtered.findIndex(p => p.id === selected.id);
    setSelected(filtered[(index + direction + filtered.length) % filtered.length]);
  }
  return <main id="main" className={'jd-photos ' + (color ? 'jd-photos-color' : '')}>
    <header className="jd-photos-heading">
      <div><p className="jd-photos-kicker"><span aria-hidden="true">✱</span> Photo journal</p><h1>Life, as it happens.</h1><p className="jd-photos-intro">A few things worth keeping.</p></div>
      <div className="jd-photos-actions"><a href={manageUrl}>Manage photos <span aria-hidden="true">↗</span></a><p>{String(photos.length).padStart(2,'0')} photographs</p></div>
    </header>
    {unavailable && <p className="jd-photos-notice" role="status">The latest photos could not load. Showing the original collection. <a href="/photos">Try again</a></p>}
    <div className="jd-photos-tools"><div className="jd-photos-tabs" role="group" aria-label="Photo albums">{albums.map(a => <button key={a} aria-pressed={album === a} onClick={() => setAlbum(a)}>{a}<small>{(a === 'All photos' ? photos : photos.filter(p => p.album === a)).length}</small></button>)}</div><label className="jd-photos-search"><span aria-hidden="true">⌕</span><input aria-label="Search photos" placeholder="Find a moment…" value={query} onChange={e => setQuery(e.target.value)} /></label></div>
    <div className="jd-photos-subbar"><p>{album === 'All photos' ? 'The collection' : album} / {String(filtered.length).padStart(2,'0')}</p><button aria-pressed={color} onClick={() => setColor(!color)}>{color ? 'Color' : 'Black & white'}</button></div>
    <section className="jd-photos-grid" aria-label="Photographs">{filtered.map((p,i) => <article className="jd-photo-card" key={p.id}><button className="jd-photo-image" aria-label={`View ${p.title}`} onClick={e => { trigger.current = e.currentTarget; setSelected(p); }}><img src={p.src} alt={p.title} loading={i > 1 ? 'lazy' : 'eager'} /><span>View photograph +</span></button><div className="jd-photo-caption"><div><h2>{p.title}</h2><p>{p.album}</p></div><span>{String(i+1).padStart(2,'0')}</span></div></article>)}</section>
    {!filtered.length && <div className="jd-photos-empty"><h2>No moments here yet.</h2><p>Try another search or album.</p><button onClick={() => {setQuery(''); setAlbum('All photos');}}>Show all photos</button></div>}
    <footer className="jd-photos-end"><span>The small things, kept.</span><span aria-hidden="true">✱</span><a href="#main">Back to top</a></footer>
    <dialog ref={dialog} className="jd-photo-dialog" aria-labelledby="photo-title" onCancel={() => setSelected(null)} onClose={() => setSelected(null)} onClick={e => {if(e.target === e.currentTarget) setSelected(null);}} onKeyDown={e => {if(e.key === 'ArrowLeft'){e.preventDefault(); step(-1);} if(e.key === 'ArrowRight'){e.preventDefault(); step(1);}}}>
      {selected && <div className="jd-photo-dialog-inner"><button className="jd-photo-close" aria-label="Close photo" onClick={() => setSelected(null)}>✕</button><div className="jd-photo-full"><img src={selected.src} alt={selected.title} /></div><div className="jd-photo-dialog-info"><div><h2 id="photo-title">{selected.title}</h2><p>{selected.album}</p></div><div className="jd-photo-steps"><button aria-label="Previous photo" disabled={filtered.length < 2} onClick={() => step(-1)}>←</button><button aria-label="Next photo" disabled={filtered.length < 2} onClick={() => step(1)}>→</button></div></div></div>}
    </dialog>
  </main>;
}
