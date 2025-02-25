import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPost from '../../../components/BlogPost';
import { getPostBySlug, getPostSlugs } from '../../../blog_content/blog';

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Extract the slug
  const slug = params.slug;
  
  // Get the post
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: `${post.frontMatter.title} - NCN Blog`,
    description: post.frontMatter.description,
  };
}

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map(slug => ({ slug }));
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="px-6 py-12">
      <BlogPost post={post} />
    </div>
  );
}