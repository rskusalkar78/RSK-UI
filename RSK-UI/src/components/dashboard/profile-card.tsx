import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Mail, MapPin } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Avatar, AvatarImage, AvatarFallback, AvatarStatus } from '../avatar/avatar';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';
import { Skeleton } from '../feedback/skeleton';

export interface ProfileStat {
  label: string;
  value: ReactNode;
}

export interface ProfileCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'role'> {
  /** User display name */
  name?: string;
  /** Role label or title (e.g. "Senior Frontend Engineer") */
  role?: ReactNode;
  /** Email address or contact link */
  email?: string;
  /** Location string */
  location?: string;
  /** Bio or summary description */
  bio?: ReactNode;
  /** Avatar image URL */
  avatarUrl?: string;
  /** Initials fallback for avatar */
  avatarFallback?: string;
  /** Online status indicator dot */
  status?: AvatarStatus;
  /** Banner cover background (image URL or CSS class e.g. "bg-gradient-to-r from-violet-600 to-indigo-600") */
  bannerBackground?: string;
  /** Key metrics/stats list (e.g. Projects, Tasks, Rating) */
  stats?: ProfileStat[];
  /** Primary action button label (e.g. "Follow" or "Edit Profile") */
  primaryActionText?: string;
  /** Primary action handler */
  onPrimaryAction?: () => void;
  /** Secondary action node slot */
  secondaryAction?: ReactNode;
  /** Top-right menu trigger or actions slot */
  headerAction?: ReactNode;
  /** Card visual layout style variant */
  variant?: 'default' | 'glass' | 'compact';
  /** Loading state */
  loading?: boolean;
}

export const ProfileCard = forwardRef<HTMLDivElement, ProfileCardProps>(function ProfileCard(
  {
    name = 'Anonymous User',
    role,
    email,
    location,
    bio,
    avatarUrl,
    avatarFallback,
    status = 'online',
    bannerBackground = 'bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600',
    stats = [],
    primaryActionText = 'View Profile',
    onPrimaryAction,
    secondaryAction,
    headerAction,
    variant = 'default',
    loading = false,
    className,
    ...props
  },
  ref
) {
  const computedFallback =
    avatarFallback ||
    name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-xs transition-all duration-200 hover:shadow-md',
        variant === 'glass' && 'bg-background/60 backdrop-blur-md border-border/80',
        variant === 'compact' && 'p-4',
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="space-y-4 p-5">
          <Skeleton className="h-24 w-full rounded-xl" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        <>
          {variant !== 'compact' && (
            <div
              className={cn(
                'relative h-24 w-full',
                bannerBackground.startsWith('http') ? '' : bannerBackground
              )}
              style={
                bannerBackground.startsWith('http')
                  ? { backgroundImage: `url(${bannerBackground})`, backgroundSize: 'cover' }
                  : undefined
              }
            >
              {headerAction && <div className="absolute top-3 right-3 z-10">{headerAction}</div>}
            </div>
          )}

          <div className={cn('p-5', variant !== 'compact' && '-mt-10')}>
            <div className="flex items-end justify-between gap-3">
              <Avatar
                size={variant === 'compact' ? 'lg' : 'xl'}
                status={status}
                className="ring-4 ring-card shadow-md"
              >
                {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
                <AvatarFallback>{computedFallback}</AvatarFallback>
              </Avatar>

              {variant === 'compact' && headerAction && <div>{headerAction}</div>}
            </div>

            <div className="mt-3 space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-foreground">{name}</h3>
                {role && (
                  <Badge variant="subtle" color="primary" size="sm">
                    {role}
                  </Badge>
                )}
              </div>

              {(email || location) && (
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>{email}</span>
                    </a>
                  )}
                  {location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{location}</span>
                    </span>
                  )}
                </div>
              )}

              {bio && <p className="pt-2 text-xs text-muted-foreground leading-relaxed">{bio}</p>}
            </div>

            {stats.length > 0 && (
              <div className="mt-4 grid grid-cols-3 divide-x divide-border/60 rounded-xl bg-muted/50 p-3 text-center">
                {stats.map((stat, idx) => (
                  <div key={idx} className="px-2">
                    <div className="text-base font-bold text-foreground">{stat.value}</div>
                    <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(primaryActionText || secondaryAction) && (
              <div className="mt-4 flex items-center gap-2">
                {primaryActionText && (
                  <Button
                    variant="solid"
                    size="sm"
                    className="w-full justify-center"
                    onClick={onPrimaryAction}
                  >
                    {primaryActionText}
                  </Button>
                )}
                {secondaryAction}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
});

ProfileCard.displayName = 'ProfileCard';
