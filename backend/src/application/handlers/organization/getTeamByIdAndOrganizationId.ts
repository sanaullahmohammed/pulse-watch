import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const getTeamByIdAndOrganizationId = async (
  req: Request,
  res: Response
) => {
  const { organizationId, teamId } = req.params;
  try {
    const prisma: PrismaClient = req.app.locals.prisma;

    const result = await prisma.team.findUniqueOrThrow({
      where: {
        organizationId,
        id: teamId,
      },
    });

    res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};
