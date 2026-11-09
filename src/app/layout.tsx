import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Custom Digital Tools & Business Automation | [Company Name]",
  description: "We build custom AI tools, business automations, software integrations, and digital solutions designed around your workflow. Serving businesses across Europe.",
  alternates: { canonical: "/" },
  openGraph: { title: "Custom Tools. Smarter Work. Less Routine.", description: "Custom digital tools, AI solutions, and workflow automation built around your business.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
