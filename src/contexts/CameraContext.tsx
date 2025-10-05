import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { WebcamDevice } from "../types";

const { electronAPI } = window;

interface WindowMessage {
  type: string;
  payload: string;
}

interface CameraContextType {
  webcams: WebcamDevice[];
  selectedCamera: string;
  setSelectedCamera: (deviceId: string) => void;
}

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export function CameraProvider({ children }: { children: ReactNode }) {
  const [webcams, setWebcams] = useState<WebcamDevice[]>([
    { deviceId: "loading", label: "Loading..." },
  ]);
  const [selectedCamera, setSelectedCamera] = useState<string>("");

  useEffect(() => {
    // Set up listener for webcam updates
    electronAPI.onMessageReceived("shared-window-channel", (_, message) => {
      const msg = message as WindowMessage;
      if (msg.type === "set-webcams") {
        const devices = JSON.parse(msg.payload) as WebcamDevice[];
        setWebcams(devices);
        if (devices.length > 0) {
          setSelectedCamera((current) => current || devices[0].deviceId);
        }
      }
    });

    // Request the webcam list when component mounts
    electronAPI.sendSync("shared-window-channel", {
      type: "request-webcams",
      payload: "",
    });
  }, []); // Only run once on mount

  return (
    <CameraContext.Provider value={{ webcams, selectedCamera, setSelectedCamera }}>
      {children}
    </CameraContext.Provider>
  );
}

export function useCameraContext() {
  const context = useContext(CameraContext);
  if (context === undefined) {
    throw new Error("useCameraContext must be used within a CameraProvider");
  }
  return context;
}
