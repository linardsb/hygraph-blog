import DOMPurify from 'dompurify'

// Configure DOMPurify with strict allowlists for secure HTML rendering
const sanitizeConfig = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'em', 'u', 's', 'a', 'img',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li',
    'blockquote', 'code', 'pre',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'div', 'span'
  ],
  ALLOWED_ATTR: [
    'href', 'src', 'alt', 'title', 'class', 'id',
    'target', 'rel'
  ],
  ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
}

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param html - Raw HTML string from CMS
 * @returns Sanitized HTML string safe for rendering
 */
export function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side: return as-is, will be sanitized on client
    return html
  }

  return DOMPurify.sanitize(html, sanitizeConfig)
}

/**
 * Create sanitized HTML for dangerouslySetInnerHTML
 * @param html - Raw HTML string
 * @returns Object with __html property for React
 */
export function createSafeHtml(html: string): { __html: string } {
  return {
    __html: sanitizeHtml(html)
  }
}
