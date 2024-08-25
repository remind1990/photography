import React from 'react';

type Props = {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
};

const Button = ({
  children,
  size = 'medium',
  variant = 'primary',
  onClick,
}: Props) => {
  const sizeClass =
    size === 'small'
      ? 'btn-small'
      : size === 'large'
      ? 'btn-large'
      : 'btn-medium';
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <button className={`${sizeClass} ${variantClass}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
