import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const type = formData.get("type") as string;
    const priority = formData.get("priority") as string;
    const attachments = formData.getAll("attachments") as File[];

    // Validation
    if (!title || !message) {
      return NextResponse.json(
        { message: "Title and message are required" },
        { status: 400 }
      );
    }

    // Handle attachments
    const savedAttachments = [];
    const imageAttachments = [];
    if (attachments && attachments.length > 0) {
      const uploadsDir = join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });

      for (const file of attachments) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = `${uuidv4()}-${file.name}`;
        const path = join(uploadsDir, fileName);
        await writeFile(path, buffer);
        savedAttachments.push(fileName);

        // Convert image to base64 for email
        if (file.type.startsWith("image/")) {
          const base64 = buffer.toString("base64");
          imageAttachments.push({
            name: file.name,
            data: `data:${file.type};base64,${base64}`,
          });
        }
      }
    }

    // Send email
    await resend.emails.send({
      from: "Fluxo Contact <no-reply@thallein.com>",
      to: ["soporte@thallein.com"],
      subject: `Nuevo mensaje de contacto: ${title}`,
      html: `
        <strong>Título:</strong> ${title}<br/>
        <strong>Nombre:</strong> ${name}<br/>
        <strong>Email:</strong> ${email}<br/>
        <strong>Tipo:</strong> ${type}<br/>
        <strong>Prioridad:</strong> ${priority}<br/>
        <strong>Mensaje:</strong> ${message}<br/>
        ${
          savedAttachments.length > 0
            ? `<strong>Archivos adjuntos:</strong> ${savedAttachments.join(
                ", "
              )}<br/>`
            : ""
        }
        ${
          imageAttachments.length > 0
            ? `
          <br/><strong>Imágenes adjuntas:</strong><br/>
          ${imageAttachments
            .map(
              (img) =>
                `<img src="${img.data}" alt="${img.name}" style="max-width: 500px; margin: 10px 0;"/><br/>`
            )
            .join("")}
        `
            : ""
        }
      `,
    });

    return NextResponse.json(
      {
        message: "Message sent successfully",
        data: {
          title,
          name,
          email,
          message,
          type,
          priority,
          attachments: savedAttachments,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { message: "Error processing your request" },
      { status: 500 }
    );
  }
}
