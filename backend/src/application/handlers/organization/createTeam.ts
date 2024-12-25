import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const createTeam = async (req: Request, res: Response) => {
  const { organizationId } = req.params;
  const { name } = req.body;

  try {
    if (!name) {
      throw new Error(`Team name is a required body parameter`);
    }

    if (!organizationId) {
      throw new Error(`Organization id is a required parameter`);
    }

    const prisma: PrismaClient = req.app.locals.prisma;

    const organization = await prisma.organization.findUnique({
      where: {
        id: organizationId,
      },
    });

    if (!organization) {
      throw new Error(
        `Organization having id: '${organizationId}' does not exist`
      );
    }

    const result = await prisma.team.create({
      data: {
        name,
        organizationId: organizationId,
      },
    });
    res.status(201).json({ data: result });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};
