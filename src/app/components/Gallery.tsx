import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { GalleryBackground } from './GalleryBackground';

/**
 * Thumb image with rounded corners (12px) and a height of 120px.
 * Margin is 0.5rem.
 */
const Thumb = styled.img`
  height: 160px;
  width: auto;
  border-radius: 12px;
  margin: 0.5rem;
  box-shadow: 0 0 24px 0px rgba(0, 0, 0, 0.3);
`;

const ThumbStrip = styled.div`
  display: flex;
  animation: scrolling-images 30s linear infinite;
  width: 100%;
  margin: 24px 0px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

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
    setImages([...imgs, ...imgs, ...imgs]);
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
      <GallerySlider images={images} />
    </div>
  );
};

/**
 *
 */
function GallerySlider(props: { images: string[] }) {
  const { images } = props;

  images.push(...images);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(
    function () {
      let handle = -1;

      console.log('ref.current', ref.current);

      function loop() {
        // const { scrollLeft, scrollWidth } = ref.current;
        // ref.current.scrollLeft += 1;
        handle = requestAnimationFrame(loop);

        // @ts-ignore
        window.__00__ = ref.current.scrollLeft;
      }

      if (ref.current) {
        loop();
        return () => cancelAnimationFrame(handle);
      }
    },
    [ref.current]
  );

  return (
    <div
      className='image-list'
      style={{
        position: 'absolute',
        bottom: '0px',
        left: '0px',
        right: '0px',
        overflow: 'hidden',
      }}
    >
      <ThumbStrip ref={ref}>
        {images.map((image, index) => (
          <Thumb key={index} src={image} alt={`image${index}`} style={{}} />
        ))}
      </ThumbStrip>
    </div>
  );
}

export default Gallery;
