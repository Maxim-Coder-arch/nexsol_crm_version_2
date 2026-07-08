import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import BidCard from '@/app/dashboard/bids/ui/bidCard';

vi.mock('@/app/components/share/protected', () => ({
  default: ({ children, roles }: any) => <div data-testid="user-protected" data-roles={roles.join(',')}>{children}</div>,
}));

describe('BidCard', () => {
  const mockBid = {
    _id: '1',
    name: 'Тестовая заявка',
    email: 'test@test.ru',
    contact: 'https://vk.com/test',
    message: 'Тестовое сообщение',
    source: 'website',
    status: 'new',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  };

  const mockOnStatusChange = vi.fn();
  const mockOnDelete = vi.fn();

  it('рендерит имя заявки', () => {
    render(
      <BidCard
        bid={mockBid}
        onStatusChange={mockOnStatusChange}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText('Тестовая заявка')).toBeInTheDocument();
  });

  it('рендерит email', () => {
    render(
      <BidCard
        bid={mockBid}
        onStatusChange={mockOnStatusChange}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText('test@test.ru')).toBeInTheDocument();
  });

  it('рендерит сообщение', () => {
    render(
      <BidCard
        bid={mockBid}
        onStatusChange={mockOnStatusChange}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText('Тестовое сообщение')).toBeInTheDocument();
  });

  it('не рендерит контакт если он отсутствует', () => {
    const bidWithoutContact = {
      ...mockBid,
      contact: '',
    };
    render(
      <BidCard
        bid={bidWithoutContact}
        onStatusChange={mockOnStatusChange}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.queryByText('Контакт:')).not.toBeInTheDocument();
  });

  it('не рендерит сообщение если оно отсутствует', () => {
    const bidWithoutMessage = {
      ...mockBid,
      message: '',
    };
    render(
      <BidCard
        bid={bidWithoutMessage}
        onStatusChange={mockOnStatusChange}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.queryByText('Тестовое сообщение')).not.toBeInTheDocument();
  });

  it('вызывает onDelete при клике на кнопку удаления', async () => {
    const user = userEvent.setup();
    render(
      <BidCard
        bid={mockBid}
        onStatusChange={mockOnStatusChange}
        onDelete={mockOnDelete}
      />
    );
    const deleteBtn = screen.getByText('Удалить');
    await user.click(deleteBtn);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('вызывает onStatusChange при изменении статуса', async () => {
    const user = userEvent.setup();
    render(
      <BidCard
        bid={mockBid}
        onStatusChange={mockOnStatusChange}
        onDelete={mockOnDelete}
      />
    );
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'inProgress');
    expect(mockOnStatusChange).toHaveBeenCalledWith('inProgress');
  });

  it('показывает правильный статус в select', () => {
    render(
      <BidCard
        bid={mockBid}
        onStatusChange={mockOnStatusChange}
        onDelete={mockOnDelete}
      />
    );
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('new');
  });

  it('оборачивает select в UserProtected с правильными ролями', () => {
    render(
      <BidCard
        bid={mockBid}
        onStatusChange={mockOnStatusChange}
        onDelete={mockOnDelete}
      />
    );
    const protectedWrapper = screen.getAllByTestId('user-protected')[0];
    expect(protectedWrapper).toHaveAttribute('data-roles', 'manager,director');
  });

  it('оборачивает кнопку удаления в UserProtected с правильными ролями', () => {
    render(
      <BidCard
        bid={mockBid}
        onStatusChange={mockOnStatusChange}
        onDelete={mockOnDelete}
      />
    );
    const protectedWrapper = screen.getAllByTestId('user-protected')[1];
    expect(protectedWrapper).toHaveAttribute('data-roles', 'director');
  });
});