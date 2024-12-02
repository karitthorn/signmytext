import "./globals.css";
import { Prompt } from "next/font/google";

const prompt = Prompt({
  weight: "400",
  subsets: ["thai"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>SignMytext</title>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={prompt.className}>{children}</body>
    </html>
  );
}
