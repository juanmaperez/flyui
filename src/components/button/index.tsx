import clsx from "clsx";
import React, { ReactNode } from "react";
import "./index.scss";

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
  errorMessage = 'Error',
  loadingMessage = 'Loading',
  cancelMessage = 'Cancel',
  maxTimeout,
  url = "https://httpbin.org/delay/2",
  disabled,
  helpText = "Click me!",
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
      timeoutRef.current = setTimeout(() => {
        console.log(controllerRef)
        controllerRef.current.abort()
      }, maxTimeout);
    }
    setError(false)
    setLoading(true)
    fetch(url, { signal: controllerRef.current.signal }).then(response => {
      setLoading(false)
      clearTimeout(timeoutRef.current as NodeJS.Timeout)
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
  }, [])


  return (
    <div className="button-wrapper">
      <button {...otherProps} onClick={handleOnClick} disabled={disabled} className={classes}>
        {loading ? loadingMessage : children}
      </button>
      <div className={clsx('helper', {
        'helper--type-loading': loading,
        'helper--type-error': error,
        'hidden': disabled
      })}>
        <i className={clsx("arrow-up", {
          'arrow-up--loading': loading,
          'arrow-up--error': error
        })}></i>
        {error ? errorMessage : loading ? cancelMessage : helpText}
      </div>
    </div >
  )
};

