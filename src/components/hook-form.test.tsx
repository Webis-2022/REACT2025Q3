import { render, screen } from '@testing-library/react';
import { HookForm } from './hook-form';
import { describe, it, vi, expect } from 'vitest';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('HookForm', () => {
  it('renders all required fields', () => {
    render(<HookForm onClose={vi.fn()} />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText(/Repeat Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Male')).toBeInTheDocument();
    expect(screen.getByLabelText('Female')).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Accept Terms and Conditions/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose Your Country/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  describe('HookForm submission', () => {
    it('calls submit handler with valid data including image', async () => {
      const onClose = vi.fn();
      render(<HookForm onClose={onClose} />);

      await userEvent.type(screen.getByLabelText(/Name/i), 'John');
      await userEvent.type(screen.getByLabelText('Age'), '30');
      await userEvent.type(screen.getByLabelText(/Email/i), 'john@example.com');
      await userEvent.type(screen.getByLabelText('Password'), 'Abc123$%');
      await userEvent.type(
        screen.getByLabelText(/Repeat Password/i),
        'Abc123$%'
      );

      await userEvent.click(screen.getByLabelText('Male'));
      await userEvent.click(
        screen.getByLabelText(/Accept Terms and Conditions/i)
      );
      await userEvent.selectOptions(
        screen.getByLabelText(/Choose Your Country/i),
        'Austria'
      );

      const file = new File(['dummy content'], 'example.png', {
        type: 'image/png',
      });
      const inputFile = screen.getByLabelText(
        /Upload image/i
      ) as HTMLInputElement;
      await userEvent.upload(inputFile, file);

      const submitButton = screen.getByRole('button', { name: /Submit/i });
      await userEvent.click(submitButton);

      expect(onClose).toHaveBeenCalled();
      expect(inputFile.files?.[0]).toStrictEqual(file);
      expect(inputFile.files).toHaveLength(1);
    });
    it('shows errors for invalid fields in HookForm', async () => {
      render(<HookForm onClose={vi.fn()} />);

      await userEvent.type(screen.getByLabelText(/Name/i), 'john');
      await userEvent.type(screen.getByLabelText('Age'), '-5');
      await userEvent.type(screen.getByLabelText(/Email/i), 'invalidemail');
      await userEvent.type(screen.getByLabelText('Password'), 'weak');
      await userEvent.type(screen.getByLabelText(/Repeat Password/i), 'weak');

      await userEvent.click(screen.getByLabelText('Male'));
      await userEvent.click(
        screen.getByLabelText(/Accept Terms and Conditions/i)
      );
      await userEvent.selectOptions(
        screen.getByLabelText(/Choose Your Country/i),
        ''
      );

      expect(
        await screen.findByText(/The first letter should be capitalized/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Age should be a positive number/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Please type a correct email/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Password must be at least 8 characters/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Please select your country/i)
      ).toBeInTheDocument();
    });
    it('error message display and clearing', async () => {
      render(<HookForm onClose={vi.fn()} />);
      const user = userEvent.setup();
      await user.type(screen.getByLabelText('Password'), '12aA!');
      expect(
        screen.getByText(/Password must be at least 8 characters/i)
      ).toBeInTheDocument();

      await user.type(screen.getByLabelText('Password'), 'StrongPass123');

      expect(
        screen.queryByText(/Password must be at least 8 characters/i)
      ).not.toBeInTheDocument();
    });
  });
});
