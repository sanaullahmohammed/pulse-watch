import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ServiceStatus } from "../../../domain/enums/index.js";

export const createService = async (req: Request, res: Response) => {
  const { organizationId } = req.params;
  const { name, description, currentStatus, uptimePercentage } = req.body;

  try {
    if (!name) {
      throw new Error(`Team name is a required body parameter`);
    }
    if (!uptimePercentage) {
      throw new Error(`uptime percentage is a required body parameter`);
    }

    if (!currentStatus) {
      throw new Error(`Current-status is a required body parameter`);
    } else if (!Object.values(ServiceStatus).includes(currentStatus)) {
      throw new Error(
        `Provided currentStatus is not valid. Please specify one from the following: ${JSON.stringify(
          Object.values(ServiceStatus)
        )}`
      );
    }

    if (!organizationId) {
      throw new Error(`Organization id is a required parameter`);
    }

    const prisma: PrismaClient = req.app.locals.prisma;

    const result = await prisma.service.create({
      data: {
        name,
        description: description ?? `<No Description>`,
        organizationId,
        currentStatus,
        uptimePercentage,
      },
    });
    res.status(201).json({ data: result });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};
