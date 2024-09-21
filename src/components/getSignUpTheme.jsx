import React from "react";

export const Button = ({
  variant = "contained",
  color = "primary",
  size = "medium",
  children,
  ...props
}) => {
  const baseClasses =
    "font-medium rounded transition-all duration-100 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-400";
  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };
  const variantClasses = {
    contained: {
      primary:
        "bg-gradient-to-b from-brand-400 to-brand-500 text-white border border-brand-500 shadow-sm hover:bg-brand-700 hover:shadow-none active:bg-brand-700 active:shadow-inner",
      secondary:
        "bg-gray-100 text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-200 hover:shadow-none active:bg-gray-300 active:shadow-inner",
    },
    outlined: {
      primary:
        "bg-brand-100 bg-opacity-10 text-brand-700 border border-brand-200 border-opacity-80 shadow-sm hover:bg-brand-200 hover:bg-opacity-20 hover:shadow-none active:bg-brand-300 active:bg-opacity-30 active:shadow-inner",
      secondary:
        "bg-gray-100 bg-opacity-10 text-gray-700 border border-gray-300 border-opacity-50 shadow-sm hover:bg-gray-200 hover:bg-opacity-30 hover:shadow-none active:bg-gray-300 active:bg-opacity-40 active:shadow-inner",
    },
    text: {
      primary: "text-brand-700 hover:bg-brand-100 hover:bg-opacity-30",
      secondary: "text-gray-700 hover:bg-gray-100 hover:bg-opacity-30",
    },
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant][color]}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export const Card = ({ variant = "elevation", children, ...props }) => {
  const baseClasses = "rounded-lg transition-all duration-100 ease-in-out";
  const variantClasses = {
    elevation: "bg-white shadow-md",
    outlined: "bg-gradient-to-b from-white to-gray-50 border border-gray-200",
  };

  const classes = `${baseClasses} ${variantClasses[variant]}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export const TextField = ({ error, ...props }) => {
  const baseClasses =
    "w-full px-3 py-2 text-base rounded-lg transition-all duration-100 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400";
  const normalClasses =
    "border border-gray-300 bg-gray-100 bg-opacity-40 hover:border-brand-300";
  const errorClasses =
    "border border-red-300 bg-red-100 bg-opacity-40 text-red-500";

  const classes = `${baseClasses} ${error ? errorClasses : normalClasses}`;

  return <input className={classes} {...props} />;
};

export const Checkbox = ({ ...props }) => {
  return (
    <input
      type="checkbox"
      className="w-4 h-4 text-brand-500 bg-gray-100 rounded border-gray-300 focus:ring-brand-400 focus:ring-2"
      {...props}
    />
  );
};

export const Link = ({ children, ...props }) => {
  return (
    <a
      className="font-medium text-brand-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-400"
      {...props}
    >
      {children}
    </a>
  );
};