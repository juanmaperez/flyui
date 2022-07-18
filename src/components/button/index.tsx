import clsx from "clsx";
import React, { ReactNode } from "react";
import "./button.scss";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  loadingMessage?: string;
  cancelMessage?: string;
  helpText?: string;
  url?: string;
  maxTimeout?: number;
}

export const Button = ({
  isLoading = false,
  isError = false,
  children = 'Submit',
  errorMessage = 'Ignition error',
  loadingMessage = 'Launching',
  cancelMessage = 'Cancel launch',
  maxTimeout,
  url = "https://httpbin.org/delay/2",
  disabled,
  helpText,
  ...otherProps
}: ButtonProps) => {
  const [loading, setLoading] = React.useState<boolean>(isLoading && !isError)
  const [error, setError] = React.useState<boolean>(isError)
  const controllerRef = React.useRef(new AbortController());
  const timeoutRef = React.useRef<null | NodeJS.Timeout>(null)

  const classes = clsx("button", {
    'button--type-loading': loading && !error,
    'button--type-error': error
  });

  const handleOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (maxTimeout) {
      timeoutRef.current = setTimeout(() => controllerRef.current.abort(), maxTimeout);
    }
    setError(false)
    setLoading(true)
    fetch(url, { signal: controllerRef.current.signal }).then(response => {
      setLoading(false)
    }).catch(err => {
      setError(true)
    });
  }

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  })


  return (
    <div className="button-wrapper">
      <button {...otherProps} onClick={handleOnClick} disabled={disabled || loading} className={classes}>
        {loading ? loadingMessage : children}
      </button>
    </div >
  )
};

