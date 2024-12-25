import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const getIncidents = async (req: Request, res: Response) => {
  const { serviceId } = req.params;

  const prisma: PrismaClient = req.app.locals.prisma;

  try {
    const result = await prisma.incident.findMany({
      where: { serviceId: serviceId },
    });
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};
