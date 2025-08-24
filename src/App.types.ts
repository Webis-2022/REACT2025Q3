export type Errors = {
  name?: string;
  age?: string;
  email?: string;
  firstPassword?: string;
  secondPassword?: string;
  gender?: string;
  tc?: string;
  image?: string;
  country?: string;
};

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
