import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { StatusDto } from "../../dto/StatusDto.js";

export const getIncidentsAndServicesByOrganization = async (
  req: Request,
  res: Response
) => {
  try {
    const statusDtos: StatusDto[] = [];

    const prisma: PrismaClient = req.app.locals.prisma;

    const organizations = await prisma.organization.findMany();

    for (const organization of organizations) {
      const services = await prisma.service.findMany({
        where: { organizationId: organization.id },
      });

      for (const service of services) {
        const incidents = await prisma.incident.findMany({
          where: { serviceId: service.id },
        });

        const statusDto: StatusDto = {
          id: organization.id,
          name: organization.name,
          services: services as any,
          incidents: incidents as any,
        };

        statusDtos.push(statusDto);
      }
    }

    res.status(200).json({ data: statusDtos });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};
