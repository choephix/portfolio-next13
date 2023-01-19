import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "tinacms";

console.log("Using branch: ", branch)

export default defineConfig({
  branch,
  clientId: 'cf80cccf-f219-42d7-a318-44ec16fe451d', // Get this from tina.io
  token: '6426c348577c43bf7220bbfd459da7e2064f267e', // Get this from tina.io
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'post',
        label: 'Posts',
        path: 'content/posts',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => `/demo/blog/${document._sys.filename}`,
        },
      },
      {
        name: 'project',
        label: 'Projects',
        path: 'src/content/projects',
        fields: [
          {
            type: 'string',
            name: 'abstract',
            label: 'Abstract Name',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'name',
            label: 'Project Name',
          },
          {
            type: 'string',
            name: 'short',
            label: 'Short Description',
          },
          {
            type: 'string',
            name: 'skills',
            label: 'Skills',
          },
          {
            type: 'string',
            name: 'date',
            label: 'Rough Date',
          },
          {
            type: 'string',
            name: 'background',
            label: 'Skills',
            list: true,
          },
          {
            type: 'string',
            name: 'thumbs',
            label: 'Skills',
            list: true,
          },
          {
            type: 'boolean',
            name: 'feature',
            label: 'Feature on Home Page',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          // router: ({ document }) => `/demo/blog/${document._sys.filename}`,
        },
      },
      {
        name: 'experience',
        label: 'Experence',
        path: 'src/content/experience',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          // router: ({ document }) => `/demo/blog/${document._sys.filename}`,
        },
      },
    ],
  },
});
