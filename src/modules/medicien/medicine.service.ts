import { medicine, Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
 // here are public route 
const getAllMedicine = async() => {
  const data = await prisma.medicine.findMany({
    orderBy: {
      name:"asc"
    },
  });
  return data;
}
const getSpecificMedicine = async (medicineId: string) => {
  const medicine = await prisma.medicine.findUnique({
    where: {
      id:medicineId
    }
  })
  if (!medicine) {
   throw new Error("this medicine is not located")
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

// here are  seller private route
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

const UpdateMedicine = async (data: Prisma.medicineUpdateInput , medicineId: string) => {
  // chedi data exist in the data base 
  const Medicine = await prisma.medicine.findFirst({
    where: {
      id:medicineId
    }
  })
  if (!Medicine) {
    throw new Error("Medicine not found");
  }
  const updatedMedicine = await prisma.medicine.update({
    where: {
      id: medicineId
    },
    data:data 
 })
  return updatedMedicine
  
}
const DeleteMedicine = async (medicineId: string) => {
  const Medicine = await prisma.medicine.findFirst({
    where: {
      id:medicineId
    }
  })

  if (!Medicine) {
    throw new Error(" This Medicine Not Here Our Shope!")
  }

  const DeleteMedicine = await prisma.medicine.delete({
    where: {
      id:medicineId
    }
  })

  return DeleteMedicine;
  
}
export const mediceneService = {
  addMedicine,
  getAllMedicine,
  getSpecificMedicine,
  GetMedicineWithCategory,
  UpdateMedicine,
  DeleteMedicine
};
