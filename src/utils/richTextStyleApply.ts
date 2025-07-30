export default function enhanceHtmlWithTailwind(htmlString: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // Headings
  doc.querySelectorAll("h1").forEach(el => {
    el.classList.add("text-4xl", "font-bold", "mt-4", "mb-2");
  });
  doc.querySelectorAll("h2").forEach(el => {
    el.classList.add("text-3xl", "font-semibold", "mt-4", "mb-2");
  });
  doc.querySelectorAll("h3").forEach(el => {
    el.classList.add("text-2xl", "font-medium", "mt-4", "mb-2");
  });

  // Paragraphs and divs
  doc.querySelectorAll("p, div").forEach(el => {
    if (!el.classList.contains("ql-code-block")) {
      el.classList.add("text-base", "text-white", "mb-3");
    }
  });

  // Blockquotes
  doc.querySelectorAll("blockquote").forEach(el => {
    el.classList.add("border-l-4", "border-gray-400", "pl-4", "italic", "text-white", "mb-4");
  });

  // List Conversion (handles mixed bullet + ordered inside <ol>)
  doc.querySelectorAll("ol").forEach(originalList => {
    const liElements = Array.from(originalList.querySelectorAll("li"));
    let currentList: HTMLOListElement | HTMLUListElement | null = null;

    liElements.forEach(li => {
      const type = li.getAttribute("data-list");
      const tag = type === "bullet" ? "ul" : "ol";

      // Start new list if needed
      if (!currentList || currentList.tagName.toLowerCase() !== tag) {
        currentList = document.createElement(tag);
        originalList.parentNode?.insertBefore(currentList, originalList);
      }

      // Clean and style <li>
      li.removeAttribute("data-list");
      li.querySelectorAll(".ql-ui").forEach(span => span.remove());
      li.classList.add("mb-1", "text-gray-800");

      currentList.appendChild(li);
    });

    // Remove the original <ol> wrapper
    originalList.remove();
  });

  // Style remaining <ol> and <ul>
  doc.querySelectorAll("ol, ul").forEach(list => {
    const isOrdered = list.tagName.toLowerCase() === "ol";
    list.classList.add(isOrdered ? "list-decimal" : "list-disc", "ml-6", "mb-4");
  });

  // Code blocks
  doc.querySelectorAll(".ql-code-block").forEach(block => {
    block.classList.add(
      "bg-gray-100",
      "rounded",
      "px-4",
      "py-2",
      "font-mono",
      "text-sm",
      "overflow-x-auto",
      "mb-2"
    );
  });

  return doc.body.innerHTML;
}