import fs from 'fs';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

import Gallery from '../components/Gallery';
import './index.css';

/**
 * It returns a div with a title attribute and a Gallery component
 * @returns A React component.
 */
export default function About(props: Awaited<ReturnType<typeof getStaticProps>>['props']) {
  return (
    <div id='main'>
      <h1>About</h1>

      <ReactMarkdown disallowedElements={['a']}>{props.home?.content}</ReactMarkdown>

      {props.projects.map((post: any, index: number) => {
        const { frontmatter, content } = post;
        return (
          <div key={index}>
            <Gallery
              altname={frontmatter.name || ''}
              name={frontmatter.abstract || ''}
              description={frontmatter.short}
              backgroundImages={[]
                .concat(frontmatter.background)
                .map(filename => `/backdrops/${filename}`)}
            />
          </div>
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
