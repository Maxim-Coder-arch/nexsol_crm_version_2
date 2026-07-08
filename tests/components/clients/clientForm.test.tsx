import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ClientForm from '@/app/dashboard/clients/ui/clientForm';

const mockWorkStatuses = [
  { value: 'new', label: 'Новый' },
  { value: 'inProgress', label: 'В работе' },
  { value: 'completed', label: 'Завершен' },
];

const mockPhysicalStatuses = [
  { value: 'successful', label: 'Успешный' },
  { value: 'lost', label: 'Потерянный' },
];

describe('ClientForm', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('рендерит форму с полями', () => {
    render(
      <ClientForm
        workStatuses={mockWorkStatuses}
        physicalStatuses={mockPhysicalStatuses}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );
    expect(screen.getByPlaceholderText('Введите имя или название компании')).toBeInTheDocument();
    expect(screen.getByText('Рабочий статус')).toBeInTheDocument();
    expect(screen.getByText('Физический статус')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Введите комментарий...')).toBeInTheDocument();
    expect(screen.getByText('Дополнительные данные')).toBeInTheDocument();
  });

  it('отображает заголовок "Новый клиент"', () => {
    render(
      <ClientForm
        workStatuses={mockWorkStatuses}
        physicalStatuses={mockPhysicalStatuses}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );
    expect(screen.getByText('Новый клиент')).toBeInTheDocument();
  });

  it('отображает заголовок "Редактировать клиента" при initialData', () => {
    render(
      <ClientForm
        initialData={{
          name: 'Тестовый клиент',
          workStatus: 'new',
          physicalStatus: 'successful',
          comment: 'Тестовый комментарий',
          additionalData: [],
        }}
        workStatuses={mockWorkStatuses}
        physicalStatuses={mockPhysicalStatuses}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );
    expect(screen.getByText('Редактировать клиента')).toBeInTheDocument();
  });

  it('заполняет поля initialData', () => {
    render(
      <ClientForm
        initialData={{
          name: 'Тестовый клиент',
          workStatus: 'inProgress',
          physicalStatus: 'lost',
          comment: 'Тестовый комментарий',
          additionalData: [{ key: 'Телефон', value: '+7 (999) 123-45-67' }],
        }}
        workStatuses={mockWorkStatuses}
        physicalStatuses={mockPhysicalStatuses}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );
    expect(screen.getByDisplayValue('Тестовый клиент')).toBeInTheDocument();
    // select'ы проверяем по выбранному значению
    const selects = screen.getAllByRole('combobox');
    expect(selects[0]).toHaveValue('inProgress');
    expect(selects[1]).toHaveValue('lost');
    expect(screen.getByDisplayValue('Тестовый комментарий')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Телефон')).toBeInTheDocument();
    expect(screen.getByDisplayValue('+7 (999) 123-45-67')).toBeInTheDocument();
  });

  it('добавляет новое поле дополнительных данных', async () => {
    const user = userEvent.setup();
    render(
      <ClientForm
        workStatuses={mockWorkStatuses}
        physicalStatuses={mockPhysicalStatuses}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );
    const addBtn = screen.getByText('+ Добавить поле');
    await user.click(addBtn);
    const inputs = screen.getAllByPlaceholderText('Ключ (например: Телефон)');
    expect(inputs.length).toBe(2);
  });

  it('удаляет поле дополнительных данных', async () => {
    const user = userEvent.setup();
    render(
      <ClientForm
        initialData={{
          name: 'Тестовый клиент',
          workStatus: 'new',
          physicalStatus: 'successful',
          comment: '',
          additionalData: [
            { key: 'Телефон', value: '+7 (999) 123-45-67' },
            { key: 'Telegram', value: '@client' },
          ],
        }}
        workStatuses={mockWorkStatuses}
        physicalStatuses={mockPhysicalStatuses}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );
    const deleteBtns = screen.getAllByText('✕');
    await user.click(deleteBtns[0]);
    const inputs = screen.getAllByPlaceholderText('Ключ (например: Телефон)');
    expect(inputs.length).toBe(1);
  });

  it('вызывает onSubmit при сабмите', async () => {
    const user = userEvent.setup();
    render(
      <ClientForm
        workStatuses={mockWorkStatuses}
        physicalStatuses={mockPhysicalStatuses}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );
    await user.type(screen.getByPlaceholderText('Введите имя или название компании'), 'Новый клиент');
    await user.click(screen.getByText('Добавить'));
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('вызывает onCancel при клике на "Отмена"', async () => {
    const user = userEvent.setup();
    render(
      <ClientForm
        workStatuses={mockWorkStatuses}
        physicalStatuses={mockPhysicalStatuses}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );
    await user.click(screen.getByText('Отмена'));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('показывает alert если имя пустое', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const user = userEvent.setup();
    render(
      <ClientForm
        workStatuses={mockWorkStatuses}
        physicalStatuses={mockPhysicalStatuses}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );
    await user.click(screen.getByText('Добавить'));
    expect(alertMock).toHaveBeenCalledWith('Введите имя клиента');
    alertMock.mockRestore();
  });

  it('не показывает alert если имя заполнено', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const user = userEvent.setup();
    render(
      <ClientForm
        workStatuses={mockWorkStatuses}
        physicalStatuses={mockPhysicalStatuses}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );
    await user.type(screen.getByPlaceholderText('Введите имя или название компании'), 'Клиент');
    await user.click(screen.getByText('Добавить'));
    expect(alertMock).not.toHaveBeenCalled();
    alertMock.mockRestore();
  });
});