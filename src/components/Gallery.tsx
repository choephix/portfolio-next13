import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { GalleryBackground } from './GalleryBackground';
import { GalleryThumbsSlider } from './GalleryThumbsSlider';

export type GalleryProps = {
  name: string;
  altname: string;
  description: string;
  backgroundImages: string[];
  // thumbImages: string[];
};

const GalleryTitleDiv = styled.h1`
  font-size: 48px;
  font-weight: bolder;
  margin: 0px;
  padding: 0px;

  color: #fff;
  -webkit-text-stroke: 2px black;
`;

const GalleryDescrDiv = styled(ReactMarkdown)`
  font-size: 16px;
  font-weight: bolder;
  margin: 0px;
  padding: 1px 12px;

  color: #fff;
  -webkit-text-stroke: 0.5px black;
  background: #0007;
`;

/* A React component that is using the useState and useEffect hooks to create a gallery of images that
will scroll through the images every 3 seconds. */
export const Gallery = (props: GalleryProps) => {
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
        // background: 'skyblue',
      }}
      title={props.altname}
    >
      <GalleryBackground images={props.backgroundImages} />

      <div style={{ position: 'absolute', top: '0px', left: '0px' }}>
        <GalleryTitleDiv>{props.name}</GalleryTitleDiv>
        {props.description && <GalleryDescrDiv>{props.description}</GalleryDescrDiv>}
      </div>

      <GalleryThumbsSlider images={images} />
    </div>
  );
};

export default Gallery;
