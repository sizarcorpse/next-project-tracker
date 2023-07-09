"use client";

import { fetchSvg } from "@/utils/";
import { forwardRef, useEffect, useState } from "react";

type SvgProps = React.HTMLProps<HTMLDivElement> & {
  url: string;
};

const Svg = forwardRef<HTMLDivElement, SvgProps>(({ url, ...props }, ref) => {
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    fetchSvg(url).then((data) => setSvg(data));
  }, [url]);
  return (
    <div ref={ref} dangerouslySetInnerHTML={{ __html: svg }} {...props}></div>
  );
});

Svg.displayName = "Svg";

export default Svg;
