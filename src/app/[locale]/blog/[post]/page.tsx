import Footer from "@/components/Footer";
import PostSection from "@/components/PostSection";

import type { Metadata } from "next";
import { SUPPORTED_LOCALES } from "@/lib/locales";
import { getPostById, getPostsForLocale } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams(): Array<{ locale: string; post: string }> {
	return SUPPORTED_LOCALES.flatMap((locale) =>
		getPostsForLocale(locale).map((post) => ({ locale, post: post.id }))
	);
}

export async function generateMetadata(
	{ params }: { params: Promise<{ locale: string, post: string }> },
): Promise<Metadata> {
	const { locale, post } = await params;
	const postEntry = getPostById(locale, post);
	if (!postEntry) return {};
	const imagePath = postEntry.image ? `/images/${postEntry.image}` : undefined;

	return {
		title: `Transcord Blog - ${postEntry.title}`,
		description: postEntry.excerpt,
		openGraph: {
			type: "article",
			url: `/${locale}/blog/${post}`,
			title: postEntry.title,
			description: postEntry.excerpt,
			siteName: "Transcord",
			images: imagePath ? [{ url: imagePath }] : undefined,
		},
		twitter: {
			card: "summary_large_image",
			images: imagePath,
		}
	};
}

export default async function Page({ params }: { params: Promise<{ locale: string, post: string }> }) {
	const { locale, post } = await params;
	return (
		<main className="pt-10 bg-gray-900 text-white">
			<PostSection locale={locale} postId={post} />
			<Footer locale={locale} />
		</main>
	)
}