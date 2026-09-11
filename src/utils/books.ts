import { BookType } from "@/types/books";

function isComicBook(renderedPage: Element): boolean {
  const segmentDiv = renderedPage.querySelector(":scope > div.gb-segment");
  if (!segmentDiv) return false;

  const pageDiv = segmentDiv.querySelector(':scope > div[id^="page_"]');
  if (!pageDiv) return false;

  const image = pageDiv.querySelector("img[resource-id]");
  return !!image;
}

export function getBookType(): BookType {
  const shownPage = document.querySelector(
    "reader-page.shown > reader-rendered-page",
  );
  if (!shownPage) return BookType.UNKNOWN;

  if (isComicBook(shownPage)) return BookType.COMIC;
  if (shownPage.classList.contains("-gb-fixed")) return BookType.FIXED_EPUB;
  if (shownPage.classList.contains("-gb-image"))
    return BookType.RESIZABLE_FIXED_EPUB;

  return BookType.FLOWABLE_EPUB;
}
