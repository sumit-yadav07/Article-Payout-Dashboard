// Mock authentication data
export const mockCredentials = {
  email: 'admin@sportdunia.com',
  password: 'password123'
};

export const validateMockCredentials = (email: string, password: string): boolean => {
  return email === mockCredentials.email && password === mockCredentials.password;
};