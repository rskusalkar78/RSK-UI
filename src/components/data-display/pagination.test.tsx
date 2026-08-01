import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from './pagination';

// ─── Render ───────────────────────────────────────────────────────────────────

describe('Pagination — Render', () => {
  it('renders pagination controls', () => {
    const handlePageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={10} onPageChange={handlePageChange} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders page numbers', () => {
    const handlePageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />);
    expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to page 5')).toBeInTheDocument();
  });

  it('renders previous and next buttons', () => {
    const handlePageChange = vi.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={handlePageChange} />);
    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
  });
});

// ─── Page Navigation ──────────────────────────────────────────────────────────

describe('Pagination — Page Navigation', () => {
  it('calls onPageChange when page button is clicked', async () => {
    const user = userEvent.setup();
    const handlePageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />);

    await user.click(screen.getByLabelText('Go to page 3'));
    expect(handlePageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange when next button is clicked', async () => {
    const user = userEvent.setup();
    const handlePageChange = vi.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={handlePageChange} />);

    await user.click(screen.getByLabelText('Go to next page'));
    expect(handlePageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange when previous button is clicked', async () => {
    const user = userEvent.setup();
    const handlePageChange = vi.fn();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />);

    await user.click(screen.getByLabelText('Go to previous page'));
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });
});

// ─── First/Last Buttons ───────────────────────────────────────────────────────

describe('Pagination — First/Last Buttons', () => {
  it('shows first/last buttons when showFirstLast is true', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={handlePageChange} showFirstLast />
    );
    expect(screen.getByLabelText('Go to first page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to last page')).toBeInTheDocument();
  });

  it('hides first/last buttons by default', () => {
    const handlePageChange = vi.fn();
    render(<Pagination currentPage={5} totalPages={10} onPageChange={handlePageChange} />);
    expect(screen.queryByLabelText('Go to first page')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Go to last page')).not.toBeInTheDocument();
  });

  it('calls onPageChange when first button is clicked', async () => {
    const user = userEvent.setup();
    const handlePageChange = vi.fn();
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={handlePageChange} showFirstLast />
    );

    await user.click(screen.getByLabelText('Go to first page'));
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange when last button is clicked', async () => {
    const user = userEvent.setup();
    const handlePageChange = vi.fn();
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={handlePageChange} showFirstLast />
    );

    await user.click(screen.getByLabelText('Go to last page'));
    expect(handlePageChange).toHaveBeenCalledWith(10);
  });
});

// ─── Boundary States ──────────────────────────────────────────────────────────

describe('Pagination — Boundary States', () => {
  it('disables previous button on first page', () => {
    const handlePageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />);
    expect(screen.getByLabelText('Go to previous page')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    const handlePageChange = vi.fn();
    render(<Pagination currentPage={5} totalPages={5} onPageChange={handlePageChange} />);
    expect(screen.getByLabelText('Go to next page')).toBeDisabled();
  });

  it('disables first button on first page', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} showFirstLast />
    );
    expect(screen.getByLabelText('Go to first page')).toBeDisabled();
  });

  it('disables last button on last page', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={handlePageChange} showFirstLast />
    );
    expect(screen.getByLabelText('Go to last page')).toBeDisabled();
  });
});

// ─── Active Page ──────────────────────────────────────────────────────────────

describe('Pagination — Active Page', () => {
  it('highlights current page', () => {
    const handlePageChange = vi.fn();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />);
    const currentButton = screen.getByLabelText('Go to page 3');
    expect(currentButton).toHaveAttribute('aria-current', 'page');
  });

  it('applies active styling to current page', () => {
    const handlePageChange = vi.fn();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />);
    const currentButton = screen.getByLabelText('Go to page 3');
    expect(currentButton).toHaveClass('bg-primary');
  });
});

// ─── Ellipsis ─────────────────────────────────────────────────────────────────

describe('Pagination — Ellipsis', () => {
  it('shows ellipsis for many pages', () => {
    const handlePageChange = vi.fn();
    const { container } = render(
      <Pagination currentPage={5} totalPages={20} onPageChange={handlePageChange} />
    );
    // Ellipsis should be present
    const ellipsis = container.querySelectorAll('span[aria-hidden="true"]');
    expect(ellipsis.length).toBeGreaterThan(0);
  });

  it('does not show ellipsis for few pages', () => {
    const handlePageChange = vi.fn();
    const { container } = render(
      <Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />
    );
    const ellipsis = container.querySelectorAll('span[aria-hidden="true"]');
    expect(ellipsis).toHaveLength(0);
  });

  it('shows all pages when totalPages is small', () => {
    const handlePageChange = vi.fn();
    render(<Pagination currentPage={2} totalPages={7} onPageChange={handlePageChange} />);
    expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to page 7')).toBeInTheDocument();
  });
});

// ─── Page Size ────────────────────────────────────────────────────────────────

describe('Pagination — Page Size', () => {
  it('shows page size selector when showPageSize is true', () => {
    const handlePageChange = vi.fn();
    const handlePageSizeChange = vi.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={handlePageChange}
        showPageSize
        onPageSizeChange={handlePageSizeChange}
        pageSize={10}
      />
    );
    expect(screen.getByLabelText('Items per page')).toBeInTheDocument();
  });

  it('hides page size selector by default', () => {
    const handlePageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={10} onPageChange={handlePageChange} />);
    expect(screen.queryByLabelText('Items per page')).not.toBeInTheDocument();
  });

  it('calls onPageSizeChange when page size changes', async () => {
    const user = userEvent.setup();
    const handlePageChange = vi.fn();
    const handlePageSizeChange = vi.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={handlePageChange}
        showPageSize
        onPageSizeChange={handlePageSizeChange}
        pageSize={10}
        pageSizeOptions={[10, 20, 50]}
      />
    );

    await user.selectOptions(screen.getByLabelText('Items per page'), '20');
    expect(handlePageSizeChange).toHaveBeenCalledWith(20);
  });

  it('renders custom page size options', () => {
    const handlePageChange = vi.fn();
    const handlePageSizeChange = vi.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={handlePageChange}
        showPageSize
        onPageSizeChange={handlePageSizeChange}
        pageSize={10}
        pageSizeOptions={[5, 15, 25]}
      />
    );

    const select = screen.getByLabelText('Items per page') as HTMLSelectElement;
    expect(select.options).toHaveLength(3);
    expect(select.options[0].value).toBe('5');
    expect(select.options[1].value).toBe('15');
    expect(select.options[2].value).toBe('25');
  });
});

// ─── Info Display ─────────────────────────────────────────────────────────────

describe('Pagination — Info Display', () => {
  it('shows info text when showInfo is true', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={handlePageChange}
        showInfo
        totalItems={95}
        pageSize={10}
      />
    );
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === 'Showing 1 to 10 of 95 items';
      })
    ).toBeInTheDocument();
  });

  it('hides info text by default', () => {
    const handlePageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={10} onPageChange={handlePageChange} />);
    expect(screen.queryByText(/Showing/)).not.toBeInTheDocument();
  });

  it('calculates correct item range for middle pages', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={handlePageChange}
        showInfo
        totalItems={95}
        pageSize={10}
      />
    );
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === 'Showing 21 to 30 of 95 items';
      })
    ).toBeInTheDocument();
  });

  it('calculates correct item range for last page', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination
        currentPage={10}
        totalPages={10}
        onPageChange={handlePageChange}
        showInfo
        totalItems={95}
        pageSize={10}
      />
    );
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === 'Showing 91 to 95 of 95 items';
      })
    ).toBeInTheDocument();
  });
});

// ─── Disabled State ───────────────────────────────────────────────────────────

describe('Pagination — Disabled State', () => {
  it('disables all buttons when disabled is true', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={handlePageChange}
        disabled
        showFirstLast
      />
    );

    expect(screen.getByLabelText('Go to first page')).toBeDisabled();
    expect(screen.getByLabelText('Go to previous page')).toBeDisabled();
    expect(screen.getByLabelText('Go to page 5')).toBeDisabled();
    expect(screen.getByLabelText('Go to next page')).toBeDisabled();
    expect(screen.getByLabelText('Go to last page')).toBeDisabled();
  });

  it('does not call onPageChange when disabled', async () => {
    const user = userEvent.setup();
    const handlePageChange = vi.fn();
    render(<Pagination currentPage={5} totalPages={10} onPageChange={handlePageChange} disabled />);

    await user.click(screen.getByLabelText('Go to next page'));
    expect(handlePageChange).not.toHaveBeenCalled();
  });
});

// ─── Sizes ────────────────────────────────────────────────────────────────────

describe('Pagination — Sizes', () => {
  it('renders small size', () => {
    const handlePageChange = vi.fn();
    const { container } = render(
      <Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} size="sm" />
    );
    const button = container.querySelector('button');
    expect(button).toHaveClass('h-8');
  });

  it('renders medium size (default)', () => {
    const handlePageChange = vi.fn();
    const { container } = render(
      <Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} size="md" />
    );
    const button = container.querySelector('button');
    expect(button).toHaveClass('h-9');
  });

  it('renders large size', () => {
    const handlePageChange = vi.fn();
    const { container } = render(
      <Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} size="lg" />
    );
    const button = container.querySelector('button');
    expect(button).toHaveClass('h-10');
  });
});

// ─── forwardRef ───────────────────────────────────────────────────────────────

describe('Pagination — forwardRef', () => {
  it('forwards ref to the nav element', () => {
    const ref = createRef<HTMLElement>();
    const handlePageChange = vi.fn();
    render(<Pagination ref={ref} currentPage={1} totalPages={5} onPageChange={handlePageChange} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('NAV');
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('Pagination — Accessibility', () => {
  it('has navigation role', () => {
    const handlePageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('has aria-label on navigation', () => {
    const handlePageChange = vi.fn();
    const { container } = render(
      <Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />
    );
    const nav = container.querySelector('nav');
    expect(nav).toHaveAttribute('aria-label', 'Pagination');
  });

  it('has aria-label on buttons', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={handlePageChange} showFirstLast />
    );
    expect(screen.getByLabelText('Go to first page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to last page')).toBeInTheDocument();
  });

  it('has aria-current on active page', () => {
    const handlePageChange = vi.fn();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />);
    const activeButton = screen.getByLabelText('Go to page 3');
    expect(activeButton).toHaveAttribute('aria-current', 'page');
  });
});
