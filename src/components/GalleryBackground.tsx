import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

export type GalleryBackgroundProps = {
  images: string[];
};

const GalleryBackgroundDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-image: none;
  background-size: cover;
  background-position: center;
  filter: blur(24px);

  transition: background 1.5s linear, filter 0.5s linear;

  *:hover > & {
    filter: blur(6px);
    transition: background 1.5s linear, filter 0.25s linear;
  }
`;

export const GalleryBackground = (props: GalleryBackgroundProps) => {
  const { images } = props;

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index + 1) % images.length), 3000);
    return () => clearInterval(intervalId);
  }, [images, index]);

  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

  const backgroundImageUrl = images[index];

  return <GalleryBackgroundDiv style={{ backgroundImage: `url(${backgroundImageUrl})` }} />;
};
