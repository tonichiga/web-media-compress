import { Input } from "@/07.shared/components/ui/input";
// import { Label } from "@/07.shared/components/ui/label";
import { MediaType } from "../types";
import { imageFormats, videoFormats } from "../config";
import { Card, CardContent } from "@/07.shared/components/ui/card";
import axios from "axios";
import { getFileNameFromContentDisposition } from "../lib";

interface UploadFileProps {
  mediaType: MediaType;
  command: string;
  setConvertedFile: any;
  setProcessing: any;
}

const UploadFile = ({
  mediaType,
  command,
  setConvertedFile,
  setProcessing,
}: UploadFileProps) => {
  const formats = mediaType === "video" ? videoFormats : imageFormats;

  const handleUploadFile = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mediaType", mediaType);
    formData.append("settings", command);

    setProcessing(true);
    const response = await axios("/api/convert", {
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob", // Важно: указываем тип ответа как blob
    });

    // Данные уже в формате blob
    const fileName = getFileNameFromContentDisposition(
      // Получаем имя файла из заголовков, если доступно
      response.headers["content-disposition"] ||
        'attachment; filename="converted-file"'
    );

    // Создаем объект File из Blob для более удобной работы
    const convertedFile = new File([response.data], fileName, {
      type: response.data.type,
    });
    setConvertedFile(convertedFile);
    setProcessing(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Upload</h2>
      </div>
      <Card>
        <CardContent className="p-4">
          <Input
            accept={formats.map((format) => `.${format}`).join(",")}
            id="file-upload"
            name="file-upload"
            placeholder="Upload file"
            required
            onChange={handleUploadFile}
            className="w-full !bg-muted cursor-pointer pt-[6px]"
            type="file"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadFile;
