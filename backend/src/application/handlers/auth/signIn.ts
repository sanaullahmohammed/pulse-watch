// import { Request, Response } from "express";
// import { clerkClient } from "@clerk/clerk-sdk-node";
// import { SignInDto } from "../../dto/SignInDto.js";

// export const signIn = async (req: Request, res: Response) => {
//   try {
//     const { email, password }: SignInDto = req.body;

//     // Sign in with Clerk
//     const [clerkUser] = await clerkClient.sessions.create;

//     // Verify token and get user ID
//     const session = await clients.verifyClient(signInAttempt.token);

//     // Get user from your database using the permanent Clerk user ID
//     const user = await prisma.user.findFirst({
//       where: {
//         authorizationId: session.userId,
//       },
//     });

//     if (!user) {
//       throw new Error("User not found");
//     }

//     res.status(200).json({
//       data: {
//         token: signInAttempt.token,
//         user: {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           organizationId: user.organizationId,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Sign in error:", error);
//     res.status(401).json({
//       error: "Invalid credentials",
//       details: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };
