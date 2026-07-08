import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import usePermission from '@/app/hooks/usePermission';
import { useUser } from '@/app/hooks/useUser';

vi.mock('@/app/hooks/useUser', () => ({
  useUser: vi.fn(),
}));

describe('usePermission', () => {
  it('возвращает роль пользователя', () => {
    const mockedUseUser = vi.mocked(useUser);
    
    mockedUseUser.mockReturnValue({
      user: { role: 'director' },
    } as any);

    const { result } = renderHook(() => usePermission());
    
    expect(result.current).toBe('director');
  });

  it('возвращает undefined если пользователь не авторизован', () => {
    const mockedUseUser = vi.mocked(useUser);
    
    mockedUseUser.mockReturnValue({
      user: null,
    } as any);

    const { result } = renderHook(() => usePermission());
    
    expect(result.current).toBeUndefined();
  });
});