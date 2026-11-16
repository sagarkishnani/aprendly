import client from "../../../tina/__generated__/client";

export async function loadWhatsappHref(): Promise<string> {
  const result = await client.queries.global({ relativePath: "index.json" });
  const whatsapp = (result.data as any)?.global?.whatsapp;
  const phone = (whatsapp?.phone || "").replace(/\D/g, "");
  const message = encodeURIComponent(whatsapp?.message || "Hola Aprendly");
  return `https://wa.me/${phone}?text=${message}`;
}
