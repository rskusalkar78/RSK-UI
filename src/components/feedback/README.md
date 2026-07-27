# Feedback components

<<<<<<< HEAD
The feedback suite provides accessible, animated UI patterns for status messaging, loading states, progress tracking, and empty content.

## Included components

- Alert: inline status messages for info, success, warning, and destructive states.
- Toast: transient notifications with motion and dismiss support.
- Progress: semantic progress indicators with ARIA support.
- Skeleton: pulsing placeholders for loading content.
- LoadingOverlay: a full-surface loading treatment with a centered status message.
- EmptyState: polished no-results and empty-content messaging.

## Accessibility notes

- Alerts use `role="alert"` for immediate announcements.
- Toasts use `role="status"` for polite updates.
- Progress bars expose `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`.
- Motion uses reduced-motion-friendly transitions where supported.
=======
The feedback suite provides lightweight, accessible UI patterns for communicating status, progress, and empty or loading states.

## Included components

- Alert: concise inline status messages for success, warning, info, and error states.
- Toast: transient notification content with motion and dismiss support.
- Progress: semantic progress indicators with ARIA attributes and motion-friendly fill transitions.
- Skeleton: pulsing placeholders for loading content.
- LoadingOverlay: an overlay that blocks interaction while content is loading.
- EmptyState: polished handling for blank or no-results states.

## Accessibility notes

- Alerts use the native `role="alert"` pattern.
- Toast content exposes `role="status"` for polite announcements.
- Progress bars expose `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`.
- Motion respects reduced-motion preferences through the Framer Motion integration.
>>>>>>> 461806c (feat: add Alert component stories for Storybook)

## Usage example

```tsx
<Alert title="Saved" description="Your profile was updated." variant="success" />
```
