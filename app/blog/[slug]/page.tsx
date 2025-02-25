/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import { getPostBySlug, getPostSlugs } from "../../../blog_content/blog";
import BlogPost from "../../../components/BlogPost";

// Generate metadata for the page
export async function generateMetadata({ params }: any): Promise<Metadata> {
  // Since params might be a promise in some Next.js versions, let's handle it safely
  const slug = params.slug;
  const post = await Promise.resolve(getPostBySlug(slug));

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.frontMatter.title} - NCN Blog`,
    description: post.frontMatter.description,
  };
}

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs = await Promise.resolve(getPostSlugs());
  return slugs.map((slug) => ({ slug }));
}

// The actual page component
export default async function BlogPostPage({ params }: any) {
  // We need to await params for complete type safety
  const slug = params.slug;
  const post = await Promise.resolve(getPostBySlug(slug));

  if (!post) {
    notFound();
  }

  return (
    <div className="px-6 py-12">
      <BlogPost post={post} />
    </div>
  );
}
