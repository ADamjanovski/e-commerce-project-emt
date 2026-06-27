import { beforeEach, describe, expect, it, vi } from 'vitest';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

vi.stubGlobal('localStorage', localStorageMock);

describe('api client', () => {
  beforeEach(() => {
    vi.resetModules();
    localStorageMock.getItem.mockReset();
  });

  it('uses the configured VITE_API_URL as base URL', async () => {
    vi.stubEnv('VITE_API_URL', 'http://api.example.test');

    const { default: api } = await import('./index');

    expect(api.defaults.baseURL).toBe('http://api.example.test');
  });

  it('adds the jwt token to the authorization header', async () => {
    vi.stubEnv('VITE_API_URL', 'http://api.example.test');
    localStorageMock.getItem.mockReturnValue('test-jwt');

    const { default: api } = await import('./index');
    const interceptor = (api.interceptors.request as unknown as { handlers: Array<{ fulfilled?: (config: { headers: Record<string, string> }) => { headers: Record<string, string> } | Promise<{ headers: Record<string, string> }> }> }).handlers[0].fulfilled;
    const config = interceptor ? await interceptor({ headers: {} }) : { headers: {} };

    expect(localStorageMock.getItem).toHaveBeenCalledWith('jwt');
    expect(config.headers.Authorization).toBe('Bearer test-jwt');
  });
});
