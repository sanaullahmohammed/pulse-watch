import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const deleteIncident = async (req: Request, res: Response) => {
  const { incidentId, serviceId } = req.params;

  const prisma: PrismaClient = req.app.locals.prisma;

  try {
    const incident = await prisma.incident.findUnique({
      where: { id: incidentId, serviceId },
    });
    if (!incident) {
      throw new Error(
        `Incident having Id: '${incidentId}' and Service Id: '${serviceId}' does not exist`
      );
    }

    await prisma.incident.delete({
      where: {
        id: incidentId,
        serviceId,
      },
    });
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ data: err });
  }
};
