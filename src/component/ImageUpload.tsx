"use client";

import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Typography,
    Skeleton,
} from "@mui/material";
import CMSservice from "../service/cms.service";
import { getImageUrl } from "../utils/imageUtils";

type Props = {
    label?: string;
    value?: string;
    onChange?: (url: string) => void;
    accept?: string;
};

export default function ImageUpload({
    label = "Upload Image",
    value,
    onChange,
    accept = "image/*",
}: Props) {
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (value) {
            setPreview(getImageUrl(value));
        }
    }, [value]);

    const handleImageChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("image", file);

            const response = await CMSservice.imageUpload(formData);
            const imageUrl = response?.data?.url;

            if (imageUrl) {
                setPreview(getImageUrl(imageUrl));
                onChange && onChange(imageUrl);
            }
        } catch (error) {
            console.error("Image upload failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            {label && (
                <Typography variant="subtitle2" mb={1}>
                    {label}
                </Typography>
            )}

            <Button variant="outlined" component="label">
                Choose File
                <input
                    type="file"
                    hidden
                    accept={accept}
                    onChange={handleImageChange}
                />
            </Button>

            {loading && (
                <Box mt={2}>
                    <Skeleton variant="rectangular" width={120} height={120} sx={{ borderRadius: 1 }} />
                </Box>
            )}

            {preview && !loading && (
                <Box mt={2}>
                    <Box
                        component="img"
                        src={preview}
                        sx={{ width: 120, height: 120, objectFit: "contain", bgcolor: "#f0f0f0", borderRadius: 1 }}
                    />
                </Box>
            )}
        </Box>
    );
}