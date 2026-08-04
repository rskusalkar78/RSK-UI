import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from './avatar';

// ─── Avatar Root ──────────────────────────────────────────────────────────────

describe('Avatar — Render', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders as a <span>', () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(container.querySelector('span')).toBeInTheDocument();
  });
});

describe('Avatar — Sizes', () => {
  it.each(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const)('renders %s size', (size) => {
    const { container } = render(
      <Avatar size={size}>
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe('Avatar — Shapes', () => {
  it('applies rounded-full for circle shape', () => {
    const { container } = render(
      <Avatar shape="circle">
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    );
    expect(container.firstChild).toHaveClass('rounded-full');
  });

  it('applies rounded-lg for square shape', () => {
    const { container } = render(
      <Avatar shape="square">
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    );
    expect(container.firstChild).toHaveClass('rounded-lg');
  });
});

describe('Avatar — Status', () => {
  it('renders status indicator when status is provided', () => {
    render(
      <Avatar status="online">
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByLabelText('Online')).toBeInTheDocument();
  });

  it('does not render status indicator without status prop', () => {
    render(
      <Avatar>
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    );
    expect(screen.queryByLabelText('Online')).not.toBeInTheDocument();
  });

  it.each(['online', 'offline', 'busy', 'away'] as const)('renders %s status', (status) => {
    render(
      <Avatar status={status}>
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    );
    const labels: Record<string, string> = {
      online: 'Online',
      offline: 'Offline',
      busy: 'Busy',
      away: 'Away',
    };
    expect(screen.getByLabelText(labels[status]!)).toBeInTheDocument();
  });
});

describe('Avatar — forwardRef', () => {
  it('forwards ref to root span', () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Avatar ref={ref}>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});

// ─── AvatarImage ──────────────────────────────────────────────────────────────

describe('AvatarImage — Render', () => {
  it('renders an img element', () => {
    render(
      <Avatar>
        <AvatarImage src="/avatar.jpg" alt="Jane Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByRole('img', { name: 'Jane Doe' })).toBeInTheDocument();
  });

  it('shows fallback on image error', () => {
    render(
      <Avatar>
        <AvatarImage src="/broken.jpg" alt="Error" />
        <AvatarFallback>FB</AvatarFallback>
      </Avatar>
    );
    const img = screen.getByRole('img', { name: 'Error' });
    fireEvent.error(img);
    expect(screen.getByText('FB')).toBeInTheDocument();
  });
});

// ─── AvatarFallback ───────────────────────────────────────────────────────────

describe('AvatarFallback — Render', () => {
  it('renders initials', () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText('AB')).toBeInTheDocument();
  });
});

// ─── AvatarGroup ─────────────────────────────────────────────────────────────

describe('AvatarGroup — Render', () => {
  it('renders all avatars when no max', () => {
    render(
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('shows overflow badge when max is exceeded', () => {
    render(
      <AvatarGroup max={2}>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>D</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    );
    expect(screen.getByLabelText('2 more')).toBeInTheDocument();
  });
});
