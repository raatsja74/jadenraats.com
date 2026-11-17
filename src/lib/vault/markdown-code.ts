export interface MarkdownCodeProtection {
  prefix: string;
  segments: string[];
  value: string;
}

/** Masks Markdown code before scanning prose, then restores it byte-for-byte. */
export function protectMarkdownCode(value: string): MarkdownCodeProtection {
  const protection = {
    prefix: createPlaceholderPrefix(value),
    segments: [],
  };
  const protectedFences = protectFencedCode(value, protection);
  return { ...protection, value: protectInlineCode(protectedFences, protection) };
}

export function restoreMarkdownCode(
  value: string,
  protection: MarkdownCodeProtection,
): string {
  return protection.segments.reduce(
    (result, segment, index) => result.split(`${protection.prefix}${index}\u0000`).join(segment),
    value,
  );
}

/** Use when a parser must ignore wiki syntax that appears in literal code. */
export function maskMarkdownCode(value: string): string {
  return protectMarkdownCode(value).value;
}

function protectFencedCode(
  value: string,
  protection: Pick<MarkdownCodeProtection, "prefix" | "segments">,
): string {
  const lines = value.split(/(?<=\n)/);
  const output: string[] = [];
  let fence: { marker: "`" | "~"; length: number; content: string[] } | null = null;
  let indented: string[] | null = null;

  for (const line of lines) {
    if (fence) {
      fence.content.push(line);
      const closing = new RegExp(`^ {0,3}${escapeRegExp(fence.marker)}{${fence.length},}[ \\t]*(?:\\n)?$`);
      if (closing.test(line)) {
        output.push(codePlaceholder(protection, fence.content.join("")));
        fence = null;
      }
      continue;
    }

    if (indented) {
      if (isIndentedCodeLine(line) || isBlankLine(line)) {
        indented.push(line);
        continue;
      }
      output.push(codePlaceholder(protection, indented.join("")));
      indented = null;
    }

    const opening = line.match(/^ {0,3}([`~]{3,})/);
    if (opening) {
      fence = {
        marker: opening[1][0] as "`" | "~",
        length: opening[1].length,
        content: [line],
      };
    } else if (isIndentedCodeLine(line)) {
      indented = [line];
    } else {
      output.push(line);
    }
  }

  if (fence) output.push(codePlaceholder(protection, fence.content.join("")));
  if (indented) output.push(codePlaceholder(protection, indented.join("")));
  return output.join("");
}

function isIndentedCodeLine(line: string): boolean {
  return /^(?: {4}|\t)/.test(line);
}

function isBlankLine(line: string): boolean {
  return /^[ \t]*(?:\n)?$/.test(line);
}

function protectInlineCode(
  value: string,
  protection: Pick<MarkdownCodeProtection, "prefix" | "segments">,
): string {
  let output = "";
  let cursor = 0;
  while (cursor < value.length) {
    if (value[cursor] !== "`") {
      output += value[cursor];
      cursor += 1;
      continue;
    }

    let endOfOpening = cursor;
    while (value[endOfOpening] === "`") endOfOpening += 1;
    const marker = value.slice(cursor, endOfOpening);
    const closing = value.indexOf(marker, endOfOpening);
    if (closing < 0) {
      output += marker;
      cursor = endOfOpening;
      continue;
    }

    output += codePlaceholder(protection, value.slice(cursor, closing + marker.length));
    cursor = closing + marker.length;
  }
  return output;
}

function createPlaceholderPrefix(value: string): string {
  let prefix = "\u0000vault-code:";
  while (value.includes(prefix)) prefix = `\u0000${prefix}`;
  return prefix;
}

function codePlaceholder(
  protection: Pick<MarkdownCodeProtection, "prefix" | "segments">,
  value: string,
): string {
  const index = protection.segments.push(value) - 1;
  return `${protection.prefix}${index}\u0000`;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
