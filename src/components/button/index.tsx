import clsx from "clsx";
import React, { ReactNode } from "react";
import "./index.scss";

export enum ButtonStatus {
  LOADING = "LOADING",
  ERROR = "ERROR",
  IDLE = "IDLE"
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  defaultStatus?: ButtonStatus;
  errorMessage?: string;
  loadingMessage?: string;
  cancelMessage?: string;
  helpText?: string;
  url: string;
  maxTimeout?: number;
}

export const Button = ({
  defaultStatus = ButtonStatus.IDLE,
  children = 'Submit',
  errorMessage = 'Error',
  loadingMessage = 'Loading',
  cancelMessage = 'Cancel',
  maxTimeout,
  url,
  disabled,
  helpText = "Click me!",
  ...otherProps
}: ButtonProps) => {
  const [status, setStatus] = React.useState<ButtonStatus>(defaultStatus)
  const controllerRef = React.useRef<AbortController>();
  const timeoutRef = React.useRef<NodeJS.Timeout>()

  const isLoading = status === ButtonStatus.LOADING;
  const isError = status === ButtonStatus.ERROR

  const classes = clsx("button", {
    'button--type-loading': status === ButtonStatus.LOADING,
    'button--type-error': status === ButtonStatus.ERROR
  });

  const handleOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading && controllerRef.current) {
      controllerRef.current.abort()
      setStatus(ButtonStatus.ERROR)
      return;
    }

    controllerRef.current = new AbortController();

    if (maxTimeout) {
      timeoutRef.current = setTimeout(() => {
        if (controllerRef.current) {
          controllerRef.current.abort()
        }
      }, maxTimeout);
    }

    setStatus(ButtonStatus.LOADING)
    fetch(url, { signal: controllerRef.current.signal }).then(response => {
      setStatus(ButtonStatus.IDLE)
      clearTimeout(timeoutRef.current as NodeJS.Timeout)
    }).catch(err => {
      setStatus(ButtonStatus.ERROR)
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
      <button {...otherProps} onClick={handleOnClick} disabled={disabled || !url} className={classes}>
        {isLoading ? loadingMessage : children}
      </button>
      <div className={clsx('helper', {
        'helper--type-loading': isLoading,
        'helper--type-error': isError,
        'hidden': disabled
      })}>
        <i className={clsx("arrow-up", {
          'arrow-up--loading': isLoading,
          'arrow-up--error': isError
        })}></i>
        {isError ? errorMessage : isLoading ? cancelMessage : helpText}
      </div>
    </div >
  )
};

