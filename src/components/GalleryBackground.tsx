import { useWatchReturnValue } from '@/utils/useWatchReturnValue';
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
  // filter: blur(24px);
  // transition: background 1.5s linear, filter 0.5s linear;

  *:hover > & {
    filter: blur(6px);
    transition: background 1.5s linear, filter 0.25s linear;
  }

  color: #fff;
  font-size: 24px;
  padding: 50px;
`;

export const GalleryBackground = (props: GalleryBackgroundProps) => {
  const { images } = props;

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index + 1) % images.length), 9000);
    return () => clearInterval(intervalId);
  }, [images, index]);

  const ref = useRef<HTMLDivElement>(null);
  const dist = useWatchReturnValue(() => {
    if (!ref.current) return 0;

    /** Return a value from 0 to 1, depending on how far away the center of this element
     * is from the center of the screen. (vertically) */
    const rect = ref.current.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const distance = Math.abs(center - window.innerHeight / 2);
    
    return distance / (window.innerHeight / 2);
    // return 1 - (distance / (window.innerHeight / 2));
  });

  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////  //////

  const backgroundImageUrl = images[index];

  return (
    <GalleryBackgroundDiv style={{ 
      backgroundImage: `url(${backgroundImageUrl})`,
      filter: `blur(${4 + dist * 24}px)`,
    }} ref={ref}>
      {dist}
    </GalleryBackgroundDiv>
  );
  // return <GalleryBackgroundDiv style={{ backgroundImage: `url(${backgroundImageUrl})` }} ref={ref}/>;
};
