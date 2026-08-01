# Feedback components

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

## Usage example

```tsx
<Alert title="Saved" description="Your profile was updated." variant="success" />
```
