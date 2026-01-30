import { medicine } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const addMedicine = async (
  data: Omit<medicine, "id" | "createdAt" | "updatedAt" | "sellerId">,
  sellerId: string,
) => {
  console.log(sellerId)
  try {
    const medicineCreated = await prisma.medicine.create({
      data: {
        ...data, // other fields: name, description, price, stock, etc.
        seller: { connect: { id: sellerId } }, // link the seller properly
      },
    });

    console.log(medicineCreated);
    return medicineCreated;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const mediceneService = {
  addMedicine,
};
