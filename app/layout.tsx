
import { NavbarContainer } from "#/components/nav";
import { Sidebar } from "#/components/sidebar";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        
        <div>
          {children}
        </div>
        
        </body>
    </html>
  );
}
