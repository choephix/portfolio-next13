import React, { useState, useEffect, useRef } from 'react';
import { GalleryBackground } from './GalleryBackground';
import { GalleryThumbsSlider } from './GalleryThumbsSlider';

/* A React component that is using the useState and useEffect hooks to create a gallery of images that
will scroll through the images every 3 seconds. */
const Gallery = () => {
  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

  const ref = useRef<any>(null);
  const [width, setWidth] = useState(0);
  React.useEffect(() => {
    const handleResize = () => setWidth(ref.current?.offsetWidth || 0);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [!!ref.current]);

  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    const imgs = [
      `https://picsum.photos/seed/${Math.random()}/400/300`,
      `https://picsum.photos/seed/${Math.random()}/200/300`,
      `https://picsum.photos/seed/${Math.random()}/400/300`,
      `https://picsum.photos/seed/${Math.random()}/400/300`,
      `https://picsum.photos/seed/${Math.random()}/500/300`,
    ];
    setImages(imgs);
  }, []);

  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

  return (
    <div
      ref={ref}
      className='gallery'
      style={{
        width: '100%',
        height: '400px',
        position: 'relative',
        background: 'skyblue',
      }}
    >
      <GalleryBackground />
      <GalleryThumbsSlider images={images} />
    </div>
  );
};

export default Gallery;
