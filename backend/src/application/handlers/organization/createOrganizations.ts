import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import slugify from "slugify";

export const createOrganizations = async (req: Request, res: Response) => {
  const { name, ownerId } = req.body;

  try {
    if (!name) {
      throw new Error(`Organization name is a required body parameter`);
    }
    const slug = slugify.default(name as string, { lower: true });

    const prisma: PrismaClient = req.app.locals.prisma;

    if (!ownerId) {
      throw new Error(`Organization name is a required body parameter`);
    } else {
      await prisma.user.findUniqueOrThrow({
        where: {
          id: ownerId,
        },
      });
    }

    const result = await prisma.organization.create({
      data: {
        slug,
        name: name,
        ownerId,
      },
    });
    res.status(201).json({ data: result });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};
