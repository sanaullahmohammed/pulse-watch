import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const getOrganizationById = async (req: Request, res: Response) => {
  const { organizationId } = req.params;

  const prisma: PrismaClient = req.app.locals.prisma;

  try {
    if (!organizationId) {
      throw new Error(`Organization Id must be present as a parameter`);
    }
    const result = await prisma.organization.findUniqueOrThrow({
      where: {
        id: organizationId,
      },
    });
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};
