import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const getServices = async (req: Request, res: Response) => {
  const { organizationId } = req.params;

  try {
    if (!organizationId) {
      throw new Error(
        `Invalid organization id: '${organizationId}', does not exists`
      );
    }

    const prisma: PrismaClient = req.app.locals.prisma;

    const result = await prisma.service.findMany({ where: { organizationId } });
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};
