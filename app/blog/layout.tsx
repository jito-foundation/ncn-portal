import { Metadata } from "next";
import React from "react";

// import './blog.css'; // This is optional, we can add blog-specific styles here

export const metadata: Metadata = {
  title: {
    default: "NCN Blog",
    template: "%s | NCN Blog",
  },
  description: "The official blog for the NCN Project",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <div className="blog-container">{children}</div>
    </section>
  );
}
