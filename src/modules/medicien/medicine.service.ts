import { medicine } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const addMedicine = async (
  data: Omit<medicine, "id" | "createdAt" | "updatedAt" | "Creater">,
  Creater: string,
) => {
  try {
    const medicineCreated = await prisma.medicine.create({
      data: {
        ...data, // other fields: name, description, price, stock, etc.
        seller: { connect: { id: Creater } }, // link the seller properly
      },
    });

    return medicineCreated;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllMedicine = async() => {
  const data = await prisma.medicine.findMany()
  return data;
}
const getSpecificMedicine = async (medicineId: string) => {
  const medicine = await prisma.medicine.findUniqueOrThrow({
    where: {
      id:medicineId
    }
  })
  if (!medicine) {
    return "does not exist medicine"
  }
  return medicine;
}
const GetMedicineWithCategory = async (category: string) => {
  const medicine = await prisma.medicine.findMany({
    where: {
      category:category
    }
  })
  return medicine;
}
export const mediceneService = {
  addMedicine,
  getAllMedicine,
  getSpecificMedicine,
  GetMedicineWithCategory
};
