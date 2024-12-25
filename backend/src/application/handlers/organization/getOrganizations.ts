import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const getOrganizations = async (req: Request, res: Response) => {
  const prisma: PrismaClient = req.app.locals.prisma;
  try {
    const result = await prisma.organization.findMany();
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};
