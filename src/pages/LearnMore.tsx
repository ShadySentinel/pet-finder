import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Shield, Heart, AlertTriangle, ArrowLeft } from "lucide-react";

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Why Pet Safety Matters
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        {/* Main Message Card */}
        <Card className="p-8 md:p-12 mb-12 border-2 shadow-lg">
          <div className="space-y-6 text-lg leading-relaxed">
            <p className="text-xl md:text-2xl font-semibold text-primary mb-6">
              About Pet Tag Finder
            </p>
            
            <p className="text-muted-foreground">
              Pet Tag Finder is dedicated to keeping your beloved companions safe and secure. 
              We understand that pets are more than just animals—they're family members who 
              bring joy, comfort, and unconditional love into our lives every single day.
            </p>

            <p className="text-muted-foreground">
              Our mission is simple: to make pet protection accessible, easy, and effective. 
              By providing a simple QR code solution, we help ensure that if your pet ever 
              wanders away, they can be quickly reunited with you.
            </p>
          </div>
        </Card>

        {/* Importance Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6 border-2 hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Prevention is Easy</h2>
                <p className="text-muted-foreground">
                  Taking steps to protect your pet is surprisingly simple. With just a few 
                  minutes of your time, you can create a permanent safety net for your pet. 
                  A QR code tag attached to your pet's collar acts as an instant connection 
                  between anyone who finds them and you.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2 hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-destructive/10">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Losing a Pet is Not Rare</h2>
                <p className="text-muted-foreground">
                  Unfortunately, pets go missing more often than we'd like to think. Whether 
                  it's a door left open, a fence gate unlatched, or a moment of distraction, 
                  our furry friends can slip away in an instant. It happens to millions of 
                  pet owners every year.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Life-Changing Impact */}
        <Card className="p-8 md:p-12 bg-destructive/5 border-2 border-destructive/20">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-full bg-destructive/10">
              <Heart className="w-8 h-8 text-destructive" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4 text-destructive">
                A Life-Changing Event
              </h2>
              <p className="text-lg leading-relaxed text-foreground mb-4">
                When a pet goes missing, it's not just an inconvenience—it's a life-changing 
                event. The anxiety, the sleepless nights, the constant worry about their 
                safety and wellbeing can be overwhelming. Every moment apart feels like an 
                eternity, and the uncertainty of not knowing where they are or if they're 
                safe is heartbreaking.
              </p>
              <p className="text-lg leading-relaxed text-foreground">
                But it doesn't have to be this way. By taking a few simple preventive measures 
                today, you can dramatically increase the chances of a quick reunion if your 
                pet ever goes missing. Don't wait until it's too late—protect your pet now, 
                because prevention is easy, but losing them is devastating.
              </p>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link to="/">
            <Button size="lg" className="text-base px-8">
              Create Your Pet's Profile Now
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card py-8 border-t mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Pet Tag Finder. Keeping pets safe, one QR code at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default LearnMore;

