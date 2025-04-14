"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/07.shared/components/ui/button";
import { Card, CardContent } from "@/07.shared/components/ui/card";

interface CommandPreviewProps {
  command: string;
}

export default function CommandPreview({ command }: CommandPreviewProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Command Preview</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="flex items-center gap-1"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>
      <Card>
        <CardContent className="p-4">
          <pre className="overflow-x-auto whitespace-pre-wrap break-all rounded bg-gray-100 p-3 text-sm font-mono text-gray-800">
            {command}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
