import { render, screen } from '@testing-library/react';
import { Modal } from './modal';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('Modal', () => {
  it('renders children when open', () => {
    render(
      // eslint-disable-next-line prettier/prettier
      <Modal isOpen={true} onClose={() => { }}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      // eslint-disable-next-line prettier/prettier
      <Modal isOpen={false} onClose={() => { }}>
        <div>Hidden Content</div>
      </Modal>
    );
    expect(screen.queryByText('Hidden Content')).toBeNull();
  });
  it('focuses on the modal when opened', async () => {
    const onClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={onClose}>
        <button>Inside Modal</button>
      </Modal>
    );

    const button = screen.getByRole('button', { name: /Inside Modal/i });
    await userEvent.tab();
    expect(button).toHaveFocus();
  });

  it('closes modal on ESC key press', async () => {
    const onClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={onClose}>
        <button>Inside Modal</button>
      </Modal>
    );

    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  it('closes modal when clicking outside the modal window', async () => {
    const onClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={onClose}>
        <button>Inside Modal</button>
      </Modal>
    );

    const overlay =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      screen.getByText(/Inside Modal/i).parentElement!.parentElement!;
    await userEvent.click(overlay);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close modal when clicking inside the modal window', async () => {
    const onClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={onClose}>
        <button>Inside Modal</button>
      </Modal>
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const modalWindow = screen.getByText(/Inside Modal/i).parentElement!;
    await userEvent.click(modalWindow);

    expect(onClose).not.toHaveBeenCalled();
  });
});
