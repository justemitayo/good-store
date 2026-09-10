import type { Metadata } from "next";





export const metadata: Metadata = {
  title: "Product Page",
  description: "Good store product page",
};

export default function ProductLayout({ children }: LayoutProps<"/">) {
  return (
      <body>
        {children}
      </body>

  );
}

