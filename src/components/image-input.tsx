import { forwardRef } from 'react';

type Props = {
  onChange: (base64: string, file: File) => void;
  error?: string;
};

export const ImageInput = forwardRef<HTMLInputElement, Props>(
  ({ onChange, error }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string, file);
      };
      reader.readAsDataURL(file);
    };

    return (
      <>
        <label htmlFor="image">Upload image</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          ref={ref}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </>
    );
  }
);

ImageInput.displayName = 'ImageInput';
