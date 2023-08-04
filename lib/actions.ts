'use server';
import { revalidatePath } from 'next/cache';
import prisma from './prisma';
import {
  validateAndBuildCreateInvestmentObject,
  validateAndBuildCreateValuationObject,
} from './validators';

export const createInvestment = async (formData: FormData) => {
  try {
    const newInvestment = validateAndBuildCreateInvestmentObject(formData);
    await prisma.investment.create({ data: newInvestment });
  } catch (e) {
    throw e;
  }
  revalidatePath('/');
  //revalidatePath('/portfolio/[id]');
};

export const createValuationEvent = async (formData: FormData, companyId: string) => {
  try {
    const newValuationEvent = validateAndBuildCreateValuationObject(formData, companyId);
    await prisma.valuationEvent.create({ data: newValuationEvent });
  } catch (error) {
    throw error;
  }
  // FIXME: Not working, uses cached data
  revalidatePath('/');
};
