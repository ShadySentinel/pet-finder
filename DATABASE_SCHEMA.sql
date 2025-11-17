-- Create pets table
CREATE TABLE pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  species VARCHAR(100) NOT NULL,
  breed VARCHAR(100) NOT NULL,
  description TEXT,
  microchip_id VARCHAR(100),
  qr_code_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on owner_id for faster queries
CREATE INDEX pets_owner_id_idx ON pets(owner_id);

-- Enable RLS on pets table
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for users to read/write their own pets
CREATE POLICY "Users can read their own pets"
  ON pets FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert their own pets"
  ON pets FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own pets"
  ON pets FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own pets"
  ON pets FOR DELETE
  USING (auth.uid() = owner_id);

-- Create storage bucket for QR codes
INSERT INTO storage.buckets (id, name, public)
VALUES ('pet-qr-codes', 'pet-qr-codes', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policy for storage
CREATE POLICY "Public Access for QR Codes"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'pet-qr-codes');

CREATE POLICY "Users can upload their own QR codes"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'pet-qr-codes' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
