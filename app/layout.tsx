import "./globals.css";

export const metadata = {
  title: "LingoUp",
  description: "AI-powered English speaking coach",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
