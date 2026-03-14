import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

const SAFE_POST_ID = /^[a-z0-9_-]+$/i;

type PostEntry = {
  id: string;
  title: string;
  author?: string;
  image?: string;
  excerpt: string;
  body: string;
  date: string;
  publishedAt: number;
  search: boolean;
};

function formatPostDate(value: unknown): { formatted: string; timestamp: number } {
  if (value == null) {
    return { formatted: "", timestamp: 0 };
  }

  const parsedDate = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(parsedDate.getTime())) {
    return { formatted: "", timestamp: 0 };
  }

  return {
    formatted: parsedDate.toISOString().split("T")[0],
    timestamp: parsedDate.getTime(),
  };
}

function getExcerpt(content: string): string {
  const lines = content
    .split(/\r\n|\r|\n/)
    .map((entry) => entry.trim());

  const firstHeadingIndex = lines.findIndex((entry) => /^#{1,6}\s+/.test(entry));
  const introLines = (firstHeadingIndex === -1 ? lines : lines.slice(0, firstHeadingIndex))
    .filter((entry) => entry.length > 0)
    .slice(0, 3);

  return introLines.join("\n");
}

function resolvePostLocale(locale: string): "en" | "ja" | "ko" {
  if (locale === "ja" || locale === "ko") {
    return locale;
  }
  return "en";
}

function isSafePostId(postId: string): boolean {
  return SAFE_POST_ID.test(postId);
}

const getPostDirectory = (locale: string): string => {
  const postLocale = resolvePostLocale(locale);
  return path.join(process.cwd(), `src/content/posts/${postLocale}/`);
};

const getAllPostsForLocale = cache((locale: string): PostEntry[] => {
  const postDirectory = getPostDirectory(locale);
  if (!fs.existsSync(postDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(postDirectory, file);
      const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));
      const { formatted, timestamp } = formatPostDate(data.date);

      return {
        id: file.replace(/\.md$/, ""),
        title: typeof data.title === "string" ? data.title : "",
        author: typeof data.author === "string" ? data.author : undefined,
        image: typeof data.image === "string" ? data.image : undefined,
        excerpt: getExcerpt(content),
        body: content,
        date: formatted,
        publishedAt: timestamp,
        search: data.search !== false,
      };
    })
    .sort((a, b) => b.publishedAt - a.publishedAt);
});

export const getPostsForLocale = cache((locale: string): PostEntry[] => {
  return getAllPostsForLocale(locale).filter((post) => post.search);
});

export const getPostById = cache((locale: string, postId: string): PostEntry | null => {
  if (!isSafePostId(postId)) {
    return null;
  }

  const posts = getAllPostsForLocale(locale);
  return posts.find((post) => post.id === postId) ?? null;
});
