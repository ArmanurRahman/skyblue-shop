export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className=' flex flex-col min-h-screen w-full'>{children}</div>;
}
