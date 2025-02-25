import fs from "fs";
import matter from "gray-matter";
import path from "path";

// Define the blog post type
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

// Get all post slugs
export function getPostSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

// Get a single post by slug
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(POSTS_DIRECTORY, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Parse the frontmatter
    const { data, content } = matter(fileContents);

    // Validate required frontmatter
    if (!data.title || !data.date) {
      console.warn(`Post ${slug} is missing required frontmatter`);
    }

    return {
      slug,
      content,
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
}

// Get all posts
export function getAllPosts(): BlogPost[] {
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
}

// Get all tags
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagsSet = new Set<string>();

  posts.forEach((post) => {
    if (post.frontMatter.tags) {
      post.frontMatter.tags.forEach((tag) => tagsSet.add(tag));
    }
  });

  return Array.from(tagsSet);
}

// Get posts by tag
export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter(
    (post) => post.frontMatter.tags && post.frontMatter.tags.includes(tag),
  );
}
