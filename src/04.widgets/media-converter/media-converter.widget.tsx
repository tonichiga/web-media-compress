"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/07.shared/components/ui/card";
import { ConversionStatus, MediaType } from "./types";
import MediaTypeSelector from "./components/media-type-selector";
import FormatSelector from "./components/format-selector";
import QualitySettings from "./components/quality-selectors";
import VideoOptions from "./components/video-options";
import ImageOptions from "./components/image-options";
import CommandPreview from "./components/command-preview";
import ConvertButton from "./components/convert-button";
import UploadFile from "./components/upload-file";

export default function MediaConverter() {
  const [mediaType, setMediaType] = useState<MediaType>("video");
  const [inputFormat, setInputFormat] = useState("");
  const [outputFormat, setOutputFormat] = useState("");
  const [quality, setQuality] = useState(mediaType === "video" ? 23 : 80);
  const [command, setCommand] = useState("");
  const [status, setStatus] = useState<ConversionStatus>("idle");
  const [progress, setProgress] = useState(0);

  // Video specific state
  const [resolution, setResolution] = useState("1080p");
  const [customWidth, setCustomWidth] = useState(1920);
  const [customHeight, setCustomHeight] = useState(1080);
  const [frameRate, setFrameRate] = useState(30);
  const [preset, setPreset] = useState("medium");
  const [audioBitrate, setAudioBitrate] = useState("128k");
  const [startTime, setStartTime] = useState("00:00:00");
  const [endTime, setEndTime] = useState("");

  // Image specific state
  const [imageResolution, setImageResolution] = useState("original");
  const [imageWidth, setImageWidth] = useState(1920);
  const [imageHeight, setImageHeight] = useState(1080);
  const [compressionLevel, setCompressionLevel] = useState(6);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [batchProcessing, setBatchProcessing] = useState(false);

  const [convertedFile, setConvertedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  // Set default formats based on media type
  useEffect(() => {
    if (mediaType === "video") {
      setInputFormat("mp4");
      setOutputFormat("mp4");
      setQuality(23);
    } else {
      setInputFormat("jpg");
      setOutputFormat("png");
      setQuality(80);
    }
  }, [mediaType]);

  // Generate FFmpeg command
  useEffect(() => {
    let cmd = "";

    if (mediaType === "video") {
      // cmd += `${inputFormat} `;

      // Add video options
      if (resolution !== "original") {
        const width =
          resolution === "custom"
            ? customWidth
            : resolution === "1080p"
            ? 1920
            : resolution === "720p"
            ? 1280
            : resolution === "480p"
            ? 854
            : 1920;

        const height =
          resolution === "custom"
            ? customHeight
            : resolution === "1080p"
            ? 1080
            : resolution === "720p"
            ? 720
            : resolution === "480p"
            ? 480
            : 1080;

        cmd += `-vf scale=${width}:${height} `;
      }

      // Add frame rate if changed
      if (frameRate !== 30) {
        cmd += `-r ${frameRate} `;
      }

      // Add quality settings
      cmd += `-crf ${quality} `;

      // Add preset
      cmd += `-preset ${preset} `;

      // Add audio bitrate
      cmd += `-b:a ${audioBitrate} `;

      // Add trim options if provided
      if (startTime !== "00:00:00") {
        cmd += `-ss ${startTime} `;
      }

      if (endTime) {
        cmd += `-to ${endTime} `;
      }

      // cmd += `output.${outputFormat}`;
    } else {
      // Image conversion
      // cmd += `${inputFormat} `;

      // Add image options
      if (imageResolution !== "original") {
        const width =
          imageResolution === "custom"
            ? imageWidth
            : imageResolution === "large"
            ? 1920
            : imageResolution === "medium"
            ? 1280
            : imageResolution === "small"
            ? 800
            : 1920;

        const height =
          imageResolution === "custom"
            ? imageHeight
            : imageResolution === "large"
            ? 1080
            : imageResolution === "medium"
            ? 720
            : imageResolution === "small"
            ? 600
            : 1080;

        const aspectRatio = maintainAspectRatio ? "-1" : height;
        cmd += `-vf "scale=${width}:${aspectRatio}" `;
      }

      // Add quality settings
      cmd += `-quality ${quality} `;

      // Add compression level for PNG
      if (outputFormat === "png") {
        cmd += `-compression_level ${compressionLevel} `;
      }

      cmd += `output.${outputFormat}`;

      // Add batch processing note
      if (batchProcessing) {
        cmd +=
          '\n# Note: For batch processing, use: for f in *.jpg; do ffmpeg -i "$f" -quality 80 "${f%.*}.png"; done';
      }
    }

    setCommand(cmd);
  }, [
    mediaType,
    inputFormat,
    outputFormat,
    quality,
    resolution,
    customWidth,
    customHeight,
    frameRate,
    preset,
    audioBitrate,
    startTime,
    endTime,
    imageResolution,
    imageWidth,
    imageHeight,
    compressionLevel,
    maintainAspectRatio,
    batchProcessing,
  ]);

  const handleConvert = () => {
    setStatus("converting");
    setProgress(0);

    // Simulate conversion progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus("completed");
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <div className="mb-6 space-y-6">
          <MediaTypeSelector
            mediaType={mediaType}
            setMediaType={setMediaType}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <FormatSelector
              label="Input Format"
              mediaType={mediaType}
              value={inputFormat}
              onChange={setInputFormat}
              isInput={true}
            />
            <FormatSelector
              label="Output Format"
              mediaType={mediaType}
              value={outputFormat}
              onChange={setOutputFormat}
              isInput={false}
            />
          </div>

          <QualitySettings
            mediaType={mediaType}
            quality={quality}
            setQuality={setQuality}
            outputFormat={outputFormat}
          />

          {mediaType === "video" ? (
            <VideoOptions
              resolution={resolution}
              setResolution={setResolution}
              customWidth={customWidth}
              setCustomWidth={setCustomWidth}
              customHeight={customHeight}
              setCustomHeight={setCustomHeight}
              frameRate={frameRate}
              setFrameRate={setFrameRate}
              preset={preset}
              setPreset={setPreset}
              audioBitrate={audioBitrate}
              setAudioBitrate={setAudioBitrate}
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
            />
          ) : (
            <ImageOptions
              resolution={imageResolution}
              setResolution={setImageResolution}
              width={imageWidth}
              setWidth={setImageWidth}
              height={imageHeight}
              setHeight={setImageHeight}
              compressionLevel={compressionLevel}
              setCompressionLevel={setCompressionLevel}
              maintainAspectRatio={maintainAspectRatio}
              setMaintainAspectRatio={setMaintainAspectRatio}
              batchProcessing={batchProcessing}
              setBatchProcessing={setBatchProcessing}
            />
          )}

          <CommandPreview command={command} />

          <UploadFile
            mediaType={mediaType}
            command={command}
            setConvertedFile={setConvertedFile}
            setProcessing={setProcessing}
          />

          <ConvertButton
            convertedFile={convertedFile}
            onConvert={handleConvert}
            status={status}
            progress={progress}
            processing={processing}
          />
        </div>
      </CardContent>
    </Card>
  );
}
