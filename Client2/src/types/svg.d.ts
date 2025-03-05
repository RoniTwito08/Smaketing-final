declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string; // ייבוא של ה-SVG גם כנתיב
  export default src;
}
