// app/api/convert/route.js
import { NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import { spawn } from "child_process";
import path from "path";
import { randomUUID } from "crypto";
import fs from "fs";

// This function processes the uploaded file and settings
export async function POST(request) {
  try {
    // Get the form data from the request
    const formData = await request.formData();
    const file = formData.get("file");
    const settings = formData.get("settings");

    console.log("Received file:", file);
    console.log("Received settings:", settings);

    if (!file || !settings) {
      return NextResponse.json(
        { error: "Missing file or settings" },
        { status: 400 }
      );
    }

    // Create temp directory if it doesn't exist
    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Save the uploaded file to a temporary location
    const inputFilePath = path.join(
      tempDir,
      `input-${randomUUID()}${path.extname(file.name)}`
    );
    const outputFilePath = path.join(
      tempDir,
      `output-${randomUUID()}${path.extname(file.name)}`
    );

    // Store original filename and determine output filename
    const originalFilename = file.name;
    const outputFilename = originalFilename.replace(
      path.extname(originalFilename),
      path.extname(originalFilename) // Keep the same extension for now, modify based on conversion settings if needed
    );

    // Save the file to disk
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(inputFilePath, buffer);

    // Parse the settings string into an array of arguments
    const settingsArgs = settings.split(" ").filter((arg) => arg !== "");

    // Build the FFmpeg command with input and output files
    const ffmpegArgs = ["-i", inputFilePath, ...settingsArgs, outputFilePath];

    // Execute FFmpeg command
    await runFFmpegCommand(ffmpegArgs);

    // Read the output file
    const outputBuffer = await fs.promises.readFile(outputFilePath);

    // Clean up temp files
    await Promise.all([
      unlink(inputFilePath).catch(() => {}),
      unlink(outputFilePath).catch(() => {}),
    ]);

    fs.unlink(inputFilePath, (err) => {
      if (err) {
        console.error("Error deleting input file:", err);
      } else {
        console.log("Input file deleted successfully");
      }
    });

    // Return the converted file
    return new NextResponse(outputBuffer, {
      headers: {
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(
          outputFilename
        )}`,
        "Content-Type": determineContentType(outputFilename),
      },
    });
  } catch (error: any) {
    console.error("Error processing file:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Helper function to run FFmpeg command and capture output
function runFFmpegCommand(args) {
  return new Promise((resolve, reject) => {
    console.log("Running FFmpeg with args:", args);
    const ffmpeg = spawn("ffmpeg", args);

    const stdoutChunks = [];
    const stderrChunks = [];

    ffmpeg.stdout.on("data", (data) => {
      stdoutChunks.push(data);
    });

    ffmpeg.stderr.on("data", (data) => {
      stderrChunks.push(data);
    });

    ffmpeg.on("close", (code) => {
      const stdout = Buffer.concat(stdoutChunks).toString();
      const stderr = Buffer.concat(stderrChunks).toString();

      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(`FFmpeg process exited with code ${code}: ${stderr}`);
      }
    });

    ffmpeg.on("error", (err) => {
      reject(new Error(`Failed to start FFmpeg process: ${err.message}`));
    });
  });
}

// Helper function to determine content type based on file extension
function determineContentType(filename) {
  const ext = path.extname(filename).toLowerCase();

  const contentTypes = {
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".avif": "image/avif",
    ".mov": "video/quicktime",
    ".avi": "video/x-msvideo",
  };

  return contentTypes[ext] || "application/octet-stream";
}
