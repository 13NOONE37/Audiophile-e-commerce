export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>layout of product: {children}</div>;
}
