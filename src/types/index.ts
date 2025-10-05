export interface SelectOption {
  value: string;
  label: string;
}

export interface WebcamDevice {
  deviceId: string;
  label: string;
}

export interface CameraStyle {
  width?: string;
  height?: string;
  borderRadius?: string;
  transform?: string;
  "-webkit-transform"?: string;
}
