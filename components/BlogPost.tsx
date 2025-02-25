import Link from "next/link";
import React from "react";

import { BlogPost as BlogPostType } from "../blog_content/blog";
import MarkdownRenderer from "./MarkdownRenderer";

interface BlogPostProps {
  post: BlogPostType;
}

// Helper to format dates
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/blog"
        className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors duration-200"
      >
        <svg
          className="mr-2 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Back to blog
      </Link>

      <article>
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            {post.frontMatter.title}
          </h1>

          <div className="flex items-center text-sm text-gray-400 mb-6">
            <span className="font-medium">{post.frontMatter.author}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(post.frontMatter.date)}</span>
          </div>

          {post.frontMatter.tags && post.frontMatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.frontMatter.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full hover:bg-gray-700 transition-colors duration-200"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-700">
          <div className="text-sm text-gray-400">
            <p>
              Written by {post.frontMatter.author} on{" "}
              {formatDate(post.frontMatter.date)}
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mt-6 transition-colors duration-200"
          >
            <svg
              className="mr-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back to all posts
          </Link>
        </footer>
      </article>
    </div>
  );
};

export default BlogPost;
