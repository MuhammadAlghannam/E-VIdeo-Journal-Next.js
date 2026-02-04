"use server";

type DeleteAccountPayload = { user_id: string | number; email: string };

export async function DeleteAccount(payload: DeleteAccountPayload): Promise<string> {
  // Make the API call to your backend
  const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  //payload
  const data: string = await response.json();

  return data;
}
