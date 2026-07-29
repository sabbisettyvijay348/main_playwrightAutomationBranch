import { test, expect } from '@playwright/test';
import { generateUniqueUserCredentials } from '../utils/helpers';

test.describe('signup helpers', () => {
  test('should generate unique signup credentials', async () => {
    const credentials = generateUniqueUserCredentials();

    expect(credentials.username).toContain('user');
    expect(credentials.email).toContain('@outlook.com');
    expect(credentials.email).not.toEqual(credentials.username);
  });
});

