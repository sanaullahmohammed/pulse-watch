import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const deleteService = async (req: Request, res: Response) => {
  const { organizationId, serviceId } = req.params;

  const prisma: PrismaClient = req.app.locals.prisma;

  try {
    const service = await prisma.service.findUnique({
      where: { id: serviceId, organizationId },
    });
    if (!service) {
      throw new Error(
        `Service having Id: '${serviceId}' and Organization Id: '${organizationId}' does not exist`
      );
    }

    await prisma.service.delete({
      where: {
        id: serviceId,
        organizationId,
      },
    });
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ data: err });
  }
};
