"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/07.shared/components/ui/select";
import { Input } from "@/07.shared/components/ui/input";
import { Label } from "@/07.shared/components/ui/label";
import { Slider } from "@/07.shared/components/ui/slider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/07.shared/components/ui/collapsible";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/07.shared/components/ui/tooltip";
import { Card, CardContent } from "@/07.shared/components/ui/card";

interface VideoOptionsProps {
  resolution: string;
  setResolution: (value: string) => void;
  customWidth: number;
  setCustomWidth: (value: number) => void;
  customHeight: number;
  setCustomHeight: (value: number) => void;
  frameRate: number;
  setFrameRate: (value: number) => void;
  preset: string;
  setPreset: (value: string) => void;
  audioBitrate: string;
  setAudioBitrate: (value: string) => void;
  startTime: string;
  setStartTime: (value: string) => void;
  endTime: string;
  setEndTime: (value: string) => void;
}

export default function VideoOptions({
  resolution,
  setResolution,
  customWidth,
  setCustomWidth,
  customHeight,
  setCustomHeight,
  frameRate,
  setFrameRate,
  preset,
  setPreset,
  audioBitrate,
  setAudioBitrate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}: VideoOptionsProps) {
  const [isOpen, setIsOpen] = useState(true);

  const resolutions = [
    { value: "original", label: "Original" },
    { value: "1080p", label: "1080p (1920×1080)" },
    { value: "720p", label: "720p (1280×720)" },
    { value: "480p", label: "480p (854×480)" },
    { value: "custom", label: "Custom Dimensions" },
  ];

  const presets = [
    { value: "ultrafast", label: "Ultrafast (Fastest, Lowest Quality)" },
    { value: "superfast", label: "Superfast" },
    { value: "veryfast", label: "Very Fast" },
    { value: "faster", label: "Faster" },
    { value: "fast", label: "Fast" },
    { value: "medium", label: "Medium (Default)" },
    { value: "slow", label: "Slow" },
    { value: "slower", label: "Slower" },
    { value: "veryslow", label: "Very Slow (Slowest, Highest Quality)" },
  ];

  const audioBitrates = [
    { value: "64k", label: "64 kbps (Low)" },
    { value: "128k", label: "128 kbps (Medium)" },
    { value: "192k", label: "192 kbps (High)" },
    { value: "256k", label: "256 kbps (Very High)" },
    { value: "320k", label: "320 kbps (Excellent)" },
  ];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">Video Options</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Configure video-specific conversion settings
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CollapsibleTrigger asChild>
          <button className="rounded-full p-1 hover:bg-gray-100">
            {isOpen ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-6">
        <Card>
          <CardContent className="p-4">
            {/* Resolution Settings */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resolution">Resolution</Label>
                <Select value={resolution} onValueChange={setResolution}>
                  <SelectTrigger id="resolution">
                    <SelectValue placeholder="Select Resolution" />
                  </SelectTrigger>
                  <SelectContent>
                    {resolutions.map((res) => (
                      <SelectItem key={res.value} value={res.value}>
                        {res.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {resolution === "custom" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width">Width (px)</Label>
                    <Input
                      id="width"
                      type="number"
                      value={customWidth}
                      onChange={(e) =>
                        setCustomWidth(Number.parseInt(e.target.value))
                      }
                      min={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (px)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={customHeight}
                      onChange={(e) =>
                        setCustomHeight(Number.parseInt(e.target.value))
                      }
                      min={1}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            {/* Frame Rate */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="frameRate">Frame Rate (FPS)</Label>
                <span className="text-sm font-medium">{frameRate} fps</span>
              </div>
              <Slider
                id="frameRate"
                value={[frameRate]}
                min={15}
                max={60}
                step={1}
                onValueChange={(value) => setFrameRate(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>15 fps</span>
                <span>60 fps</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            {/* Preset Selection */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="preset">Encoding Preset</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Faster presets = quicker encoding but larger file size.
                        Slower presets = better compression but longer encoding
                        time.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select value={preset} onValueChange={setPreset}>
                <SelectTrigger id="preset">
                  <SelectValue placeholder="Select Preset" />
                </SelectTrigger>
                <SelectContent>
                  {presets.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            {/* Audio Bitrate */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="audioBitrate">Audio Bitrate</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Higher bitrate = better audio quality but larger file
                        size
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select value={audioBitrate} onValueChange={setAudioBitrate}>
                <SelectTrigger id="audioBitrate">
                  <SelectValue placeholder="Select Audio Bitrate" />
                </SelectTrigger>
                <SelectContent>
                  {audioBitrates.map((bitrate) => (
                    <SelectItem key={bitrate.value} value={bitrate.value}>
                      {bitrate.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            {/* Trimming Options */}
            <div className="space-y-4">
              <h3 className="font-medium">Trim Video (Optional)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time (HH:MM:SS)</Label>
                  <Input
                    id="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="00:00:00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time (HH:MM:SS)</Label>
                  <Input
                    id="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="00:10:00"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}
