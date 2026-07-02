"use client";

import dynamic from "next/dynamic";

const VoiceWidget = dynamic(() => import("./VoiceWidget").then((mod) => mod.VoiceWidget), {
  ssr: false,
});

export function VoiceWidgetLoader() {
  return <VoiceWidget />;
}
