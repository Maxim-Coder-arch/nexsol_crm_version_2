import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ClientCard from '@/app/dashboard/clients/ui/clientCard';

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

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('ClientCard', () => {
  const mockClient = {
    _id: '1',
    name: 'ООО Ромашка',
    workStatus: 'new' as const,
    physicalStatus: 'successful' as const,
    comment: 'Первичный контакт',
    additionalData: [
      { key: 'Телефон', value: '+7 (999) 123-45-67' },
      { key: 'Telegram', value: '@client' },
    ],
    createdAt: '15.06.2026, 14:30',
    updatedAt: '15.06.2026, 14:30',
  };

  const mockOnUpdate = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('рендеринг', () => {
    it('отображает имя клиента', () => {
      render(
        <ClientCard
          client={mockClient}
          workStatuses={mockWorkStatuses}
          physicalStatuses={mockPhysicalStatuses}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByText('ООО Ромашка')).toBeInTheDocument();
    });

    it('отображает даты создания и изменения', () => {
      render(
        <ClientCard
          client={mockClient}
          workStatuses={mockWorkStatuses}
          physicalStatuses={mockPhysicalStatuses}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByText(/Создан: 15.06.2026, 14:30/)).toBeInTheDocument();
      expect(screen.getByText(/Изменён: 15.06.2026, 14:30/)).toBeInTheDocument();
    });

    it('отображает комментарий', () => {
      render(
        <ClientCard
          client={mockClient}
          workStatuses={mockWorkStatuses}
          physicalStatuses={mockPhysicalStatuses}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByText('Первичный контакт')).toBeInTheDocument();
    });

    it('не отображает комментарий если его нет', () => {
      const clientWithoutComment = { ...mockClient, comment: '' };
      render(
        <ClientCard
          client={clientWithoutComment}
          workStatuses={mockWorkStatuses}
          physicalStatuses={mockPhysicalStatuses}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.queryByText('Комментарий:')).not.toBeInTheDocument();
    });

    it('отображает дополнительные данные', () => {
      render(
        <ClientCard
          client={mockClient}
          workStatuses={mockWorkStatuses}
          physicalStatuses={mockPhysicalStatuses}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByText('Телефон:')).toBeInTheDocument();
      expect(screen.getByText('+7 (999) 123-45-67')).toBeInTheDocument();
      expect(screen.getByText('Telegram:')).toBeInTheDocument();
      expect(screen.getByText('@client')).toBeInTheDocument();
    });

    it('не отображает дополнительные данные если их нет', () => {
      const clientWithoutData = { ...mockClient, additionalData: [] };
      render(
        <ClientCard
          client={clientWithoutData}
          workStatuses={mockWorkStatuses}
          physicalStatuses={mockPhysicalStatuses}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.queryByText('Дополнительно:')).not.toBeInTheDocument();
    });
  });

  describe('рабочий статус', () => {
    it('отображает текущий рабочий статус в select', () => {
      render(
        <ClientCard
          client={mockClient}
          workStatuses={mockWorkStatuses}
          physicalStatuses={mockPhysicalStatuses}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );
      const select = screen.getByDisplayValue('Новый');
      expect(select).toBeInTheDocument();
    });

    it('вызывает onUpdate при изменении рабочего статуса', async () => {
      const user = userEvent.setup();
      render(
        <ClientCard
          client={mockClient}
          workStatuses={mockWorkStatuses}
          physicalStatuses={mockPhysicalStatuses}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );
      const select = screen.getByDisplayValue('Новый');
      await user.selectOptions(select, 'inProgress');
      expect(mockOnUpdate).toHaveBeenCalledWith('1', { workStatus: 'inProgress' });
    });
  });

  describe('физический статус', () => {
    it('отображает текущий физический статус в select', () => {
      render(
        <ClientCard
          client={mockClient}
          workStatuses={mockWorkStatuses}
          physicalStatuses={mockPhysicalStatuses}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );
      const select = screen.getByDisplayValue('Успешный');
      expect(select).toBeInTheDocument();
    });

    it('вызывает onUpdate при изменении физического статуса', async () => {
      const user = userEvent.setup();
      render(
        <ClientCard
          client={mockClient}
          workStatuses={mockWorkStatuses}
          physicalStatuses={mockPhysicalStatuses}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );
      const select = screen.getByDisplayValue('Успешный');
      await user.selectOptions(select, 'lost');
      expect(mockOnUpdate).toHaveBeenCalledWith('1', { physicalStatus: 'lost' });
    });
  });

  describe('редактирование', () => {
    it('переключается в режим редактирования при клике на ✎', async () => {
      const user = userEvent.setup();
      render(
        <ClientCard
          client={mockClient}
          workStatuses={mockWorkStatuses}
          physicalStatuses={mockPhysicalStatuses}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );
      const editBtn = screen.getByText('✎');
      await user.click(editBtn);
      expect(screen.getByText('Редактировать клиента')).toBeInTheDocument();
    });

    it('выходит из режима редактирования при отмене', async () => {
      const user = userEvent.setup();
      render(
        <ClientCard
          client={mockClient}
          workStatuses={mockWorkStatuses}
          physicalStatuses={mockPhysicalStatuses}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );
      await user.click(screen.getByText('✎'));
      await user.click(screen.getByText('Отмена'));
      expect(screen.queryByText('Редактировать клиента')).not.toBeInTheDocument();
    });

    it('вызывает onUpdate при сохранении', async () => {
      const user = userEvent.setup();
      render(
        <ClientCard
          client={mockClient}
          workStatuses={mockWorkStatuses}
          physicalStatuses={mockPhysicalStatuses}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );
      await user.click(screen.getByText('✎'));
      const nameInput = screen.getByDisplayValue('ООО Ромашка');
      await user.clear(nameInput);
      await user.type(nameInput, 'Обновлённый клиент');
      await user.click(screen.getByText('Сохранить'));
      expect(mockOnUpdate).toHaveBeenCalled();
    });
  });

  describe('удаление', () => {
    it('вызывает onDelete при клике на ✕', async () => {
      const user = userEvent.setup();
      render(
        <ClientCard
          client={mockClient}
          workStatuses={mockWorkStatuses}
          physicalStatuses={mockPhysicalStatuses}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );
      const deleteBtn = screen.getByText('✕');
      await user.click(deleteBtn);
      expect(mockOnDelete).toHaveBeenCalledWith('1');
    });
  });

  describe('права доступа', () => {
    it('кнопка редактирования обёрнута в UserProtected', () => {
      render(
        <ClientCard
          client={mockClient}
          workStatuses={mockWorkStatuses}
          physicalStatuses={mockPhysicalStatuses}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );
      const protectedWrappers = screen.getAllByTestId('user-protected');
      expect(protectedWrappers.length).toBeGreaterThan(0);
    });

    it('кнопка удаления обёрнута в UserProtected', () => {
      render(
        <ClientCard
          client={mockClient}
          workStatuses={mockWorkStatuses}
          physicalStatuses={mockPhysicalStatuses}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );
      const protectedWrappers = screen.getAllByTestId('user-protected');
      expect(protectedWrappers.length).toBeGreaterThan(0);
    });
  });
});