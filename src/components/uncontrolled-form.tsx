import React from 'react';
import { ImageInput } from './image-input';
import { CountryInput } from './country-input';
import type { Errors } from '../App.types';

export type Refs = {
  nameRef: React.RefObject<HTMLInputElement | null>;
  ageRef: React.RefObject<HTMLInputElement | null>;
  emailRef: React.RefObject<HTMLInputElement | null>;
  firstPasswordRef: React.RefObject<HTMLInputElement | null>;
  secondPasswordRef: React.RefObject<HTMLInputElement | null>;
  maleGenderRef: React.RefObject<HTMLInputElement | null>;
  femaleGenderRef: React.RefObject<HTMLInputElement | null>;
  tcRef: React.RefObject<HTMLInputElement | null>;
  imageRef: React.RefObject<HTMLInputElement | null>;
  countryRef: React.RefObject<HTMLSelectElement | null>;
};

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: Errors;
  refs: Refs;
  setBase64: (base64: string) => void;
};

export const UncontrolledForm = ({
  handleSubmit,
  errors,
  refs,
  setBase64,
}: Props) => {
  return (
    <form id="form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" autoFocus ref={refs.nameRef} />
      {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

      <label htmlFor="age">Age</label>
      <input type="number" id="age" ref={refs.ageRef} />
      {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}

      <label htmlFor="email">Email</label>
      <input type="email" id="email" ref={refs.emailRef} />
      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

      <label htmlFor="first-password">Password</label>
      <input type="password" id="first-password" ref={refs.firstPasswordRef} />
      {errors.firstPassword && (
        <p style={{ color: 'red' }}>{errors.firstPassword}</p>
      )}

      <label htmlFor="second-password">Repeat Password</label>
      <input
        type="password"
        id="second-password"
        ref={refs.secondPasswordRef}
      />
      {errors.secondPassword && (
        <p style={{ color: 'red', width: '250px', textAlign: 'center' }}>
          {errors.secondPassword}
        </p>
      )}

      <h4>Gender</h4>
      <div className="gender-wrapper">
        <label htmlFor="gender-male">Male</label>
        <input
          type="radio"
          id="gender-male"
          value="male"
          name="gender"
          ref={refs.maleGenderRef}
        />
        <label htmlFor="gender-female">Female</label>
        <input
          type="radio"
          id="gender-female"
          value="female"
          name="gender"
          ref={refs.femaleGenderRef}
        />
      </div>
      {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}

      <label htmlFor="tc">Accept Terms and Conditions</label>
      <input type="checkbox" id="tc" ref={refs.tcRef} />
      {errors.tc && <p style={{ color: 'red' }}>{errors.tc}</p>}

      <ImageInput
        ref={refs.imageRef}
        onChange={setBase64}
        error={errors.image}
      />

      <CountryInput ref={refs.countryRef} error={errors.country} />

      <button className="submit-btn" type="submit">
        Submit
      </button>
    </form>
  );
};
