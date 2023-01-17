import { LiveValue } from '@/debug/LiveValue';
import { duplicateArray } from '@/utils/duplicateArray';
import { useRequestAnimationFrame } from '@/utils/useRequestAnimationFrame';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const ThumbStrip = styled.div`
  display: flex;
  width: 100%;
  margin: 8px 0px;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Thumb = styled.img`
  height: 160px;
  width: auto;
  border-radius: 12px;
  box-shadow: 0 0 24px 0px rgba(0, 0, 0, 0.3);
  margin: 24px;
`;

type GalleryThumbsSliderProps = {
  images: string[];
  scrollSpeed?: number;
};

export function GalleryThumbsSlider(props: GalleryThumbsSliderProps) {
  const { images: originalImages, scrollSpeed = 1 } = props;

  const refStrip = useRef<HTMLDivElement>(null);
  const refView = useRef<HTMLDivElement>(null);

  const imagesDuplicationFactor = 3;
  const images = duplicateArray(originalImages, imagesDuplicationFactor);

  const maxScroll = (refStrip.current?.scrollWidth || 0) / imagesDuplicationFactor;

  useRequestAnimationFrame(() => {
    if (!refStrip.current) return;

    const now = performance.now();
    const speed = 0.1 * scrollSpeed;
    refStrip.current.scrollLeft = (now * speed) % maxScroll;
  });

  return (
    <div
      ref={refView}
      className='image-list'
      style={{
        position: 'absolute',
        bottom: '0px',
        left: '0px',
        right: '0px',
        // overflow: 'hidden',
      }}
    >
      <ThumbStrip ref={refStrip}>
        {images.map((image, index) => (
          <Thumb key={index} src={image} alt={`image${index}`} style={{}} />
        ))}
      </ThumbStrip>
    </div>
  );
}
