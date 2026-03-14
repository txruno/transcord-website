import Image from "next/image";

import Link from "next/link";
import Footer from "@/components/Footer";

import type { Metadata } from "next";

import { getTranslate } from "@/lib/locale";
import { getPostsForLocale } from "@/lib/posts";

const BLOG_IMAGE_QUALITY = 95;

export async function generateMetadata(
	{ params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
	const { locale } = await params;
	return {
		title: "Transcord Blog",
		openGraph: {
			title: "Transcord Blog",
			url: `https://transcord.vercel.app/${locale}/blog`
		}
	};
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslate(locale)
	const posts = getPostsForLocale(locale);

	return (
		<main className="bg-gray-900 text-white">
			{posts.length > 0 ? (
				<>
					<div className="relative place-items-center h-[55vh] min-h-144 w-full">
						<div className="absolute h-full w-full bg-cover bg-center mask-linear-[to_bottom,black_0%,transparent_100%]" style={{ backgroundImage: posts[0].image ? `url(/images/${posts[0].image})` : undefined }}></div>
						<div className="relative flex h-full max-w-5xl items-center p-8">
							<div className="flex md:flex-row flex-col items-start justify-between space-x-8">
								<div className="md:max-w-1/2 space-y-5">
									<h2 className="text-4xl font-bold space-x-4">
										<span>{posts[0].title}</span>
										<span className="inline-block align-middle px-3 py-1 bg-gray-500/30 text-gray-300 text-sm rounded-full">{posts[0].date}</span>
									</h2>
									<p className="text-lg text-gray-300 line-clamp-4">{posts[0].excerpt}</p>
									<Link href={`/${locale}/blog/${posts[0].id}`}>
										<div className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">{t("blog.read_more")}</div>
									</Link>
								</div>
								<div className="md:block hidden max-w-1/2">
									<Link href={`/${locale}/blog/${posts[0].id}`}>
										{posts[0].image && (
											<Image
												src={`/images/${posts[0].image}`}
												alt={posts[0].title}
												width={960}
												height={540}
												quality={BLOG_IMAGE_QUALITY}
												sizes="(min-width: 1024px) 33vw, 100vw"
												priority
												className="h-full w-full object-cover rounded-lg shadow-lg"
											/>
										)}
									</Link>
								</div>
							</div>
						</div>
					</div>

					{posts.length > 1 && (
						<div className="w-full max-w-5xl mx-auto px-4 pb-24 space-y-8">
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
								{posts.slice(1).map((post) => (
									<Link key={post.id} href={`/${locale}/blog/${post.id}`} className="block">
										<div className="overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg">
											{post.image && (
												<Image
													src={`/images/${post.image}`}
													alt={post.title}
													width={640}
													height={320}
													quality={BLOG_IMAGE_QUALITY}
													sizes="(min-width: 1024px) 22vw, (min-width: 768px) 45vw, 100vw"
													className="h-40 w-full object-cover bg-gray-600"
												/>
											)}
											<div className="bg-gray-800 p-6 pb-4">
												<div className="h-38 space-y-1">
													<h2 className="text-2xl font-semibold">{post.title}</h2>
													<p className="text-gray-400 line-clamp-3">{post.excerpt}</p>
												</div>
												<div className="flex items-center justify-between text-sm text-gray-500">
													<span>{post.author}</span>
													<span>{post.date}</span>
												</div>
											</div>
										</div>
									</Link>
								))}
							</div>
						</div>
					)}
				</>
			) : (
				<div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
					<h1 className="text-4xl font-bold text-white mb-4">{t("blog.not_found")}</h1>
					<p className="text-gray-400 mb-8">{t("blog.not_found_message")}</p>
				</div>
			)}
			<Footer locale={locale} />
		</main>
	);
}
