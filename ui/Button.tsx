import React from 'react';

type Props = {
  children: React.ReactNode;
  size: 'small' | 'medium' | 'large';
  variant: 'primary' | 'secondary';
};

const Button = ({ children }: Props) => {
  return <button>{children}</button>;
};

export default Button;
