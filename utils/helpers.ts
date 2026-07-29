export interface UniqueUserCredentials {
  username: string;
  email: string;
}

export function generateUniqueUserCredentials(): UniqueUserCredentials {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomSuffix = '';

  for (let i = 0; i < 10; i++) {
    randomSuffix += chars[Math.floor(Math.random() * chars.length)];
  }

  const username = `user${randomSuffix}`;
  const email = `${username}@outlook.com`;

  return { username, email };
}


