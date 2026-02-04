import { auth } from "@/lib/auth";

export default async function getPolicy(): Promise<PolicyResponse> {
  const session = await auth();
  if (!session?.token) throw new Error("No token found");

  try {
    const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch policy: ${response.status}`);
    }

    const payload: PolicyResponse = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error as Error;
  }
}
