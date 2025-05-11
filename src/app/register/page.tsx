'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const AddressPicker = dynamic(() => import('../../components/AddressPicker'), { ssr: false });

const nameRegex = /^[A-Za-z\s]+$/;

const schema = z.object({
  firstName: z
    .string()
    .min(2, 'First name is too short')
    .regex(nameRegex, 'First name must contain only letters'),
  lastName: z
    .string()
    .min(2, 'Last name is too short')
    .regex(nameRegex, 'Last name must contain only letters'),
  email: z.string().email('Invalid email'),
  phone: z
    .string()
    .regex(/^\d{10,}$/, 'Phone number must be at least 10 digits and contain only numbers'),
  address: z.string().min(5, 'Address is required'),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const [selectedAddress, setSelectedAddress] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log('Validated:', data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm px-6 py-10 border border-gray-200 rounded-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Register
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* First Name */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">First Name</label>
            <input
              {...register('firstName')}
              placeholder="Juan"
              className="w-full border-b border-gray-400 focus:outline-none focus:border-black py-2 text-sm"
            />
            {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Last Name</label>
            <input
              {...register('lastName')}
              placeholder="Dela Cruz"
              className="w-full border-b border-gray-400 focus:outline-none focus:border-black py-2 text-sm"
            />
            {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              {...register('email')}
              placeholder="you@example.com"
              className="w-full border-b border-gray-400 focus:outline-none focus:border-black py-2 text-sm"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Phone Number</label>
            <input
              {...register('phone')}
              placeholder="09XXXXXXXXX"
              className="w-full border-b border-gray-400 focus:outline-none focus:border-black py-2 text-sm"
            />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Address</label>
            <input
              {...register('address')}
              value={selectedAddress}
              readOnly
              placeholder="Select your address"
              className="w-full border-b border-gray-400 focus:outline-none focus:border-black py-2 text-sm bg-transparent"
            />
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>}
          </div>

          <AddressPicker
            onSelect={(address: string) => {
              setSelectedAddress(address);
              setValue('address', address);
            }}
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <a
            href="/login"
            className="text-sm text-gray-500 hover:underline"
          >
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
}
