import { Box, Grid, Paper, Skeleton, Typography } from "@mui/material";
import NoDataFound from "../../commonUI/NoDataFound";

export default function FinancialService({ services, selectedService, setSelectedService, loading }: any) {
    return (
        <Box sx={{ mb: 5 }}>
            <Typography
                variant="h5"
                sx={{
                    color: "secondary.main",
                    fontWeight: 700,
                    textAlign: "center",
                    mb: 3,
                }}
            >
                Financial Service
            </Typography>

            <Grid container spacing={2}>
                {loading ? (
                    [1, 2, 3, 4].map((item) => (
                        <Grid
                            key={item}
                            size={{ xs: 6, sm: 6, md: 3 }}
                        >
                            <Skeleton
                                variant="rounded"
                                height={72}
                                animation="wave"
                            />
                        </Grid>
                    ))
                ) : services?.length > 0 ? ((Array.isArray(services) ? services : []).map((service, index) => (
                    <Grid
                        key={service?.id || index}
                        size={{ xs: 6, sm: 6, md: 3 }}
                    >
                        <Paper
                            elevation={0}
                            onClick={() => setSelectedService(service)}
                            sx={{
                                p: 2,
                                textAlign: "center",
                                border: "1px solid",
                                borderColor: selectedService?.id === service?.id ? "primary.main" : "divider",
                                borderRadius: 2,
                                bgcolor: selectedService?.id === service?.id ? "primary.light" : "background.default",
                                cursor: "pointer",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: selectedService?.id === service?.id ? "primary.dark" : "secondary.main",
                                    fontWeight: 700,
                                }}
                            >
                                {service?.name}
                            </Typography>
                        </Paper>
                    </Grid>
                ))
                ) : (
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ py: 2 }}>
                            <NoDataFound
                                message="No services found."
                            />
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}