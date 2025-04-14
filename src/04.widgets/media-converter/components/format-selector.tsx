"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/07.shared/components/ui/select";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/07.shared/components/ui/tooltip";
import { MediaType } from "../types";
import { imageFormats, videoFormats } from "../config";

interface FormatSelectorProps {
  label: string;
  mediaType: MediaType;
  value: string;
  onChange: (value: string) => void;
  isInput: boolean;
}

export default function FormatSelector({
  label,
  mediaType,
  value,
  onChange,
  isInput,
}: FormatSelectorProps) {
  const formats = mediaType === "video" ? videoFormats : imageFormats;

  const formatInfo = {
    mp4: "Most compatible video format, good quality and file size balance",
    webm: "Modern web-optimized format, better compression than MP4",
    mov: "Apple QuickTime format, high quality but larger file size",
    avi: "Older format with wide compatibility but larger file size",
    mkv: "Container format that can hold multiple audio/video tracks",
    jpg: "Common image format with lossy compression, smaller file size",
    png: "Lossless compression with transparency support",
    webp: "Modern format with better compression than JPG and PNG",
    avif: "Newest format with excellent compression and quality",
    gif: "Animated image format, limited colors",
    tiff: "High quality format often used in publishing",
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-medium">{label}</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                Select the {isInput ? "source" : "destination"} format for your{" "}
                {mediaType}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {formats.map((format) => (
            <SelectItem
              key={format}
              value={format}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span>.{format}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        {formatInfo[format as keyof typeof formatInfo]}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
