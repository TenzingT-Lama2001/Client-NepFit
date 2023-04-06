import { DropzoneOptions, useDropzone } from "react-dropzone";
// @mui
import { styled, Theme } from "@mui/material/styles";
import { Box, SxProps } from "@mui/material";
// type

//
import Image from "../Image";

import BlockContent from "./BlockContent";
import { CustomFile } from "../hook-form/RHFUpload";
import { ReactNode } from "react";

// ----------------------------------------------------------------------
export interface UploadProps extends DropzoneOptions {
  error?: boolean;
  file: CustomFile | string | null;
  helperText?: ReactNode;
  sx?: SxProps<Theme>;
}
const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  overflow: "hidden",
  position: "relative",
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("padding"),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

// ----------------------------------------------------------------------

export default function UploadSingleFile({
  error = false,
  file,
  helperText,
  sx,
  ...other
}: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      multiple: false,
      ...other,
    });

  return (
    <Box sx={{ width: "100%", ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }),
          ...(file && {
            padding: "12% 0",
          }),
        }}
      >
        <input {...getInputProps()} />

        <BlockContent />

        {file && (
          <Image
            alt="file preview"
            src={typeof file === "string" ? file : file.preview}
            sx={{
              top: 8,
              left: 8,
              borderRadius: 1,
              position: "absolute",
              width: "calc(100% - 16px)",
              height: "calc(100% - 16px)",
            }}
          />
        )}
      </DropZoneStyle>

      {helperText && helperText}
    </Box>
  );
}
