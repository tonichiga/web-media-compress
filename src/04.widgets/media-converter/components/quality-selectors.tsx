"use client";

import { Slider } from "@/07.shared/components/ui/slider";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/07.shared/components/ui/tooltip";
import { MediaType } from "../types";

interface QualitySettingsProps {
  mediaType: MediaType;
  quality: number;
  setQuality: (value: number) => void;
  outputFormat: string;
}

export default function QualitySettings({
  mediaType,
  quality,
  setQuality,
  outputFormat,
}: QualitySettingsProps) {
  // For video, lower CRF = higher quality
  // For images, higher percentage = higher quality
  const isVideo = mediaType === "video";

  const min = isVideo ? (outputFormat === "webm" ? 24 : 18) : 0;
  const max = isVideo ? (outputFormat === "webm" ? 36 : 28) : 100;
  const step = isVideo ? 1 : 5;

  // For video, we need to invert the display percentage since lower CRF = higher quality
  const displayQuality = isVideo
    ? Math.round(100 - ((quality - min) / (max - min)) * 100)
    : quality;

  const handleChange = (value: number[]) => {
    setQuality(value[0]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-medium">Quality Settings</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              {isVideo ? (
                <p className="max-w-xs">
                  CRF value controls quality (lower = better quality, larger
                  file). Recommended: 18-28 for MP4, 24-36 for WebM
                </p>
              ) : (
                <p className="max-w-xs">
                  Quality percentage (higher = better quality, larger file)
                </p>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">
            {isVideo ? "CRF Value:" : "Quality:"}
          </span>
          <span className="text-sm font-medium">
            {isVideo
              ? `${quality} (${displayQuality}% quality)`
              : `${quality}%`}
          </span>
        </div>

        <Slider
          value={[quality]}
          min={min}
          max={max}
          step={step}
          onValueChange={handleChange}
          className="py-2"
        />

        <div className="flex justify-between text-xs text-gray-500">
          <span>{isVideo ? "Higher Quality" : "Lower Quality"}</span>
          <span>{isVideo ? "Smaller Size" : "Higher Quality"}</span>
        </div>
      </div>
    </div>
  );
}
