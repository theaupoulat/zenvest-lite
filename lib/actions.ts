'use server';
import { revalidatePath } from 'next/cache';

export const createInvestment = async (formData: FormData) => {
  console.log(formData);
  revalidatePath('/');
};

export const createValuationEvent = async (formData: FormData) => {
  console.log(formData);
  revalidatePath('/');
};
