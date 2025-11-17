import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  addPet,
  getUserPets,
  deletePet,
  updatePetQRCode,
  Pet,
} from "@/lib/petService";
import { generateAndUploadQRCode } from "@/lib/qrService";
import { Download, Trash2, QrCode as QrCodeIcon } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingPet, setIsAddingPet] = useState(false);
  const [generatingQR, setGeneratingQR] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [microchipId, setMicrochipId] = useState("");

  // Load pets on mount
  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      const userPets = await getUserPets(user.id);
      setPets(userPets);
    } catch (error) {
      toast.error("Failed to load pets");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setIsAddingPet(true);
    try {
      const newPet = await addPet(user.id, {
        name,
        species,
        breed,
        description,
        microchip_id: microchipId,
      });

      if (newPet) {
        setPets([newPet, ...pets]);
        setName("");
        setSpecies("");
        setBreed("");
        setDescription("");
        setMicrochipId("");
        toast.success("Pet added successfully!");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add pet");
    } finally {
      setIsAddingPet(false);
    }
  };

  const handleDeletePet = async (petId: string) => {
    try {
      await deletePet(petId);
      setPets(pets.filter((p) => p.id !== petId));
      toast.success("Pet deleted successfully");
    } catch (error) {
      toast.error("Failed to delete pet");
    }
  };

  const handleGenerateQR = async (pet: Pet) => {
    if (!user?.id) return;
    setGeneratingQR(pet.id);

    try {
      const qrUrl = await generateAndUploadQRCode(pet.id, user.id);
      await updatePetQRCode(pet.id, qrUrl);

      setPets(
        pets.map((p) => (p.id === pet.id ? { ...p, qr_code_url: qrUrl } : p))
      );
      toast.success("QR code generated!");
    } catch (error) {
      toast.error("Failed to generate QR code");
      console.error(error);
    } finally {
      setGeneratingQR(null);
    }
  };

  const handleDownloadQR = (qrUrl: string, petName: string) => {
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `${petName}-qr-code.png`;
    link.click();
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">PetFinder Dashboard</h1>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Pet Form */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Add New Pet</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddPet} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pet-name">Pet Name</Label>
                  <Input
                    id="pet-name"
                    placeholder="e.g. Max"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="species">Species</Label>
                  <Input
                    id="species"
                    placeholder="e.g. Dog"
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="breed">Breed</Label>
                  <Input
                    id="breed"
                    placeholder="e.g. Golden Retriever"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Color, size, distinctive marks..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="microchip">Microchip ID (optional)</Label>
                  <Input
                    id="microchip"
                    placeholder="123456789"
                    value={microchipId}
                    onChange={(e) => setMicrochipId(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isAddingPet}>
                  {isAddingPet ? "Adding..." : "Add Pet"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Pets List */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {isLoading ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground">Loading pets...</p>
                  </CardContent>
                </Card>
              ) : pets.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground">
                      No pets yet. Add one to get started!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                pets.map((pet) => (
                  <Card key={pet.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{pet.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {pet.breed} • {pet.species}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {pet.description && (
                        <p className="text-sm">{pet.description}</p>
                      )}
                      {pet.microchip_id && (
                        <p className="text-sm text-muted-foreground">
                          Microchip: {pet.microchip_id}
                        </p>
                      )}

                      <div className="flex gap-2 flex-wrap">
                        {pet.qr_code_url ? (
                          <>
                            <div className="flex gap-2">
                              <img
                                src={pet.qr_code_url}
                                alt={`${pet.name} QR Code`}
                                className="w-24 h-24 border rounded"
                              />
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleDownloadQR(pet.qr_code_url!, pet.name)
                                }
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download QR
                              </Button>
                            </div>
                          </>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGenerateQR(pet)}
                            disabled={generatingQR === pet.id}
                          >
                            <QrCodeIcon className="w-4 h-4 mr-2" />
                            {generatingQR === pet.id
                              ? "Generating..."
                              : "Generate QR"}
                          </Button>
                        )}

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeletePet(pet.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
