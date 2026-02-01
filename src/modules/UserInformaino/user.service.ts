import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma"

const AllUser = async () => {
  
  const data = prisma.user.findMany({
    orderBy: {
      createdAt:"desc"
    }
  });
  return data

}

const UserStatusUpdate = async (id: string, data: Prisma.UserUpdateInput) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("User does not exist");
  }

  return prisma.user.update({
    where: { id },
    data,
  });
};



export const userService = {
  AllUser,
  UserStatusUpdate
}