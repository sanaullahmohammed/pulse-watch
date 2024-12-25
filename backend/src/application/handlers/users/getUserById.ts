import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const prisma: PrismaClient = req.app.locals.prisma;

  try {
    const result = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};
