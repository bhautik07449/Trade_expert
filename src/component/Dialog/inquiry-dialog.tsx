import * as React from "react";
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";

type InquiryDialogProps = {
    open: boolean;
    onClose: () => void;
    onSubmit?: (data: Record<string, any>) => void;
    product?: {
        name: string;
        description?: string;
        image?: string;
    };
};

export default function InquiryDialog({
    open,
    onClose,
    onSubmit,
    product = {
        name: "Flavoured Khakhra",
        description:
            "Khakhra is a thin cracker common in Gujarati and Rajasthani cuisines...",
        image: "/product-thumbnail.png",
    },
}: InquiryDialogProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const obj: Record<string, any> = {};
        fd.forEach((v, k) => {
            obj[k] = v;
        });
        obj.getLatestPrice = fd.get("getLatestPrice") === "on";
        if (onSubmit) onSubmit(obj);
        onClose();
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="lg"
            fullScreen={fullScreen}
            scroll="paper"
        >
            <DialogTitle
                sx={{
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: { xs: "18px", sm: "22px", md: "24px" },
                }}
            >
                REQUEST AN INQUIRY
            </DialogTitle>

            <DialogContent
                dividers
                sx={{
                    px: { xs: 2, sm: 4 },
                    py: { xs: 2, sm: 3 },
                }}
            >
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems="center"
                    sx={{ mb: 3 }}
                >
                    <Avatar
                        src={product.image}
                        alt={product.name}
                        variant="rounded"
                        sx={{
                            width: { xs: 70, sm: 60 },
                            height: { xs: 70, sm: 60 },
                        }}
                    />
                    <Box textAlign={{ xs: "center", sm: "left" }}>
                        <Typography fontWeight={600}>{product.name}</Typography>
                        {product.description && (
                            <Typography variant="body2" color="text.secondary">
                                {product.description}
                            </Typography>
                        )}
                    </Box>
                </Stack>

                <Divider sx={{ mb: 3 }} />

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography fontWeight={600} sx={{ mb: 2 }}>
                                Inquiry Information
                            </Typography>

                            <TextField
                                name="subject"
                                label="Subject"
                                fullWidth
                                size="small"
                                required
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                name="message"
                                label="Message"
                                fullWidth
                                size="small"
                                multiline
                                minRows={4}
                                sx={{ mb: 2 }}
                            />

                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid size={{ xs: 12, sm: 5 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Unit</InputLabel>
                                        <Select name="unit" label="Unit" defaultValue="Metric Ton">
                                            <MenuItem value="Metric Ton">Metric Ton</MenuItem>
                                            <MenuItem value="Kilogram">Kilogram</MenuItem>
                                            <MenuItem value="Pound">Pound</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 7 }}>
                                    <TextField
                                        name="quantity"
                                        label="Quantity"
                                        type="number"
                                        fullWidth
                                        size="small"
                                    />
                                </Grid>
                            </Grid>

                            <FormControlLabel
                                control={<Checkbox name="getLatestPrice" />}
                                label="Get latest price"
                                sx={{ mb: 2 }}
                            />

                            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                                <InputLabel>Requirement Frequency</InputLabel>
                                <Select name="frequency" label="Requirement Frequency" defaultValue="Monthly">
                                    <MenuItem value="One-time">One-time</MenuItem>
                                    <MenuItem value="Weekly">Weekly</MenuItem>
                                    <MenuItem value="Monthly">Monthly</MenuItem>
                                    <MenuItem value="Quarterly">Quarterly</MenuItem>
                                    <MenuItem value="Yearly">Yearly</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography fontWeight={600} sx={{ mb: 2 }}>
                                Contact Detail
                            </Typography>

                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <TextField name="firstName" label="First name" fullWidth size="small" required />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <TextField name="lastName" label="Last name" fullWidth size="small" required />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <TextField name="contact" label="Contact" fullWidth size="small" />
                                </Grid>
                            </Grid>

                            <TextField
                                name="company"
                                label="Company name"
                                fullWidth
                                size="small"
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                name="email"
                                label="Business email"
                                type="email"
                                fullWidth
                                size="small"
                                required
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                name="address"
                                label="Business address"
                                fullWidth
                                size="small"
                                multiline
                                minRows={2}
                                sx={{ mb: 2 }}
                            />

                            <FormControl fullWidth size="small">
                                <InputLabel>Business Type</InputLabel>
                                <Select name="businessType" label="Business Type">
                                    <MenuItem value="Retailer">Retailer</MenuItem>
                                    <MenuItem value="Wholesaler">Wholesaler</MenuItem>
                                    <MenuItem value="Manufacturer">Manufacturer</MenuItem>
                                    <MenuItem value="Distributor">Distributor</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <DialogActions
                        sx={{
                            mt: 4,
                            flexDirection: { xs: "column", sm: "row" },
                            gap: 2,
                        }}
                    >
                        <Button
                            onClick={onClose}
                            variant="outlined"
                            fullWidth={fullScreen}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            fullWidth={fullScreen}
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    );
}