import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/auth";
import { updateUser } from "../../../../lib/db";

export async function PUT(req) {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, phone, address, city, state, pincode, password } = body;

    const updatedUser = updateUser(user.id, {
      name: name?.trim() || user.name,
      phone: phone !== undefined ? phone.trim() : user.phone,
      address: address !== undefined ? address.trim() : user.address,
      city: city !== undefined ? city.trim() : user.city,
      state: state !== undefined ? state.trim() : user.state,
      pincode: pincode !== undefined ? pincode.trim() : user.pincode,
      password: password && password.length >= 6 ? password : undefined,
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully.",
    });
  } catch (err) {
    console.error("Profile update error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update profile." },
      { status: 500 }
    );
  }
}
