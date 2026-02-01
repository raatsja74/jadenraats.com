import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function ToolPage() {
  const info = { title: "Tool", description: "Coming soon" };

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Back Link */}
        <div className="container py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Tools
          </Link>
        </div>

        {/* Content */}
        <section className="container py-20 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-lg bg-warning-default/20 border border-warning-default/40 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="text-warning-default" size={32} />
            </div>

            <h1 className="mb-4">{info.title}</h1>
            <p className="text-lg text-neutral-400 mb-8">{info.description}</p>

            <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-8 mb-8">
              <p className="text-neutral-300 mb-4">
                This tool is coming soon. I'm building it now.
              </p>
              <p className="text-sm text-neutral-500">
                Follow updates on{" "}
                <a
                  href="https://github.com/raatsja74"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:text-primary-400"
                >
                  GitHub
                </a>
              </p>
            </div>

            <Link href="/" className="btn btn-primary">
              Check Out Other Tools
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
