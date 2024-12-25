import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const getTeamMembers = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  const prisma: PrismaClient = req.app.locals.prisma;

  try {
    const result = await prisma.teamMember.findMany({
      where: {
        teamId,
      },
    });
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};
