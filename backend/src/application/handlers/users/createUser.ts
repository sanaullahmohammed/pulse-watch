import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  const { email, name, authorizationId } = req.body;

  try {
    if (!email) {
      throw new Error(`User email is a required body parameter`);
    }
    if (!name) {
      throw new Error(`User name is a required body parameter`);
    }
    if (!authorizationId) {
      throw new Error(`User authorizationId is a required body parameter`);
    }

    const prisma: PrismaClient = req.app.locals.prisma;

    const result = await prisma.user.create({
      data: {
        email,
        name,
        authorizationId,
      },
    });
    res.status(201).json({ data: result });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};
