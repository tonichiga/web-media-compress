"use client";

import { FileVideo, ImageIcon } from "lucide-react";
import { MediaType } from "../types";
import { Tabs, TabsList, TabsTrigger } from "@/07.shared/components/ui/tabs";

interface MediaTypeSelectorProps {
  mediaType: MediaType;
  setMediaType: (type: MediaType) => void;
}

export default function MediaTypeSelector({
  mediaType,
  setMediaType,
}: MediaTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-medium">Media Type</h2>
      <Tabs
        defaultValue={mediaType}
        onValueChange={(value) => setMediaType(value as MediaType)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="video" className="flex items-center gap-2">
            <FileVideo className="h-4 w-4" />
            <span>Video</span>
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            <span>Image</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
