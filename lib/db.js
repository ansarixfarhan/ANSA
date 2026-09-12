import fs from "fs";
import path from "path";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJson(file, defaultVal = []) {
  ensureDir();
  try {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, JSON.stringify(defaultVal, null, 2), "utf8");
      return defaultVal;
    }
    const raw = fs.readFileSync(file, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
    return defaultVal;
  }
}

function writeJson(file, data) {
  ensureDir();
  try {
    const tempFile = `${file}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf8");
    fs.renameSync(tempFile, file);
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
  }
}

// ── Password Utilities ─────────────────────────────────────────────────────────
export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  try {
    const [salt, hash] = storedHash.split(":");
    if (!salt || !hash) return false;
    const testHash = crypto.scryptSync(password, salt, 64).toString("hex");
    return crypto.timingSafeEqual(Buffer.from(testHash, "hex"), Buffer.from(hash, "hex"));
  } catch {
    return false;
  }
}

// ── User Management ───────────────────────────────────────────────────────────
export function getAllUsers() {
  return readJson(USERS_FILE, []);
}

export function findUserByEmail(email) {
  if (!email) return null;
  const users = getAllUsers();
  return users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase()) || null;
}

export function findUserById(id) {
  if (!id) return null;
  const users = getAllUsers();
  return users.find((u) => u.id === id) || null;
}

export function createUser({ name, email, phone, password }) {
  const users = getAllUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
    throw new Error("An account with this email already exists.");
  }

  const id = `usr_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
  const passwordHash = hashPassword(password);

  const newUser = {
    id,
    name: name.trim(),
    email: normalizedEmail,
    phone: phone ? phone.trim() : "",
    passwordHash,
    role: "customer",
    address: "",
    city: "",
    state: "",
    pincode: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeJson(USERS_FILE, users);

  // Return user without sensitive passwordHash
  const { passwordHash: _, ...safeUser } = newUser;
  return safeUser;
}

export function updateUser(id, updates) {
  const users = getAllUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    throw new Error("User not found");
  }

  const allowedFields = ["name", "phone", "address", "city", "state", "pincode"];
  const currentUser = users[index];

  for (const field of allowedFields) {
    if (updates[field] !== undefined) {
      currentUser[field] = updates[field];
    }
  }

  if (updates.password) {
    currentUser.passwordHash = hashPassword(updates.password);
  }

  currentUser.updatedAt = new Date().toISOString();
  users[index] = currentUser;
  writeJson(USERS_FILE, users);

  const { passwordHash: _, ...safeUser } = currentUser;
  return safeUser;
}

// ── Orders Management ─────────────────────────────────────────────────────────
export function getAllOrders() {
  return readJson(ORDERS_FILE, []);
}

export function findOrderById(id) {
  if (!id) return null;
  const orders = getAllOrders();
  return orders.find((o) => o.id === id || o.order_number === id) || null;
}

export function findOrderByNumber(orderNumber) {
  if (!orderNumber) return null;
  const orders = getAllOrders();
  const query = orderNumber.trim().toUpperCase();
  return orders.find((o) => o.order_number.toUpperCase() === query) || null;
}

export function getOrdersByUserId(userId) {
  if (!userId) return [];
  const orders = getAllOrders();
  return orders.filter((o) => o.user_id === userId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

export function getOrdersByEmail(email) {
  if (!email) return [];
  const orders = getAllOrders();
  const query = email.trim().toLowerCase();
  return orders.filter((o) => o.email?.toLowerCase() === query).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

export function createOrder({
  userId = null,
  customer,
  items,
  paymentMethod = "cod",
  paymentStatus = "pending",
  subtotal,
  shipping,
  total,
  razorpay = null,
}) {
  const orders = getAllOrders();
  const id = `ord_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`;
  const orderNumber = "ANSA-" + Date.now().toString().slice(-6);

  const newOrder = {
    id,
    order_number: orderNumber,
    user_id: userId || null,
    customer_name: customer.name,
    phone: customer.phone,
    email: customer.email,
    address: customer.address,
    city: customer.city,
    state: customer.state,
    pincode: customer.pincode,
    subtotal: Number(subtotal),
    shipping: Number(shipping),
    total: Number(total),
    payment_method: paymentMethod,
    payment_status: paymentStatus,
    status: "processing", // processing -> confirmed -> shipped -> delivered
    tracking_id: `AWB${Date.now().toString().slice(-8)}`,
    courier: "BlueDart Express",
    razorpay_order_id: razorpay?.order_id || null,
    razorpay_payment_id: razorpay?.payment_id || null,
    items: items.map((item) => ({
      id: item.id,
      title: item.title,
      product_name: item.title,
      size: item.size || null,
      price: Number(item.price),
      qty: Number(item.qty || 1),
      image: item.image || item.images?.[0] || "/title_logo.png",
    })),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  orders.unshift(newOrder);
  writeJson(ORDERS_FILE, orders);

  return newOrder;
}

export function updateOrderStatus(orderId, status) {
  return updateOrderFull(orderId, { status });
}

export function updateOrderFull(orderId, updates) {
  const orders = getAllOrders();
  const index = orders.findIndex((o) => o.id === orderId || o.order_number === orderId);
  if (index === -1) return null;

  const allowedFields = [
    "status",
    "tracking_id",
    "courier",
    "payment_status",
    "payment_method",
    "customer_name",
    "phone",
    "email",
    "address",
    "city",
    "state",
    "pincode",
  ];

  for (const field of allowedFields) {
    if (updates[field] !== undefined) {
      orders[index][field] = updates[field];
    }
  }

  orders[index].updated_at = new Date().toISOString();
  writeJson(ORDERS_FILE, orders);
  return orders[index];
}

export function deleteOrder(orderId) {
  const orders = getAllOrders();
  const index = orders.findIndex((o) => o.id === orderId || o.order_number === orderId);
  if (index === -1) return false;

  orders.splice(index, 1);
  writeJson(ORDERS_FILE, orders);
  return true;
}

export function getAdminMetrics() {
  const orders = getAllOrders();
  const users = getAllUsers();

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  const statusCounts = {
    total: orders.length,
    processing: orders.filter((o) => o.status === "processing").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  const paymentStats = {
    cod: orders.filter((o) => o.payment_method === "cod").length,
    razorpay: orders.filter((o) => o.payment_method === "razorpay" || o.payment_method === "online").length,
    paid: orders.filter((o) => o.payment_status === "paid").length,
    pending: orders.filter((o) => o.payment_status === "pending").length,
  };

  return {
    totalRevenue,
    totalOrders: orders.length,
    totalCustomers: users.length,
    statusCounts,
    paymentStats,
  };
}

