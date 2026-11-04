import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO component to dynamically update HTML head tags (document title, OpenGraph, Twitter Cards)
 * for client-side routing.
 */
export default function SEO({ title, description, image, url }) {
  const location = useLocation();

  useEffect(() => {
    // 1. Update Title
    const defaultTitle = "The Ability People (TAP)";
    document.title = title ? `${title} | ${defaultTitle}` : defaultTitle;

    // Helper to update or create meta tags
    const updateMetaTag = (attrName, attrValue, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Update Description
    updateMetaTag('name', 'description', description);

    // 3. Update OpenGraph Tags
    updateMetaTag('property', 'og:title', title || defaultTitle);
    updateMetaTag('property', 'og:description', description);
    const absoluteImage = image ? (image.startsWith('http') ? image : window.location.origin + image) : '';
    updateMetaTag('property', 'og:image', absoluteImage);
    const absoluteUrl = url ? (url.startsWith('http') ? url : window.location.origin + url) : window.location.origin + location.pathname;
    updateMetaTag('property', 'og:url', absoluteUrl);
    updateMetaTag('property', 'og:type', 'website');

    // 4. Update Twitter Card Tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title || defaultTitle);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', absoluteImage);

  }, [title, description, image, url, location.pathname]);

  return null;
}
