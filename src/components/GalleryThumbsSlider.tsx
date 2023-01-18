import { LiveValue } from '@/debug/LiveValue';
import { duplicateArray } from '@/utils/duplicateArray';
import { useRequestAnimationFrame } from '@/utils/useRequestAnimationFrame';
import { useWatchReturnValue } from '@/utils/useWatchReturnValue';
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

const ThumbP = styled.picture`
  border-radius: 12px;
  box-shadow: 0 0 24px 0px rgba(0, 0, 0, 0.75), inset 0 0 24px 0px rgba(0, 0, 0, 0.75);
  margin: 24px;
  pverflow: hidden;
  height: 160px;
  width: auto;
`;

const Thumb = styled.img`
  border-radius: 12px;
  box-shadow: 0 0 24px 0px rgba(0, 0, 0, 0.75), inset 0 0 24px 0px rgba(0, 0, 0, 0.75);
  margin: 24px;
  pverflow: hidden;
  height: 160px;
  width: auto;
`;

const ThumbVideo = styled.video`
  border-radius: 12px;
  box-shadow: 0 0 24px 0px rgba(0, 0, 0, 0.75), inset 0 0 24px 0px rgba(0, 0, 0, 0.75);
  margin: 24px;
  pverflow: hidden;
  height: 160px;
  width: auto;
`;

type GalleryThumbsSliderProps = {
  images: string[];
  scrollSpeed?: number;
};

export function GalleryThumbsSlider(props: GalleryThumbsSliderProps) {
  const { images: originalImages, scrollSpeed = 1 } = props;

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
        {images.map((image, index) => {
          return image.endsWith('.mp4') ? (
            <ThumbVideo muted autoPlay loop>
              <source src={image} type='video/mp4' />
            </ThumbVideo>
          ) : image.endsWith('.webm') ? (
            <ThumbVideo muted autoPlay loop>
              <source src={image} type='video/webm' />
            </ThumbVideo>
          ) : (
            <Thumb key={index} src={image} alt={`image${index}`} style={{}} />
          );
        })}
      </ThumbStrip>
    </div>
  );
}
