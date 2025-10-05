/// <reference types="react-scripts" />

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
