import matter from 'gray-matter';
import Gallery from '../components/Gallery';

import fs from 'fs';

/**
 * It returns a div with a title attribute and a Gallery component
 * @returns A React component.
 */
export default function About(props: Awaited<ReturnType<typeof getStaticProps>>['props']) {
  const { posts } = props;

  return (
    <div title='About – Lee Robinson'>
      <h1>About</h1>
      <code>
        {JSON.stringify(props, null, 2)}
      </code>

      {
        props.posts.map((post: any, index: number) => {
          return (
            <div key={index}>
              <h1>{post.frontmatter.title}</h1>
              <p>{post.frontmatter.date}</p>
              <div>{post.content}</div>
              <Gallery />
            </div>
          );
        })
      }
      <Gallery />
      <Gallery />
      <Gallery />
      <Gallery />
      <Gallery />
    </div>
  );
}

export async function getStaticProps() {
  // getting the website config
  // const siteConfig = await import(`../data/config.json`);

  /** Get the contents of all posts from "../content/posts" */
  const postFiles = fs.readdirSync(`${process.cwd()}/src/content/posts`, 'utf-8');
  const posts = postFiles.map(filename => {
    const markdownWithMetadata = fs.readFileSync(
      `${process.cwd()}/src/content/posts/${filename}`,
      'utf-8'
    );
    const { data: frontmatter, content } = matter(markdownWithMetadata);
    return {
      frontmatter,
      content,
    };
  });

  console.log(
    `
    posts: ${JSON.stringify(posts, null, 2)}

    `
  )

  return {
    props: {
      posts: posts,
      // title: siteConfig.default.title,
      // description: siteConfig.default.description,
    },
  };
}
