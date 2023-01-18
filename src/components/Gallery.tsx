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
  thumbImages: string[];
  thumbImagesExtra: string[];
};

const GalleryTitleDiv = styled.h1`
  font-size: 36px;
  font-weight: bolder;
  margin: 0px;
  padding: 0px 24px;

  color: #fff;
  -webkit-text-stroke: 1px black;
`;

const GalleryDescrDiv = styled(ReactMarkdown)`
  font-size: 16px;
  font-weight: bolder;

  margin: 20px 0px;
  padding: 1px 12px;

  width: 60%;

  color: #fff;
  -webkit-text-stroke: 0.5px black;
  background: #0007;

  opacity: 0;
  transform: translateX(-24px);
  transition: opacity 0.3s linear, transform 0.3s linear;
  *:hover > * > & {
    opacity: 1;
    transform: translateX(0%);
    transition: opacity 0.2s linear, transform 0.2s linear;
  }
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

  if (props.thumbImages.length < 1) {
    props.thumbImages.push(
      `https://picsum.photos/seed/${Math.random()}/400/300`,
      `https://picsum.photos/seed/${Math.random()}/200/300`,
      `https://picsum.photos/seed/${Math.random()}/400/300`,
      `https://picsum.photos/seed/${Math.random()}/400/300`,
      `https://picsum.photos/seed/${Math.random()}/500/300`
    );
  }

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

      <GalleryThumbsSlider
        images={props.thumbImagesExtra}
        scrollSpeed={0.5}
        style={{
          position: 'absolute',
          bottom: '100px',
          left: '0px',
          right: '0px',
        }}
      />

      <GalleryThumbsSlider
        images={props.thumbImages}
        style={{
          position: 'absolute',
          bottom: '0px',
          left: '0px',
          right: '0px',
        }}
      />

      <div style={{ position: 'absolute', top: '0px', left: '0%', right: '0' }}>
        <GalleryTitleDiv>{props.name}</GalleryTitleDiv>
        {props.description && <GalleryDescrDiv>{props.description}</GalleryDescrDiv>}
      </div>
    </div>
  );
};

export default Gallery;
