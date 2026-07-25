import {
  forwardRef,
  useState,
  createContext,
  useContext,
  type HTMLAttributes,
  type ImgHTMLAttributes,
} from 'react';
import { cn } from '../../lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarShape = 'circle' | 'square';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual size */
  size?: AvatarSize;
  /** Border radius shape */
  shape?: AvatarShape;
  /** Presence indicator dot */
  status?: AvatarStatus;
}

export interface AvatarImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Alt text is required for screen readers */
  alt: string;
}

export interface AvatarFallbackProps extends HTMLAttributes<HTMLSpanElement> {
  /** Delay in ms before showing fallback (avoids flash on slow images) */
  delayMs?: number;
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface AvatarContextValue {
  size: AvatarSize;
  shape: AvatarShape;
  imageLoaded: boolean;
  imageError: boolean;
  setImageLoaded: (v: boolean) => void;
  setImageError: (v: boolean) => void;
}

const AvatarContext = createContext<AvatarContextValue>({
  size: 'md',
  shape: 'circle',
  imageLoaded: false,
  imageError: false,
  setImageLoaded: () => undefined,
  setImageError: () => undefined,
});

// ─── Size Maps ────────────────────────────────────────────────────────────────

const containerSizes: Record<AvatarSize, string> = {
  xs: 'h-6  w-6  text-[10px]',
  sm: 'h-8  w-8  text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
  '2xl': 'h-20 w-20 text-xl',
};

const statusSizes: Record<AvatarSize, string> = {
  xs: 'h-1.5 w-1.5 ring-1',
  sm: 'h-2   w-2   ring-1',
  md: 'h-2.5 w-2.5 ring-2',
  lg: 'h-3   w-3   ring-2',
  xl: 'h-3.5 w-3.5 ring-2',
  '2xl': 'h-4  w-4   ring-2',
};

const statusColors: Record<AvatarStatus, string> = {
  online: 'bg-success-500',
  offline: 'bg-neutral-400',
  busy: 'bg-destructive-500',
  away: 'bg-warning-400',
};

const statusLabels: Record<AvatarStatus, string> = {
  online: 'Online',
  offline: 'Offline',
  busy: 'Busy',
  away: 'Away',
};

const shapeStyles: Record<AvatarShape, string> = {
  circle: 'rounded-full',
  square: 'rounded-lg',
};

// ─── Avatar Root ──────────────────────────────────────────────────────────────

/**
 * Avatar root container. Compose with AvatarImage and AvatarFallback.
 *
 * @example
 * <Avatar size="md">
 *   <AvatarImage src="/avatar.jpg" alt="Jane Doe" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { size = 'md', shape = 'circle', status, className, children, ...props },
  ref
) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <AvatarContext.Provider
      value={{ size, shape, imageLoaded, imageError, setImageLoaded, setImageError }}
    >
      <span
        ref={ref}
        className={cn(
          'relative inline-flex shrink-0 items-center justify-center overflow-hidden',
          'bg-muted font-medium text-muted-foreground',
          'select-none',
          containerSizes[size],
          shapeStyles[shape],
          className
        )}
        {...props}
      >
        {children}

        {/* Status indicator dot */}
        {status && (
          <span
            aria-label={statusLabels[status]}
            className={cn(
              'absolute bottom-0 right-0 rounded-full ring-background',
              statusSizes[size],
              statusColors[status]
            )}
          />
        )}
      </span>
    </AvatarContext.Provider>
  );
});

Avatar.displayName = 'Avatar';

// ─── AvatarImage ──────────────────────────────────────────────────────────────

/**
 * AvatarImage — The photo inside an Avatar. Falls back gracefully on error.
 * `alt` is required.
 */
export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(function AvatarImage(
  { alt, src, className, onLoad, onError, ...props },
  ref
) {
  const { shape, imageLoaded, imageError, setImageLoaded, setImageError } =
    useContext(AvatarContext);

  if (imageError) return null;

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={cn(
        'h-full w-full object-cover',
        shapeStyles[shape],
        !imageLoaded && 'invisible absolute',
        className
      )}
      onLoad={(e) => {
        setImageLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        setImageError(true);
        onError?.(e);
      }}
      {...props}
    />
  );
});

AvatarImage.displayName = 'AvatarImage';

// ─── AvatarFallback ───────────────────────────────────────────────────────────

/**
 * AvatarFallback — Rendered when the image is absent, loading, or errored.
 * Typically contains initials or a generic icon.
 */
export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  function AvatarFallback({ delayMs: _delayMs, className, children, ...props }, ref) {
    const { imageLoaded, imageError } = useContext(AvatarContext);

    // Only show fallback if image failed or never loaded
    if (imageLoaded && !imageError) return null;

    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={cn(
          'flex h-full w-full items-center justify-center',
          'font-semibold uppercase tracking-wide',
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

AvatarFallback.displayName = 'AvatarFallback';

// ─── AvatarGroup ─────────────────────────────────────────────────────────────

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum avatars to show before showing a "+N" overflow badge */
  max?: number;
  /** Size passed to all child Avatars */
  size?: AvatarSize;
}

/**
 * AvatarGroup — Stacks multiple Avatars with overlap.
 *
 * @example
 * <AvatarGroup max={3}>
 *   <Avatar><AvatarImage src="…" alt="User 1" /><AvatarFallback>U1</AvatarFallback></Avatar>
 *   <Avatar><AvatarImage src="…" alt="User 2" /><AvatarFallback>U2</AvatarFallback></Avatar>
 * </AvatarGroup>
 */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(function AvatarGroup(
  { max, size = 'md', className, children, ...props },
  ref
) {
  const childArray = Array.isArray(children) ? children : [children];
  const visible = max ? childArray.slice(0, max) : childArray;
  const overflow = max ? childArray.length - max : 0;

  return (
    <div ref={ref} role="group" className={cn('flex items-center', className)} {...props}>
      {visible.map((child, i) => (
        <span
          key={i}
          className="ring-2 ring-background rounded-full"
          style={{ marginLeft: i === 0 ? 0 : '-0.5rem' }}
        >
          {child}
        </span>
      ))}
      {overflow > 0 && (
        <span
          aria-label={`${overflow} more`}
          className={cn(
            'relative inline-flex shrink-0 items-center justify-center overflow-hidden',
            'rounded-full ring-2 ring-background',
            'bg-muted text-muted-foreground font-medium',
            containerSizes[size],
            'ml-[-0.5rem]'
          )}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
});

AvatarGroup.displayName = 'AvatarGroup';
