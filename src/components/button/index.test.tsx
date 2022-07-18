import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Button } from '.';


describe('Button', () => {

  describe('idle state', () => {
    test('should render the button with /Submit/ text when a children is not passed in', () => {
      render(<Button />);
      const button = screen.getByText(/submit/i);
      expect(button).toBeInTheDocument();
    })

    test('should render the button with the children', () => {
      render(<Button>Launch Rocket</Button>);
      const button = screen.getByText(/Launch Rocket/i);
      expect(button).toBeInTheDocument();
    })

    test('should render the button with the helperText', async () => {
      render(<Button helpText="some text">Launch Rocket</Button>);
      fireEvent.mouseOver(screen.getByText(/Launch Rocket/i));

      const helperItem = await waitFor(() => screen.getByText(/some text/i))
      expect(helperItem).toBeInTheDocument()
    })
  })

  describe('loading state', () => {
    test('should render loading when loading is passed as true', () => {
      render(<Button isLoading={true}>Launch Rocket</Button>);
      const button = screen.getByText(/Launching/i);
      expect(button).toBeInTheDocument();
    })

    test('should not render loading when loading is passed but there is an error', () => {
      render(<Button isLoading={true} isError={true}>Launch Rocket</Button>);
      const button = screen.queryByText(/Launching/i);
      expect(button).not.toBeInTheDocument();
    })

    test('whem loading you should be able to cancel the task', async () => {
      render(<Button isLoading={true} >Launch Rocket</Button>);
      fireEvent.mouseOver(screen.getByText(/Launching/i));

      const cancelButton = await waitFor(() => screen.getByText(/Cancel/i))

      expect(cancelButton).toBeInTheDocument()
    })

    test('while loading the button should be disabled', async () => {
      render(<Button isLoading={true} >Launch Rocket</Button>);
      const button = screen.queryByText(/Launching/i);
      expect(button).toHaveAttribute('disabled')
    })

  })

  describe('error state', () => {
    test('should render error alert when error is true', () => {
      render(<Button isError={true}>Launch Rocket</Button>);
      const errorAlert = screen.getByText(/Error/i);
      expect(errorAlert).toBeInTheDocument();
    })
  })
});