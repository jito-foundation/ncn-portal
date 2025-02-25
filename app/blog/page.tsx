import { Metadata } from "next";
import React from "react";

import { getAllPosts } from "../../blog_content/blog";
import BlogIndex from "../../components/BlogIndex";

export const metadata: Metadata = {
  title: "NCN Blog",
  description: "Latest news and updates from the NCN team",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-white mb-4">NCN Blog</h1>
      <p className="text-xl text-gray-300 mb-12">
        Welcome to the official blog of the NCN Project! Here we share the
        latest news, technical insights, and community updates.
      </p>

      <BlogIndex posts={posts} />
    </div>
  );
}
