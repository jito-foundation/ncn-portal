import React from 'react';
import { Metadata } from 'next';
import './blog.css';

export const metadata: Metadata = {
  title: {
    default: 'NCN Blog',
    template: '%s | NCN Blog'
  },
  description: 'The official blog for the NCN Project'
};

export default function BlogLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-black">
      <div className="blog-container">
        {children}
      </div>
    </section>
  );
}