import { UncontrolledForm } from './uncontrolled-form';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Refs } from './uncontrolled-form';
import type { Errors } from '../App.types';

describe('UncontrolledForm', () => {
  let refs: Refs;
  let setBase64Mock: (base64: string) => void;
  let errors: Errors;

  beforeEach(() => {
    refs = {
      nameRef: { current: null },
      ageRef: { current: null },
      emailRef: { current: null },
      firstPasswordRef: { current: null },
      secondPasswordRef: { current: null },
      maleGenderRef: { current: null },
      femaleGenderRef: { current: null },
      tcRef: { current: null },
      imageRef: { current: null },
      countryRef: { current: null },
    };
    errors = {
      name: 'First letter should be capitalized',
      age: 'Age should be positive',
      email: 'Invalid email',
      firstPassword:
        'Password must contain upper, lower, number, special char and min 8 chars',
      secondPassword: 'Passwords do not match',
      gender: 'Please select a gender',
      tc: 'You must accept T&C',
      image: 'Image extension should be jpg or png',
      country: 'Select your country',
    };
    setBase64Mock = vi.fn();
  });
  it('validates fields and shows correct error messages', async () => {
    render(
      <UncontrolledForm
        handleSubmit={vi.fn()}
        errors={errors}
        refs={refs}
        setBase64={setBase64Mock}
      />
    );
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    const user = userEvent.setup();
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/First letter should be capitalized/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Age should be positive/i)).toBeInTheDocument();
      expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /Password must contain upper, lower, number, special char and min 8 chars/i
        )
      ).toBeInTheDocument();
      expect(screen.getByText(/Please select a gender/i)).toBeInTheDocument();
      expect(screen.getByText(/You must accept T&C/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Image extension should be jpg or png/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Select your country/i)).toBeInTheDocument();
    });
  });
  it('shows error for weak password', async () => {
    render(
      <UncontrolledForm
        handleSubmit={vi.fn()}
        errors={errors}
        refs={refs}
        setBase64={setBase64Mock}
      />
    );

    await userEvent.type(screen.getByLabelText('Password'), 'abc');
    await userEvent.type(screen.getByLabelText('Repeat Password'), 'abc');

    await userEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(
      screen.getByText(
        /Password must contain upper, lower, number, special char and min 8 chars/i
      )
    ).toBeInTheDocument();
  });

  it('does not show error for strong password', async () => {
    render(
      <UncontrolledForm
        handleSubmit={vi.fn()}
        errors={{}}
        refs={refs}
        setBase64={setBase64Mock}
      />
    );

    await userEvent.type(screen.getByLabelText('Password'), 'Abc123$%');
    await userEvent.type(screen.getByLabelText('Repeat Password'), 'Abc123$%');

    await userEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(
      screen.queryByText(
        /Password must contain upper, lower, number, special char and min 8 chars/i
      )
    ).toBeNull();
  });
});
