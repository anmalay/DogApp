import React from 'react';
import classNames from 'classnames';

export type TextVariant = 
  | 'extra-bold-28'
  | 'bold-24' 
  | 'semibold-18'
  | 'medium-16'
  | 'regular-16'
  | 'medium-14'
  | 'medium-small-12';

export type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

export type TextColor = 
  | 'primary' 
  | 'secondary'
  | 'muted'
  | 'on-primary'
  | 'on-secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'white'
  | 'black';

export interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  tag?: TextTag;
  color?: TextColor;
  className?: string;
}

const typographyVariantClasses: Record<TextVariant, string> = {
  'extra-bold-28': 'text-[28px] font-extrabold leading-[34px]',
  'bold-24': 'text-2xl font-bold leading-[29px]',
  'semibold-18': 'text-lg font-semibold leading-[22px]',
  'medium-16': 'text-base font-medium leading-5',
  'regular-16': 'text-base font-normal leading-[21px]',
  'medium-14': 'text-sm font-medium leading-[17px]',
  'medium-small-12': 'text-xs font-medium leading-[15px]',
};

const colorClasses: Record<TextColor, string> = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary', 
  muted: 'text-text-muted',
  'on-primary': 'text-text-on-primary',
  'on-secondary': 'text-text-on-secondary',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  info: 'text-info',
  white: 'text-white',
  black: 'text-black',
};

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'regular-16',
  tag: Component = 'span',
  color = 'primary',
  className = '',
}) => {
  const classes = classNames(
    'font-sans',
    'm-0', // Reset default margins
    typographyVariantClasses[variant],
    colorClasses[color],
    className
  );

  return (
    <Component className={classes}>
      {children}
    </Component>
  );
};