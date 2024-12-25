import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const prisma: PrismaClient = req.app.locals.prisma;

    await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    res.status(204).json();
  } catch (err) {
    res.status(500).json({ data: err });
  }
};
