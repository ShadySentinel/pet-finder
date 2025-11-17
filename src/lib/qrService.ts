import QRCode from "qrcode";
import { supabase } from "./supabase";

// Generate QR code data URL
export const generateQRCode = async (petId: string): Promise<string> => {
  const baseUrl = import.meta.env.VITE_BASE_URL || window.location.origin;
  const qrUrl = `${baseUrl}/scan/${petId}`;

  try {
    const qrDataUrl = await QRCode.toDataURL(qrUrl, {
      errorCorrectionLevel: "H",
      type: "image/png",
      width: 300,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    return qrDataUrl;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw new Error("Failed to generate QR code");
  }
};

// Upload QR code to Supabase Storage
export const uploadQRCodeToStorage = async (
  petId: string,
  qrDataUrl: string,
  userId: string
): Promise<string> => {
  try {
    // Convert data URL to blob
    const response = await fetch(qrDataUrl);
    const blob = await response.blob();

    // Upload to storage
    const fileName = `qr-codes/${userId}/${petId}.png`;
    const { data, error } = await supabase.storage
      .from("pet-qr-codes")
      .upload(fileName, blob, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) throw error;

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("pet-qr-codes")
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Error uploading QR code:", error);
    throw new Error("Failed to upload QR code");
  }
};

// Generate and upload QR code
export const generateAndUploadQRCode = async (
  petId: string,
  userId: string
): Promise<string> => {
  const qrDataUrl = await generateQRCode(petId);
  const publicUrl = await uploadQRCodeToStorage(petId, qrDataUrl, userId);
  return publicUrl;
};
