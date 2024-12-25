import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  IncidentSeverity,
  IncidentStatus,
} from "../../../domain/enums/index.js";

export const updateIncident = async (req: Request, res: Response) => {
  const { serviceId, incidentId } = req.params;
  const { title, description, severity, status, resolvedAt } = req.body;

  try {
    if (
      severity != null &&
      !Object.values(IncidentSeverity).includes(severity)
    ) {
      throw new Error(
        `Provided Incident Severity is not valid. Please specify one from the following: ${JSON.stringify(
          Object.values(IncidentSeverity)
        )}`
      );
    }
    if (status != null && !Object.values(IncidentStatus).includes(status)) {
      throw new Error(
        `Provided Incident Status is not valid. Please specify one from the following: ${JSON.stringify(
          Object.values(IncidentStatus)
        )}`
      );
    }

    const prisma: PrismaClient = req.app.locals.prisma;

    const incident = await prisma.incident.findUniqueOrThrow({
      where: {
        id: incidentId,
        serviceId,
      },
    });

    const updatedIncident = await prisma.incident.update({
      where: {
        id: incidentId,
        serviceId,
      },
      data: {
        title: title ?? incident.title,
        description: description ?? incident.description,
        severity: severity ?? incident.severity,
        status: status ?? incident.status,
        resolvedAt: resolvedAt ?? incident.resolvedAt,
      },
    });

    res.status(201).json({ data: updatedIncident });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};
