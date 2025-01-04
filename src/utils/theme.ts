// Theme utility functions
export const loadTheme = (): boolean => {
  const savedTheme = localStorage.getItem('darkMode');
  return savedTheme ? JSON.parse(savedTheme) : false;
};

export const saveTheme = (isDark: boolean): void => {
  localStorage.setItem('darkMode', JSON.stringify(isDark));
};