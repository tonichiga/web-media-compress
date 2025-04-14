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
import { Switch } from "@/07.shared/components/ui/switch";
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

interface ImageOptionsProps {
  resolution: string;
  setResolution: (value: string) => void;
  width: number;
  setWidth: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
  compressionLevel: number;
  setCompressionLevel: (value: number) => void;
  maintainAspectRatio: boolean;
  setMaintainAspectRatio: (value: boolean) => void;
  batchProcessing: boolean;
  setBatchProcessing: (value: boolean) => void;
}

export default function ImageOptions({
  resolution,
  setResolution,
  width,
  setWidth,
  height,
  setHeight,
  compressionLevel,
  setCompressionLevel,
  maintainAspectRatio,
  setMaintainAspectRatio,
  batchProcessing,
  setBatchProcessing,
}: ImageOptionsProps) {
  const [isOpen, setIsOpen] = useState(true);

  const resolutions = [
    { value: "original", label: "Original" },
    { value: "large", label: "Large (1920×1080)" },
    { value: "medium", label: "Medium (1280×720)" },
    { value: "small", label: "Small (800×600)" },
    { value: "custom", label: "Custom Dimensions" },
  ];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">Image Options</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Configure image-specific conversion settings
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
                <Label htmlFor="imageResolution">Resolution</Label>
                <Select value={resolution} onValueChange={setResolution}>
                  <SelectTrigger id="imageResolution">
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
                    <Label htmlFor="imageWidth">Width (px)</Label>
                    <Input
                      id="imageWidth"
                      type="number"
                      value={width}
                      onChange={(e) =>
                        setWidth(Number.parseInt(e.target.value))
                      }
                      min={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="imageHeight">Height (px)</Label>
                    <Input
                      id="imageHeight"
                      type="number"
                      value={height}
                      onChange={(e) =>
                        setHeight(Number.parseInt(e.target.value))
                      }
                      min={1}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="aspectRatio"
                  checked={maintainAspectRatio}
                  onCheckedChange={setMaintainAspectRatio}
                />
                <Label htmlFor="aspectRatio" className="cursor-pointer">
                  Maintain aspect ratio
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        When enabled, the image will maintain its original
                        proportions
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            {/* Compression Level */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="compressionLevel">Compression Level</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Higher compression = smaller file size but potentially
                          lower quality. Only applies to certain formats like
                          PNG.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-sm font-medium">{compressionLevel}</span>
              </div>
              <Slider
                id="compressionLevel"
                value={[compressionLevel]}
                min={1}
                max={9}
                step={1}
                onValueChange={(value) => setCompressionLevel(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Low (Faster)</span>
                <span>High (Slower)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            {/* Batch Processing */}
            <div className="flex items-center space-x-2">
              <Switch
                id="batchProcessing"
                checked={batchProcessing}
                onCheckedChange={setBatchProcessing}
              />
              <div>
                <Label htmlFor="batchProcessing" className="cursor-pointer">
                  Enable batch processing
                </Label>
                <p className="text-sm text-gray-500">
                  Process multiple images with the same settings
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}
