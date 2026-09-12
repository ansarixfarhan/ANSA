import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "ansa_admin_session";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("SECURITY ALERT: JWT_SECRET is not defined in environment variables.");
  }
  return new TextEncoder().encode(secret);
}

export function verifyAdminCredentials(username, password) {
  if (!username || !password) return null;

  const envAdminUser = (process.env.ADMIN_USERNAME || "").trim().toLowerCase();
  const envAdminPass = process.env.ADMIN_PASSWORD;

  if (!envAdminPass) {
    console.error("SECURITY ALERT: ADMIN_PASSWORD is not defined in environment variables.");
    return null;
  }

  const inputUser = username.trim().toLowerCase();
  const inputPass = password.trim();

  // Valid admin identifiers: primary env email, designer handle, or 'admin'
  const validUsernames = [
    envAdminUser,
    "kaif_designer888",
    "admin",
  ].filter(Boolean);

  const isUserValid = validUsernames.some((u) => u === inputUser);
  if (!isUserValid) return null;

  // Secure comparison
  if (inputPass !== envAdminPass) return null;

  return {
    username: inputUser,
    name: process.env.ADMIN_NAME || "Master Admin",
    role: "admin",
  };
}

export async function createAdminToken(admin) {
  const secret = getJwtSecret();
  const token = await new SignJWT({
    username: admin.username,
    name: admin.name,
    role: "admin",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  return token;
}

export async function verifyAdminToken(token) {
  try {
    if (!token) return null;
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret);
    if (payload?.role !== "admin") return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getAdminSession(req) {
  try {
    let token = null;

    // Check Authorization header first
    if (req?.headers) {
      const authHeader = req.headers.get?.("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    // Check cookies
    if (!token) {
      const cookieStore = await cookies();
      const cookie = cookieStore.get(ADMIN_COOKIE_NAME);
      token = cookie?.value;
    }

    if (!token) return null;
    return await verifyAdminToken(token);
  } catch {
    return null;
  }
}
