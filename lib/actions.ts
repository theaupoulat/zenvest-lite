'use server';
import { revalidatePath } from 'next/cache';
import prisma from './prisma';
import {
  validateAndBuildCreateInvestmentObject,
  validateAndBuildCreateValuationObject,
} from './validators';

export const createInvestment = async (formData: FormData) => {
  console.log(formData);
  const newInvestment = validateAndBuildCreateInvestmentObject(formData);
  await prisma.investment.create({ data: newInvestment });
  revalidatePath('/');
};

export const createValuationEvent = async (formData: FormData, companyId: string) => {
  const newValuationEvent = validateAndBuildCreateValuationObject(formData, companyId);
  await prisma.valuationEvent.create({ data: newValuationEvent });
  // FIXME: Not working, uses cached data
  revalidatePath('/');
};
