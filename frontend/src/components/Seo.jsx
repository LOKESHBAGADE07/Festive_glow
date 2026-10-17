import { useEffect } from "react";

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

/* Lightweight per-route meta (no helmet dependency needed on React 19). */
export default function Seo({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:title", title || document.title);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:title", title || document.title);
      setMeta("name", "twitter:description", description);
    }
  }, [title, description]);
  return null;
}
