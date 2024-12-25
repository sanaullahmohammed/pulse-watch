import { Request, Response } from "express";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { SignUpDto } from "../../dto/SignUpDto.js";
import { PrismaClient } from "@prisma/client";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password, name }: SignUpDto = req.body;

    const prisma: PrismaClient = req.app.locals.prisma;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error(`User already exists for email: '${email}'`);
    }

    // Create user in Clerk
    const clerkUser = await clerkClient.users.createUser({
      emailAddress: [email],
      password,
      firstName: name,
    });

    // Create user in your database
    const user = await prisma.user.create({
      data: {
        email,
        name,
        authorizationId: clerkUser.id, // Store Clerk's user ID
      },
    });

    res.status(201).json({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Sign up error:", error);
    res.status(400).json({
      error: "Failed to create user",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
