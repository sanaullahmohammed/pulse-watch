import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ServiceStatus } from "../../../domain/enums/index.js";

export const updateService = async (req: Request, res: Response) => {
  const { serviceId, organizationId } = req.params;
  const { name, description, currentStatus, uptimePercentage } = req.body;

  try {
    if (
      currentStatus != null &&
      !Object.values(ServiceStatus).includes(currentStatus)
    ) {
      throw new Error(
        `Provided currentStatus is not valid. Please specify one from the following: ${JSON.stringify(
          Object.values(ServiceStatus)
        )}`
      );
    }

    const prisma: PrismaClient = req.app.locals.prisma;

    const service = await prisma.service.findUniqueOrThrow({
      where: { id: serviceId, organizationId },
    });

    const updatedService = await prisma.service.update({
      where: {
        id: serviceId,
      },
      data: {
        name: name ?? service.name,
        description: description ?? service.description,
        currentStatus: currentStatus ?? service.currentStatus,
        uptimePercentage: uptimePercentage ?? service.uptimePercentage,
      },
    });

    res.status(200).json({ data: updatedService });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};
