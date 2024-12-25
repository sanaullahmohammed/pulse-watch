import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { email, name, authorizationId } = req.body;

  try {
    const prisma: PrismaClient = req.app.locals.prisma;

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: email ?? user.email,
        name: name ?? user.name,
        authorizationId: authorizationId ?? user.authorizationId,
      },
    });

    res.status(200).json({ data: updatedUser });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};
