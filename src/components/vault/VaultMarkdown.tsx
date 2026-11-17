/* Vault image dimensions are author-controlled Markdown, so native images preserve intent. */
/* eslint-disable @next/next/no-img-element */
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { rewriteObsidianMarkdown, type PublicVaultAsset } from "@/lib/vault/markdown";
import type { VaultCatalog } from "@/lib/vault/types";

type Props = {
  assets: readonly PublicVaultAsset[];
  body: string;
  catalog: VaultCatalog;
  sourceKey: string;
};

export default function VaultMarkdown({ assets, body, catalog, sourceKey }: Props) {
  return (
    <div className="vault-markdown font-mono text-sm leading-relaxed text-soft sm:text-base">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        components={{
          h1: ({ children }) => <h1 id={headingId(children)} className="display mt-12 text-5xl text-ink sm:text-6xl">{children}</h1>,
          h2: ({ children }) => <h2 id={headingId(children)} className="display mt-12 border-t-2 border-line pt-8 text-3xl text-ink sm:text-4xl">{children}</h2>,
          h3: ({ children }) => <h3 id={headingId(children)} className="mt-10 text-base font-medium uppercase tracking-[0.06em] text-ink">{children}</h3>,
          p: ({ children }) => <p className="mt-5">{children}</p>,
          a: MarkdownLink,
          blockquote: ({ children }) => <blockquote className="my-8 border-l-2 border-accent pl-5 font-serif text-xl italic leading-relaxed text-ink sm:text-2xl">{children}</blockquote>,
          ul: ({ children }) => <ul className="my-6 list-square space-y-2 pl-6 marker:text-accent">{children}</ul>,
          ol: ({ children }) => <ol className="my-6 list-decimal space-y-2 pl-6 marker:text-accent">{children}</ol>,
          li: ({ children, className }) => <li className={className}>{children}</li>,
          code: ({ children, className, ...props }) => {
            const isBlock = Boolean(className);
            return isBlock ? (
              <code className={`${className ?? ""} block overflow-x-auto border-2 border-line bg-surface p-4 text-xs leading-relaxed text-ink`} {...props}>{children}</code>
            ) : (
              <code className="border border-line bg-surface px-1 text-xs text-ink" {...props}>{children}</code>
            );
          },
          pre: ({ children }) => <pre className="my-7 overflow-x-auto">{children}</pre>,
          table: ({ children }) => <div className="my-7 overflow-x-auto border-2 border-line"><table className="min-w-full border-collapse text-left text-xs sm:text-sm">{children}</table></div>,
          th: ({ children }) => <th className="border-b-2 border-line bg-surface px-3 py-2 font-medium text-ink">{children}</th>,
          td: ({ children }) => <td className="border-b border-line px-3 py-2 last:border-b-0">{children}</td>,
          img: ({ alt, src }) => <img alt={alt ?? ""} src={src} className="my-8 max-w-full border-2 border-line" />,
          hr: () => <hr className="my-10 border-0 border-t-2 border-line" />,
        }}
      >
        {rewriteObsidianMarkdown(body, catalog, sourceKey, assets)}
      </ReactMarkdown>
    </div>
  );
}

function MarkdownLink({ children, href, ...props }: ComponentPropsWithoutRef<"a">) {
  const external = href?.startsWith("http://") || href?.startsWith("https://");
  return (
    <a
      href={href}
      className="link-underline text-ink decoration-accent underline-offset-4 hover:text-accent"
      {...(external ? { rel: "noreferrer", target: "_blank" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}

function headingId(children: ReactNode): string {
  return textFromChildren(children)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function textFromChildren(value: ReactNode): string {
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map(textFromChildren).join("");
  if (value && typeof value === "object" && "props" in value) {
    return textFromChildren((value as { props?: { children?: ReactNode } }).props?.children ?? "");
  }
  return "";
}
