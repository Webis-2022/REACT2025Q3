import { z } from 'zod';

const maxImageSize = 2 * 1024 * 1024;

export const schema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-ZА-Я]/, 'The first letter should be capitalized'),

    age: z
      .number()
      .positive('Age should be a positive number')
      .refine((val) => !isNaN(val), { message: 'Age must be a number' }),
    email: z.string().email('Please type a correct email'),

    firstPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(
        /[^a-zA-Z0-9]/,
        'Password must contain at least one special character'
      ),

    secondPassword: z.string(),

    gender: z.enum(['male', 'female'] as const, {
      message: 'Please select a gender',
    }),

    tc: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and conditions',
    }),

    country: z.string().min(1, 'Please select your country'),

    image: z
      .custom<File | null>((file) => !file || file instanceof File)
      .optional()
      .refine(
        (file) => !file || ['image/png', 'image/jpeg'].includes(file.type),
        'Image should be jpg or png'
      )
      .refine(
        (file) => !file || file.size <= maxImageSize,
        'Image size must be less than 2 MB'
      ),
  })
  .refine((data) => data.firstPassword === data.secondPassword, {
    message: 'Passwords do not match',
    path: ['secondPassword'],
  });
