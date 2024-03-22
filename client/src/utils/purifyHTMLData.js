import DOMPurify from "dompurify";

export const purifyHTMLData = (text) => ({ __html: DOMPurify.sanitize(text) });
