import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AddClientButton from '@/app/dashboard/clients/ui/addClientButton';

const mockWorkStatuses = [
  { value: 'new', label: 'Новый' },
  { value: 'inProgress', label: 'В работе' },
  { value: 'completed', label: 'Завершен' },
];

const mockPhysicalStatuses = [
  { value: 'successful', label: 'Успешный' },
  { value: 'lost', label: 'Потерянный' },
];

vi.mock('@/app/components/share/protected', () => ({
  default: ({ children }: any) => <div data-testid="user-protected">{children}</div>,
}));

vi.mock('@/app/hooks/useTimeoutAnimationLoader', () => ({
  default: () => true,
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('AddClientButton', () => {
  const mockOnAdd = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('рендерит кнопку "Добавить клиента"', () => {
    render(
      <AddClientButton
        workStatuses={mockWorkStatuses}
        physicalStatuses={mockPhysicalStatuses}
        onAdd={mockOnAdd}
      />
    );
    expect(screen.getByText('+ Добавить клиента')).toBeInTheDocument();
  });

  it('открывает форму при клике на кнопку', async () => {
    const user = userEvent.setup();
    render(
      <AddClientButton
        workStatuses={mockWorkStatuses}
        physicalStatuses={mockPhysicalStatuses}
        onAdd={mockOnAdd}
      />
    );
    await user.click(screen.getByText('+ Добавить клиента'));
    expect(screen.getByText('Новый клиент')).toBeInTheDocument();
  });

  it('закрывает форму при клике на "Отмена"', async () => {
    const user = userEvent.setup();
    render(
      <AddClientButton
        workStatuses={mockWorkStatuses}
        physicalStatuses={mockPhysicalStatuses}
        onAdd={mockOnAdd}
      />
    );
    await user.click(screen.getByText('+ Добавить клиента'));
    await user.click(screen.getByText('Отмена'));
    expect(screen.queryByText('Новый клиент')).not.toBeInTheDocument();
  });

  it('вызывает onAdd при сохранении', async () => {
    const user = userEvent.setup();
    render(
      <AddClientButton
        workStatuses={mockWorkStatuses}
        physicalStatuses={mockPhysicalStatuses}
        onAdd={mockOnAdd}
      />
    );
    await user.click(screen.getByText('+ Добавить клиента'));
    await user.type(screen.getByPlaceholderText('Введите имя или название компании'), 'Новый клиент');
    await user.click(screen.getByText('Добавить'));
    expect(mockOnAdd).toHaveBeenCalled();
  });

  it('обёрнут в UserProtected', () => {
    render(
      <AddClientButton
        workStatuses={mockWorkStatuses}
        physicalStatuses={mockPhysicalStatuses}
        onAdd={mockOnAdd}
      />
    );
    expect(screen.getByTestId('user-protected')).toBeInTheDocument();
  });
});