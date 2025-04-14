"use client";

import { Download, Loader2 } from "lucide-react";
import { ConversionStatus } from "../types";
import { Button } from "@/07.shared/components/ui/button";
import { Progress } from "@/07.shared/components/ui/progress";

interface ConvertButtonProps {
  onConvert: () => void;
  status: ConversionStatus;
  progress: number;
  convertedFile: File | null;
  processing: boolean;
}

export default function ConvertButton({
  onConvert,
  status,
  progress,
  convertedFile,
  processing,
}: ConvertButtonProps) {
  const downloadFile = () => {
    if (!convertedFile) return;

    // Создаем элемент ссылки
    const a = document.createElement("a");
    const url = URL.createObjectURL(convertedFile);

    // Устанавливаем атрибуты
    a.href = url;
    a.download = convertedFile.name || "converted-file";

    // Добавляем к DOM, симулируем клик и удаляем
    document.body.appendChild(a);
    a.click();

    // Важно очистить
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <div className="space-y-4">
      <div>
        {convertedFile ? (
          <Button
            className="w-full cursor-pointer"
            size="lg"
            onClick={downloadFile}
          >
            <span className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Converted File
            </span>
          </Button>
        ) : (
          <Button
            onClick={onConvert}
            disabled={processing}
            className="w-full"
            size="lg"
          >
            {processing ? (
              <div className="flex items-center justify-between">
                <span className="text-sm">Processing...</span>
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              "Convert"
            )}
          </Button>
        )}
      </div>
      {status !== "idle" && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
    </div>
  );
}
