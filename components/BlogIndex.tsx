import Link from "next/link";
import React from "react";

import { BlogPost } from "../blog_content/blog";

// Helper to format dates
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

interface BlogIndexProps {
  posts: BlogPost[];
}

export const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
  return (
    <div className="blog-index">
      {posts.map((post) => (
        <div key={post.slug} className="mb-14 pb-8 border-b border-gray-700">
          <div className="mb-4">
            <Link
              href={`/blog/${post.slug}`}
              className="text-3xl font-bold text-white hover:text-blue-400 transition-colors duration-200"
            >
              {post.frontMatter.title}
            </Link>

            <div className="flex items-center mt-2 text-sm text-gray-400">
              <span className="font-medium">{post.frontMatter.author}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(post.frontMatter.date)}</span>
            </div>
          </div>

          <p className="text-lg text-gray-300 mb-4">
            {post.frontMatter.description}
          </p>

          {post.frontMatter.tags && post.frontMatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
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

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            Read more
            <svg
              className="ml-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogIndex;
