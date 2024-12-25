import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { OrganizationRole } from "../../../domain/enums/index.js";

export const createTeamMember = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  const { userId, role } = req.body;

  try {
    if (!userId) {
      throw new Error(`User-Id is a required body parameter`);
    }

    if (!role) {
      throw new Error(`Role is a required body parameter`);
    } else if (!Object.values(OrganizationRole).includes(role)) {
      throw new Error(
        `Provided role is not valid. Please specify one from the following: ${JSON.stringify(
          Object.values(OrganizationRole)
        )}`
      );
    }

    const prisma: PrismaClient = req.app.locals.prisma;

    const teamMember = await prisma.teamMember.create({
      data: {
        teamId,
        userId,
        role,
      },
    });

    res.status(201).json({ data: teamMember });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};
