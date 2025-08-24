import React, { useState, useRef } from 'react';
import { Modal } from './components/modal/modal';
import { UncontrolledForm } from './components/uncontrolled-form';
import { useStore } from './store/store';
import { DataTable } from './components/data-table/data.table';
import './App.css';
import { HookForm } from './components/hook-form';
import type { Errors } from './App.types';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [base64, setBase64] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [formType, setFormType] = useState<'uncontrolled' | 'hook'>(
    'uncontrolled'
  );
  const addData = useStore((state) => state.addData);
  const [id, setId] = useState(1);
  const validatedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
  const maxImageSize = 2 * 1024 * 1024;

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstPasswordRef = useRef<HTMLInputElement>(null);
  const secondPasswordRef = useRef<HTMLInputElement>(null);
  const maleGenderRef = useRef<HTMLInputElement>(null);
  const femaleGenderRef = useRef<HTMLInputElement>(null);
  const tcRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value || '';
    const age = Number(ageRef.current?.value);
    const email = emailRef.current?.value || '';
    const firstPassword = firstPasswordRef.current?.value || '';
    const secondPassword = secondPasswordRef.current?.value || '';
    const gender = maleGenderRef.current?.checked
      ? 'male'
      : femaleGenderRef.current?.checked
        ? 'female'
        : '';
    const tc = tcRef.current?.checked || false;
    const image = imageRef.current?.files?.[0];
    const country = countryRef.current?.value || '';

    const newErrors: Errors = {};

    if (!/^[A-ZА-Я]/.test(name))
      newErrors.name = 'First letter should be capitalized';
    if (age <= 0) newErrors.age = 'Age should be positive';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Invalid email';
    if (firstPassword !== secondPassword)
      newErrors.secondPassword = 'Passwords do not match';
    if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(
        firstPassword
      )
    )
      newErrors.firstPassword =
        'Password must contain upper, lower, number, special char and min 8 chars';
    if (!gender) newErrors.gender = 'Please select a gender';
    if (!tc) newErrors.tc = 'You must accept T&C';
    if (image && !validatedTypes.includes(image.type))
      newErrors.image = 'Image extension should be jpg or png';
    if (image && image.size > maxImageSize) {
      newErrors.image = 'Image size must be less than 2 MB';
    }
    if (!country) newErrors.country = 'Select your country';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      addData({
        id,
        name,
        age,
        email,
        firstPassword,
        gender,
        tc,
        base64,
        country,
      });
      setId(id + 1);
      e.currentTarget.reset();
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="buttons-wrapper">
        <button
          onClick={() => {
            setFormType('uncontrolled');
            setIsOpen(true);
          }}
        >
          Form 1
        </button>
        <button
          onClick={() => {
            setFormType('hook');
            setIsOpen(true);
          }}
        >
          Form 2
        </button>
      </div>

      <div className="table-wrapper">
        <DataTable />
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {formType === 'uncontrolled' ? (
          <UncontrolledForm
            handleSubmit={handleSubmit}
            errors={errors}
            setBase64={setBase64}
            refs={{
              nameRef,
              ageRef,
              emailRef,
              firstPasswordRef,
              secondPasswordRef,
              maleGenderRef,
              femaleGenderRef,
              tcRef,
              imageRef,
              countryRef,
            }}
          />
        ) : (
          <HookForm onClose={() => setIsOpen(false)} />
        )}
      </Modal>
    </>
  );
}
