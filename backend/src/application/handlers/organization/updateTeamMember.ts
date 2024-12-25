import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { OrganizationRole } from "../../../domain/enums/index.js";

export const updateTeamMember = async (req: Request, res: Response) => {
  const { teamMemberId, organizationId } = req.params;
  const { role, newTeamId } = req.body;

  try {
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

    if (newTeamId != null) {
      const team = await prisma.team.findUnique({
        where: { id: newTeamId, organizationId },
      });

      if (!team) {
        throw new Error(
          `Invalid newTeamId: '${newTeamId}', it does not exist in organization: '${organizationId}'`
        );
      }
    }

    const updatedTeamMember = await prisma.teamMember.update({
      where: {
        id: teamMemberId,
      },
      data:
        newTeamId == null
          ? {
              role,
            }
          : { teamId: newTeamId, role: role },
    });

    res.status(200).json({ data: updatedTeamMember });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};
