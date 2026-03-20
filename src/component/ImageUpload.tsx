"use client";

import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Typography,
    Avatar
} from "@mui/material";
import CMSservice from "../service/cms.service";

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
            setPreview(value);
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
                setPreview(imageUrl);
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
                    <CircularProgress size={24} />
                </Box>
            )}

            {preview && (
                <Box mt={2}>
                    <Avatar
                        src={preview}
                        variant="rounded"
                        sx={{ width: 120, height: 120 }}
                    />
                </Box>
            )}
        </Box>
    );
}