export const secureEmail = (email = '') => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email)) {
    const assSymbolPosition = email.indexOf('@');
    const firstSection = email.substring(0, 2);
    const lastSection = email.substring(assSymbolPosition - 2);

    return `${firstSection}******${lastSection}`;
  }
  throw new Error('Email không hợp lệ');
};
