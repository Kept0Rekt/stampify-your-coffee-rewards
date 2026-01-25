import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Flashlight, Camera, Smartphone, Stamp, Gift, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Scan() {
  const navigate = useNavigate();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [flashOn, setFlashOn] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualCode, setManualCode] = useState("");

  const requestPermission = async () => {
    // In a real app, this would request camera permission
    setHasPermission(true);
  };

  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      // Process the code
      console.log("Manual code submitted:", manualCode);
      navigate("/wallet");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="pt-safe relative z-20">
        <div className="px-5 pt-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center touch-feedback"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          
          <button
            onClick={() => setFlashOn(!flashOn)}
            className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center touch-feedback ${
              flashOn ? "bg-amber-500" : "bg-black/50"
            }`}
          >
            <Flashlight className={`w-5 h-5 ${flashOn ? "text-black" : "text-white"}`} />
          </button>
        </div>
      </header>

      {/* Camera Viewfinder */}
      <div className="flex-1 relative">
        {hasPermission === null || !hasPermission ? (
          // Permission request
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-2xl p-8 text-center max-w-sm border border-border"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Camera Access Required
              </h2>
              <p className="text-muted-foreground mb-6">
                To scan QR codes, we need camera permission
              </p>
              <Button className="w-full btn-primary" onClick={requestPermission}>
                Grant Permission
              </Button>
            </motion.div>
          </div>
        ) : (
          // Camera active (simulated)
          <div className="absolute inset-0 bg-gray-900">
            {/* Scan guide overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-64 h-64 relative"
              >
                {/* Corner markers */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />
                
                {/* Scanning line animation */}
                <motion.div
                  className="absolute left-2 right-2 h-0.5 bg-primary shadow-lg"
                  style={{ boxShadow: "0 0 10px hsl(158 64% 52%)" }}
                  animate={{ top: ["10%", "90%", "10%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="relative z-10 px-6 py-6 bg-background">
        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-foreground">
            Tap NFC terminal or
          </p>
          <p className="text-lg font-semibold text-foreground">
            point camera at QR code
          </p>
        </div>

        {/* Manual Entry Toggle */}
        {!showManualEntry ? (
          <Button
            variant="outline"
            className="w-full rounded-xl"
            onClick={() => setShowManualEntry(true)}
          >
            <Keyboard className="w-4 h-4 mr-2" />
            Enter Code Manually
          </Button>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-3"
          >
            <Input
              placeholder="Enter stamp code..."
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="h-12 rounded-xl text-center text-lg"
            />
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-xl"
                onClick={() => setShowManualEntry(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 btn-primary rounded-xl"
                onClick={handleManualSubmit}
                disabled={!manualCode.trim()}
              >
                Submit
              </Button>
            </div>
          </motion.div>
        )}

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-4 rounded-xl bg-muted/30"
        >
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3">
            How stamping works
          </p>
          <div className="space-y-3">
            {[
              { icon: Smartphone, text: "Tap phone on NFC terminal" },
              { icon: Stamp, text: "Stamp added automatically" },
              { icon: Gift, text: "Earn rewards!" },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-foreground">{step.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
