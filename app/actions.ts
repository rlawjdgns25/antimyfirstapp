"use server";

import prisma from "@/lib/prisma";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "모든 필드를 입력해주세요." };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "이미 존재하는 이메일입니다." };
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // In a real app, hash this password
      },
    });

    return { success: true, user: { id: user.id, name: user.name, email: user.email } };
  } catch (error) {
    return { error: "서버 오류가 발생했습니다." };
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "모든 필드를 입력해주세요." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return { error: "이메일 또는 비밀번호가 일치하지 않습니다." };
    }

    return { success: true, user: { id: user.id, name: user.name, email: user.email } };
  } catch (error) {
    return { error: "서버 오류가 발생했습니다." };
  }
}
