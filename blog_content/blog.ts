import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { cache } from "react";

export interface BlogPost {
  slug: string;
  content: string;
  frontMatter: {
    title: string;
    description: string;
    date: string;
    author: string;
    tags?: string[];
    [key: string]: any;
  };
}

// Path to our blog content
const POSTS_DIRECTORY = path.join(process.cwd(), "blog_content/posts");
const PUBLIC_IMAGES_DIRECTORY = path.join(process.cwd(), "public/blog-images");

// Get all post slugs with React cache for optimization
export const getPostSlugs = cache((): string[] => {
  // Get all directories in the posts folder
  const items = fs.readdirSync(POSTS_DIRECTORY, { withFileTypes: true });

  // Filter for directories only
  const directories = items
    .filter((item) => item.isDirectory())
    .map((item) => item.name);

  return directories;
});

// Get a single post by slug with React cache for optimization
export const getPostBySlug = cache((slug: string): BlogPost | null => {
  try {
    const postDirectory = path.join(POSTS_DIRECTORY, slug);

    // Look for a markdown file with the same name as the directory
    // or for an index.md file
    let mdFilePath = path.join(postDirectory, `${slug}.md`);

    if (!fs.existsSync(mdFilePath)) {
      mdFilePath = path.join(postDirectory, "index.md");

      if (!fs.existsSync(mdFilePath)) {
        console.error(`No markdown file found for post: ${slug}`);
        return null;
      }
    }

    const fileContents = fs.readFileSync(mdFilePath, "utf8");

    // Parse the frontmatter
    const { data, content } = matter(fileContents);

    // Process the content to update image paths
    const processedContent = processImagePaths(content, slug);

    // Validate required frontmatter
    if (!data.title || !data.date) {
      console.warn(`Post ${slug} is missing required frontmatter`);
    }

    return {
      slug,
      content: processedContent,
      frontMatter: {
        title: data.title || "Untitled",
        description: data.description || "",
        date: data.date
          ? new Date(data.date).toISOString()
          : new Date().toISOString(),
        author: data.author || "Anonymous",
        tags: data.tags || [],
        ...data,
      },
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
});

// Function to process image paths in markdown content
function processImagePaths(content: string, slug: string): string {
  // This regex matches markdown image syntax: ![alt text](image-path)
  const imageRegex = /!\[(.*?)\]\((?!http|https|\/)(.*?)\)/g;

  // Replace relative image paths with the correct public URL path
  return content.replace(imageRegex, (match, alt, imagePath) => {
    // Convert relative paths to public image paths
    return `![${alt}](/blog-images/${slug}/${imagePath})`;
  });
}

// Get all posts with React cache for optimization
export const getAllPosts = cache((): BlogPost[] => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null);

  // Sort posts by date (newest first)
  return posts.sort((a, b) => {
    return (
      new Date(b.frontMatter.date).getTime() -
      new Date(a.frontMatter.date).getTime()
    );
  });
});

// Get all tags with React cache for optimization
export const getAllTags = cache((): string[] => {
  const posts = getAllPosts();
  const tagsSet = new Set<string>();

  posts.forEach((post) => {
    if (post.frontMatter.tags) {
      post.frontMatter.tags.forEach((tag) => tagsSet.add(tag));
    }
  });

  return Array.from(tagsSet);
});

// Get posts by tag with React cache for optimization
export const getPostsByTag = cache((tag: string): BlogPost[] => {
  const posts = getAllPosts();
  return posts.filter(
    (post) => post.frontMatter.tags && post.frontMatter.tags.includes(tag),
  );
});
