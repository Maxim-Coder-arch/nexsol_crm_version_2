import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import AddBidForm from '@/app/dashboard/bids/ui/addBidForm';

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
    input: ({ children, ...props }: any) => <input {...props}>{children}</input>,
    textarea: ({ children, ...props }: any) => <textarea {...props}>{children}</textarea>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('AddBidForm', () => {
  const mockOnAddBid = vi.fn();

  it('рендерит кнопку "Добавить заявку вручную"', () => {
    render(<AddBidForm onAddBid={mockOnAddBid} />);
    expect(screen.getByText('Добавить заявку вручную')).toBeInTheDocument();
  });

  it('открывает форму при клике на кнопку', async () => {
    const user = userEvent.setup();
    render(<AddBidForm onAddBid={mockOnAddBid} />);
    
    const openBtn = screen.getByText('Добавить заявку вручную');
    await user.click(openBtn);
    
    expect(screen.getByText('Новая заявка')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Имя*')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email*')).toBeInTheDocument();
  });

  it('закрывает форму при клике на "Отмена"', async () => {
    const user = userEvent.setup();
    render(<AddBidForm onAddBid={mockOnAddBid} />);
    
    await user.click(screen.getByText('Добавить заявку вручную'));
    await user.click(screen.getByText('Отмена'));
    
    expect(screen.queryByText('Новая заявка')).not.toBeInTheDocument();
  });

  it('вызывает onAddBid с данными формы при сабмите', async () => {
    const user = userEvent.setup();
    render(<AddBidForm onAddBid={mockOnAddBid} />);
    
    await user.click(screen.getByText('Добавить заявку вручную'));
    
    await user.type(screen.getByPlaceholderText('Имя*'), 'Тестовый пользователь');
    await user.type(screen.getByPlaceholderText('Email*'), 'test@test.ru');
    await user.type(screen.getByPlaceholderText('Ссылка на контакт'), 'https://vk.com/test');
    await user.type(screen.getByPlaceholderText('Комментарий'), 'Тестовый комментарий');
    
    await user.click(screen.getByText('Добавить'));
    
    expect(mockOnAddBid).toHaveBeenCalledWith({
      username: 'Тестовый пользователь',
      useremail: 'test@test.ru',
      usecontact: 'https://vk.com/test',
      comment: 'Тестовый комментарий',
    });
  });

  it('очищает форму после сабмита', async () => {
    const user = userEvent.setup();
    render(<AddBidForm onAddBid={mockOnAddBid} />);
    
    await user.click(screen.getByText('Добавить заявку вручную'));
    
    const nameInput = screen.getByPlaceholderText('Имя*');
    const emailInput = screen.getByPlaceholderText('Email*');
    
    await user.type(nameInput, 'Тестовый пользователь');
    await user.type(emailInput, 'test@test.ru');
    
    expect(nameInput).toHaveValue('Тестовый пользователь');
    expect(emailInput).toHaveValue('test@test.ru');
    
    await user.click(screen.getByText('Добавить'));
    
    expect(screen.queryByText('Новая заявка')).not.toBeInTheDocument();
  });

  it('закрывает форму после успешного сабмита', async () => {
    const user = userEvent.setup();
    render(<AddBidForm onAddBid={mockOnAddBid} />);
    
    await user.click(screen.getByText('Добавить заявку вручную'));
    
    await user.type(screen.getByPlaceholderText('Имя*'), 'Тестовый пользователь');
    await user.type(screen.getByPlaceholderText('Email*'), 'test@test.ru');
    
    await user.click(screen.getByText('Добавить'));
    
    expect(screen.queryByText('Новая заявка')).not.toBeInTheDocument();
  });

  it('оборачивает всю форму в UserProtected', () => {
    render(<AddBidForm onAddBid={mockOnAddBid} />);
    const protectedWrapper = screen.getByTestId('user-protected');
    expect(protectedWrapper).toBeInTheDocument();
  });
});