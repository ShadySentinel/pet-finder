import { supabase } from "./supabase";

export interface Pet {
  id: string;
  owner_id: string;
  name: string;
  species: string;
  breed: string;
  description?: string;
  microchip_id?: string;
  qr_code_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePetInput {
  name: string;
  species: string;
  breed: string;
  description?: string;
  microchip_id?: string;
}

// Add a new pet
export const addPet = async (
  userId: string,
  petData: CreatePetInput
): Promise<Pet | null> => {
  const { data, error } = await supabase
    .from("pets")
    .insert({
      owner_id: userId,
      ...petData,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Get all pets for a user
export const getUserPets = async (userId: string): Promise<Pet[]> => {
  const { data, error } = await supabase
    .from("pets")
    .select("*")
    .eq("owner_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

// Get a single pet by ID
export const getPetById = async (petId: string): Promise<Pet | null> => {
  const { data, error } = await supabase
    .from("pets")
    .select("*")
    .eq("id", petId)
    .single();

  if (error) throw error;
  return data;
};

// Update pet details
export const updatePet = async (
  petId: string,
  updates: Partial<CreatePetInput>
): Promise<Pet | null> => {
  const { data, error } = await supabase
    .from("pets")
    .update(updates)
    .eq("id", petId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Delete a pet
export const deletePet = async (petId: string): Promise<void> => {
  const { error } = await supabase
    .from("pets")
    .delete()
    .eq("id", petId);

  if (error) throw error;
};

// Update pet's QR code URL
export const updatePetQRCode = async (
  petId: string,
  qrCodeUrl: string
): Promise<Pet | null> => {
  const { data, error } = await supabase
    .from("pets")
    .update({ qr_code_url: qrCodeUrl })
    .eq("id", petId)
    .select()
    .single();

  if (error) throw error;
  return data;
};
