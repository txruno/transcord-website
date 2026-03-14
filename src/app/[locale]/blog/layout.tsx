import Navbar from "@/components/Navbar";

export default async function BlogLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	return (
		<>
			<Navbar locale={locale} />
			<main data-page-root>{children}</main>
		</>);
}