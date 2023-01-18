import matter from 'gray-matter';
import Gallery from './Gallery';

import fs from 'fs';

/**
 * It returns a div with a title attribute and a Gallery component
 * @returns A React component.
 */
export default function ProjectGalleries(
  props: Awaited<ReturnType<typeof getStaticProps>>['props']
) {
  return (
    <div style={{ overflowX: 'hidden', padding: '64px 0' }}>
      <h1>About</h1>
      <code>{JSON.stringify(props, null, 2)}</code>

      {props.posts.map((post: any, index: number) => {
        return (
          <div key={index}>
            <h1>{post.frontmatter.title}</h1>
            <p>{post.frontmatter.date}</p>
            <div>{post.content}</div>
            <Gallery />
          </div>
        );
      })}
    </div>
  );
}
