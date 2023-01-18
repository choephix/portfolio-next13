import fs from 'fs';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import Gallery from '../components/Gallery';
import './index.css';

/**
 * It returns a div with a title attribute and a Gallery component
 * @returns A React component.
 */
export default function About(props: Awaited<ReturnType<typeof getStaticProps>>['props']) {
  function calculateOrderPriority(a: any) {
    return Date.parse('01/' + a.frontmatter.date);
  }

  props.projects.sort((a: any, b: any) => calculateOrderPriority(b) - calculateOrderPriority(a));

  return (
    <div id='main' style={{ overflowX: 'hidden', padding: '64px 0' }}>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{props.home?.content}</ReactMarkdown>

      <br />
      <br />
      <br />

      {props.projects
        .filter(
          prj =>
            prj.frontmatter.background.length > 0 &&
            prj.frontmatter.thumbs.length > 0 &&
            prj.frontmatter.abstract
        )
        .map((post: any, index: number) => {
          const { frontmatter, content } = post;
          return (
            <Gallery
              key={index}
              altname={frontmatter.name || ''}
              name={frontmatter.abstract || ''}
              description={frontmatter.short}
              backgroundImages={[]
                .concat(frontmatter.background)
                .map(filename => `/backdrops/${filename}`)}
              thumbImages={[]
                .concat(frontmatter.thumbs || [])
                .map(filename => `/thumbs/${filename}`)}
              thumbImagesExtra={[]
                .concat(frontmatter.extra || frontmatter.thumbs || [])
                .map(filename => `/thumbs/${filename}`)}
            />
          );
        })}
    </div>
  );
}

export async function getStaticProps() {
  // getting the website config
  // const siteConfig = await import(`../data/config.json`);

  const contentBasePath = `${process.cwd()}/src/content`;
  const contentPaths = {
    home: `${contentBasePath}/home.md`,
    projects: `${contentBasePath}/projects`,
  };

  return {
    props: {
      home: loadSinglePage(contentPaths.home),
      projects: loadPagesFromDirectory(contentPaths.projects),
    },
  };
}

function loadSinglePage(filepath: string) {
  const markdownWithMetadata = fs.readFileSync(filepath, 'utf-8');
  const { data: frontmatter, content } = matter(markdownWithMetadata);
  return { frontmatter, content };
}

function loadPagesFromDirectory(dirpath: string) {
  const filenames = fs.readdirSync(dirpath, 'utf-8');
  return filenames.map(filename => loadSinglePage(`${dirpath}/${filename}`));
}
