import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '../utils/validationShema';
import { CountryInput } from './country-input';
import { useStore } from '../store/store';
import type z from 'zod';
import './modal/modal.css';
import { useState } from 'react';

type FormValues = z.infer<typeof schema>;

export const HookForm = ({ onClose }: { onClose: () => void }) => {
  const addData = useStore((state) => state.addData);
  const [id, setId] = useState(1);

  const { register, handleSubmit, setValue, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldUnregister: false,
    defaultValues: {
      name: '',
      age: undefined,
      email: '',
      firstPassword: '',
      secondPassword: '',
      gender: undefined,
      tc: false,
      country: '',
      image: undefined,
    },
  });

  const submit = (data: FormValues) => {
    setId(id + 1);
    if (data.image) {
      const reader = new FileReader();
      reader.onload = () => {
        addData({
          id,
          ...data,
          base64: reader.result as string,
        });
        onClose();
      };
      reader.readAsDataURL(data.image);
    } else {
      addData({
        id,
        ...data,
        base64: undefined,
      });
      onClose();
    }
  };

  return (
    <form id="form" onSubmit={handleSubmit(submit)}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" {...register('name')} />
      {formState.errors.name && (
        <p style={{ color: 'red' }}>{formState.errors.name.message}</p>
      )}
      <label htmlFor="age">Age</label>
      <input
        type="number"
        id="age"
        {...register('age', { valueAsNumber: true })}
      />
      {formState.errors.age && (
        <p style={{ color: 'red' }}>{formState.errors.age.message}</p>
      )}
      <label htmlFor="email">Email</label>{' '}
      <input type="text" id="email" {...register('email')} />{' '}
      {formState.errors.email && (
        <p style={{ color: 'red' }}>{formState.errors.email.message}</p>
      )}{' '}
      <label htmlFor="first-password">Password</label>{' '}
      <input
        type="password"
        id="first-password"
        {...register('firstPassword')}
      />{' '}
      {formState.errors.firstPassword && (
        <p style={{ color: 'red' }}>{formState.errors.firstPassword.message}</p>
      )}{' '}
      <label htmlFor="second-password">Repeat Password</label>{' '}
      <input
        type="password"
        id="second-password"
        {...register('secondPassword')}
      />{' '}
      {formState.errors.secondPassword && (
        <p style={{ color: 'red' }}>
          {' '}
          {formState.errors.secondPassword.message}{' '}
        </p>
      )}{' '}
      <h4>Gender</h4>{' '}
      <div className="gender-wrapper">
        {' '}
        <label htmlFor="gender-male">Male</label>{' '}
        <input
          type="radio"
          id="gender-male"
          value="male"
          {...register('gender')}
        />{' '}
        <label htmlFor="gender-female">Female</label>{' '}
        <input
          type="radio"
          id="gender-female"
          value="female"
          {...register('gender')}
        />{' '}
      </div>{' '}
      {formState.errors.gender && (
        <p style={{ color: 'red' }}>{formState.errors.gender.message}</p>
      )}{' '}
      <label htmlFor="tc">Accept Terms and Conditions</label>{' '}
      <input type="checkbox" id="tc" {...register('tc')} />{' '}
      {formState.errors.tc && (
        <p style={{ color: 'red' }}>{formState.errors.tc.message}</p>
      )}
      <label htmlFor="image">Upload image</label>
      <input
        id="image"
        type="file"
        accept="image/png, image/jpeg"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          setValue('image', file, { shouldValidate: true });
        }}
      />
      {formState.errors.image && (
        <p style={{ color: 'red' }}>{formState.errors.image.message}</p>
      )}
      <CountryInput
        {...register('country')}
        error={formState.errors.country?.message}
      />
      <button
        type="submit"
        className={`${!formState.isValid ? 'disabled' : ''}`}
        disabled={!formState.isValid}
      >
        Submit
      </button>
    </form>
  );
};
