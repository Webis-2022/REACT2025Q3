import { forwardRef } from 'react';
import { useStore } from '../store/store';

// type Props = {
//   error?: string;
// };

// export const CountryInput = forwardRef<HTMLSelectElement, Props>(
//   ({ error }, ref) => {
//     const countries = useStore((state) => state.countries);
//     return (
//       <div>
//         <label htmlFor="country">Choose Your Country</label>
//         <select id="country" ref={ref}>
//           <option value="">Select Country</option>
//           {countries.map((country) => (
//             <option key={country} value={country}>
//               {country}
//             </option>
//           ))}
//         </select>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </div>
//     );
//   }
// );

// CountryInput.displayName = 'CountryInput';

type Props = {
  error?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const CountryInput = forwardRef<HTMLSelectElement, Props>(
  ({ error, ...rest }, ref) => {
    const countries = useStore((state) => state.countries);
    return (
      <>
        <label htmlFor="country">Choose Your Country</label>
        <select id="country" ref={ref} {...rest}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </>
    );
  }
);

CountryInput.displayName = 'CountryInput';
