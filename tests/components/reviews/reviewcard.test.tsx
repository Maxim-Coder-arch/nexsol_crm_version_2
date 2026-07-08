import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ReviewCard from '@/app/dashboard/reviews/ui/reviewCard';

vi.mock('@/app/components/share/protected', () => ({
  default: ({ children, roles }: any) => <div data-testid="user-protected" data-roles={roles?.join(',') || ''}>{children}</div>,
}));

describe('ReviewCard', () => {
  const mockReview = {
    _id: '1',
    name: 'Тестовый пользователь',
    role: 'Директор',
    text: 'Отличный сервис! Всё быстро и качественно.',
    rating: 5,
    status: 'new' as const,
    createdAt: '22.06.2025, 9:30',
    updatedAt: '22.06.2025, 9:30',
  };

  const mockOnApprove = vi.fn();
  const mockOnDelete = vi.fn();

  describe('рендеринг', () => {
    it('отображает имя пользователя', () => {
      render(
        <ReviewCard
          review={mockReview}
          type="new"
          onApprove={mockOnApprove}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByText('Тестовый пользователь')).toBeInTheDocument();
    });

    it('отображает роль пользователя', () => {
      render(
        <ReviewCard
          review={mockReview}
          type="new"
          onApprove={mockOnApprove}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByText('Директор')).toBeInTheDocument();
    });

    it('отображает текст отзыва', () => {
      render(
        <ReviewCard
          review={mockReview}
          type="new"
          onApprove={mockOnApprove}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByText('Отличный сервис! Всё быстро и качественно.')).toBeInTheDocument();
    });

    it('отображает рейтинг в виде звёзд', () => {
      render(
        <ReviewCard
          review={mockReview}
          type="new"
          onApprove={mockOnApprove}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByText('★★★★★')).toBeInTheDocument();
    });

    it('отображает рейтинг 3 звезды', () => {
      const reviewWith3Stars = { ...mockReview, rating: 3 };
      render(
        <ReviewCard
          review={reviewWith3Stars}
          type="new"
          onApprove={mockOnApprove}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByText('★★★☆☆')).toBeInTheDocument();
    });

    it('отображает дату создания', () => {
      render(
        <ReviewCard
          review={mockReview}
          type="new"
          onApprove={mockOnApprove}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByText(/Добавлено: 22.06.2025, 9:30/)).toBeInTheDocument();
    });

    it('отображает дату изменения', () => {
      render(
        <ReviewCard
          review={mockReview}
          type="new"
          onApprove={mockOnApprove}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByText(/Изменено: 22.06.2025, 9:30/)).toBeInTheDocument();
    });
  });

  describe('кнопка "Добавить на сайт"', () => {
    it('отображается для новых отзывов', () => {
      render(
        <ReviewCard
          review={mockReview}
          type="new"
          onApprove={mockOnApprove}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByText('Добавить на сайт')).toBeInTheDocument();
    });

    it('не отображается для одобренных отзывов', () => {
      render(
        <ReviewCard
          review={mockReview}
          type="approved"
          onApprove={mockOnApprove}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.queryByText('Добавить на сайт')).not.toBeInTheDocument();
    });

    it('вызывает onApprove при клике', async () => {
      const user = userEvent.setup();
      render(
        <ReviewCard
          review={mockReview}
          type="new"
          onApprove={mockOnApprove}
          onDelete={mockOnDelete}
        />
      );
      const approveBtn = screen.getByText('Добавить на сайт');
      await user.click(approveBtn);
      expect(mockOnApprove).toHaveBeenCalledWith('1');
      expect(mockOnApprove).toHaveBeenCalledTimes(1);
    });

    it('обёрнут в UserProtected с ролями director и manager', () => {
      render(
        <ReviewCard
          review={mockReview}
          type="new"
          onApprove={mockOnApprove}
          onDelete={mockOnDelete}
        />
      );
      const protectedWrappers = screen.getAllByTestId('user-protected');
      const approveWrapper = protectedWrappers[0];
      expect(approveWrapper).toHaveAttribute('data-roles', 'director,manager');
    });
  });

  describe('кнопка "Удалить"', () => {
    it('всегда отображается', () => {
      render(
        <ReviewCard
          review={mockReview}
          type="new"
          onApprove={mockOnApprove}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByText('Удалить')).toBeInTheDocument();
    });

    it('вызывает onDelete при клике', async () => {
      const user = userEvent.setup();
      render(
        <ReviewCard
          review={mockReview}
          type="new"
          onApprove={mockOnApprove}
          onDelete={mockOnDelete}
        />
      );
      const deleteBtn = screen.getByText('Удалить');
      await user.click(deleteBtn);
      expect(mockOnDelete).toHaveBeenCalledWith('1');
      expect(mockOnDelete).toHaveBeenCalledTimes(1);
    });

    it('обёрнут в UserProtected с ролью director', () => {
      render(
        <ReviewCard
          review={mockReview}
          type="new"
          onApprove={mockOnApprove}
          onDelete={mockOnDelete}
        />
      );
      const protectedWrappers = screen.getAllByTestId('user-protected');
      const deleteWrapper = protectedWrappers[1];
      expect(deleteWrapper).toHaveAttribute('data-roles', 'director');
    });
  });

  describe('права доступа', () => {
    it('кнопка "Добавить на сайт" требует роли director или manager', () => {
      render(
        <ReviewCard
          review={mockReview}
          type="new"
          onApprove={mockOnApprove}
          onDelete={mockOnDelete}
        />
      );
      const protectedWrappers = screen.getAllByTestId('user-protected');
      const approveWrapper = protectedWrappers[0];
      expect(approveWrapper).toHaveAttribute('data-roles', 'director,manager');
    });

    it('кнопка "Удалить" требует роли director', () => {
      render(
        <ReviewCard
          review={mockReview}
          type="new"
          onApprove={mockOnApprove}
          onDelete={mockOnDelete}
        />
      );
      const protectedWrappers = screen.getAllByTestId('user-protected');
      const deleteWrapper = protectedWrappers[1];
      expect(deleteWrapper).toHaveAttribute('data-roles', 'director');
    });
  });

  describe('разные статусы отзыва', () => {
    it('для нового отзыва показывает кнопку "Добавить на сайт"', () => {
      render(
        <ReviewCard
          review={mockReview}
          type="new"
          onApprove={mockOnApprove}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByText('Добавить на сайт')).toBeInTheDocument();
    });

    it('для одобренного отзыва не показывает кнопку "Добавить на сайт"', () => {
      render(
        <ReviewCard
          review={mockReview}
          type="approved"
          onApprove={mockOnApprove}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.queryByText('Добавить на сайт')).not.toBeInTheDocument();
    });

    it('кнопка "Удалить" видна для любого статуса', () => {
      render(
        <ReviewCard
          review={mockReview}
          type="approved"
          onApprove={mockOnApprove}
          onDelete={mockOnDelete}
        />
      );
      expect(screen.getByText('Удалить')).toBeInTheDocument();
    });
  });
});