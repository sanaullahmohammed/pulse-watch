import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  IncidentSeverity,
  IncidentStatus,
} from "../../../domain/enums/index.js";

export const createIncident = async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const { title, description, severity, status, resolvedAt } = req.body;

  try {
    if (!title) {
      throw new Error(`Incident title is a required body parameter`);
    }

    if (!description) {
      throw new Error(`Description is a required parameter`);
    }

    if (!Object.values(IncidentSeverity).includes(severity)) {
      throw new Error(
        `Provided Incident Severity is not valid. Please specify one from the following: ${JSON.stringify(
          Object.values(IncidentSeverity)
        )}`
      );
    }
    if (!Object.values(IncidentStatus).includes(status)) {
      throw new Error(
        `Provided Incident Status is not valid. Please specify one from the following: ${JSON.stringify(
          Object.values(IncidentStatus)
        )}`
      );
    }

    const prisma: PrismaClient = req.app.locals.prisma;

    const incident = await prisma.incident.create({
      data: {
        title,
        description,
        severity,
        status,
        serviceId,
        startedAt: new Date(),
        resolvedAt: resolvedAt == null ? null : new Date(resolvedAt),
      },
    });

    res.status(201).json({ data: incident });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};
