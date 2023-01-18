import { LiveValue } from '@/debug/LiveValue';
import { duplicateArray } from '@/utils/duplicateArray';
import { useRequestAnimationFrame } from '@/utils/useRequestAnimationFrame';
import { useWatchReturnValue } from '@/utils/useWatchReturnValue';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { GalleryThumb } from './GalleryThumb';

const ThumbStrip = styled.div`
  display: flex;
  width: 100%;
  margin: 8px 0px;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`;

type GalleryThumbsSliderProps = HTMLAttributes<any> & {
  images: string[];
  scrollSpeed?: number;
};

export function GalleryThumbsSlider(props: GalleryThumbsSliderProps) {
  const { images: originalImages, scrollSpeed = 1, ...divAttr } = props;

  const refStrip = useRef<HTMLDivElement>(null);
  const refView = useRef<HTMLDivElement>(null);

  const imagesDuplicationFactor = 2;
  const images = duplicateArray(originalImages, imagesDuplicationFactor);

  const maxScroll = (refStrip.current?.scrollWidth || 0) / imagesDuplicationFactor;

  useRequestAnimationFrame(() => {
    if (!refStrip.current) return;

    const now = performance.now();
    const speed = 0.1 * scrollSpeed;
    refStrip.current.scrollLeft = (now * speed) % maxScroll;
  });

  /**
   * Ensure the component re-renders when the size of the thumbs strip changes.
   * This can happen when new images are loaded after initial render,
   * and without it the scrollWidth used above will be incorrect.
   **/
  useWatchReturnValue(() => String(refStrip.current?.scrollWidth));

  return (
    <div ref={refView} className='image-list' {...divAttr}>
      <ThumbStrip ref={refStrip}>
        {images.map((image, index) => (
          <GalleryThumb src={image} key={index} />
        ))}
      </ThumbStrip>
    </div>
  );
}
