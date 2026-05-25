import {
    Box,
    Container,
    Typography,
    Paper,
    Grid,
    Divider,
    Stack,
} from "@mui/material";
import UpcommingFeatures from "../../commonUI/UpcommingFeatures";
import LabelTitle from "../../commonUI/labelTitle";

const personnelData = [
    {
        label: "Name",
        value: "Personnel Name",
    },
    {
        label: "Designation",
        value: "Designation",
    },
    {
        label: "Department",
        value: "Department",
    },
    {
        label: "Employee ID",
        value: "Employee ID",
    },
    {
        label: "Joining Date",
        value: "Joining Date",
    },
];

export default function PersonnelRegister() {
    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                py: { xs: 4, md: 7 },
            }}
        >
            <Container
                sx={{
                    maxWidth: "1200px !important",
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4 },
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        bgcolor: "background.paper",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                        overflow: "hidden",
                    }}
                >
                    <LabelTitle title="Personnel Register" label="Join the Platform" />

                    <Box
                        sx={{
                            p: { xs: 2, sm: 3, md: 4 },
                        }}
                    >
                        <Grid
                            container
                            sx={{
                                minHeight: { xs: "auto", md: 430 },
                                border: "1px solid",
                                borderColor: "secondary.main",
                                borderRadius: 2,
                                overflow: "hidden",
                                bgcolor: "background.paper",
                            }}
                        >
                            <Grid
                                size={{ xs: 12, md: 3 }}
                                sx={{
                                    borderRight: {
                                        xs: "none",
                                        md: "1px solid",
                                    },
                                    borderBottom: {
                                        xs: "1px solid",
                                        md: "none",
                                    },
                                    borderColor: "secondary.main",
                                    bgcolor: "primary.light",
                                }}
                            >
                                <Stack divider={<Divider />}>
                                    {personnelData.map((item, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                px: 2,
                                                py: 1.6,
                                                minHeight: 48,
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: "text.primary",
                                                    fontWeight: 600,
                                                    fontSize: {
                                                        xs: "14px",
                                                        md: "15px",
                                                    },
                                                }}
                                            >
                                                {item.label}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Grid>

                            <Grid size={{ xs: 12, md: 9 }}>
                                <Box
                                    sx={{
                                        height: "100%",
                                        p: { xs: 2.5, md: 4 },
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: "secondary.main",
                                            fontWeight: 700,
                                            mb: 2,
                                        }}
                                    >
                                        Personnel Details
                                    </Typography>

                                    <Divider sx={{ mb: 3 }} />

                                    <Grid container spacing={2}>
                                        {personnelData.map((item, index) => (
                                            <Grid
                                                key={index}
                                                size={{ xs: 12, sm: 6 }}
                                            >
                                                <Box
                                                    sx={{
                                                        border: "1px solid",
                                                        borderColor: "divider",
                                                        borderRadius: 2,
                                                        p: 2,
                                                        bgcolor:
                                                            "background.default",
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            color: "text.secondary",
                                                            fontSize: "13px",
                                                            mb: 0.7,
                                                        }}
                                                    >
                                                        {item.label}
                                                    </Typography>

                                                    <Typography
                                                        sx={{
                                                            color: "text.primary",
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {item.value}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>

                                    <Box
                                        sx={{
                                            mt: 4,
                                            p: 2,
                                            border: "1px dashed",
                                            borderColor: "divider",
                                            borderRadius: 2,
                                            bgcolor: "background.default",
                                            flex: 1,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: "text.secondary",
                                                lineHeight: 1.8,
                                            }}
                                        >
                                            Additional personnel register information
                                            can be displayed here.
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>

            <UpcommingFeatures />
        </Box>
    );
}