import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { findUserById } from "./db";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("SECURITY ALERT: JWT_SECRET environment variable is missing.");
  }
  return new TextEncoder().encode(secret);
}

export const AUTH_COOKIE_NAME = "ansa_auth_session";

export async function createSessionToken(user) {
  const secret = getJwtSecret();
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role || "customer",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);

  return token;
}

export async function verifySessionToken(token) {
  try {
    if (!token) return null;
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
}

export async function getCurrentUser(req) {
  try {
    let token = null;

    // Check Authorization header first if present
    if (req?.headers) {
      const authHeader = req.headers.get?.("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    // Otherwise check Next.js cookies
    if (!token) {
      const cookieStore = await cookies();
      const cookie = cookieStore.get(AUTH_COOKIE_NAME);
      token = cookie?.value;
    }

    if (!token) return null;

    const payload = await verifySessionToken(token);
    if (!payload?.id) return null;

    const user = findUserById(payload.id);
    if (!user) return null;

    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
  } catch (err) {
    return null;
  }
}
