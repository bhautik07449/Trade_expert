import { Box, Grid, Paper, Skeleton, Typography } from "@mui/material";
import HomePageservice from "../../service/homepages.service";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import NoDataFound from "../../commonUI/NoDataFound";

export default function FinancialService({ activeCountry, selectedService, setSelectedService }: any) {
    const [services, setServices] = useState<any[]>([]);
    const [serviceLoading, setServiceLoading] = useState<boolean>(false);

    const getServiceData = useCallback(async () => {
        try {
            setServiceLoading(true);
            setServices([]);

            const res = await HomePageservice.getServices();

            const serviceList = Array.isArray(res?.data?.data)
                ? res?.data?.data
                : [];

            setServices(serviceList);
            if (serviceList.length > 0) {
                setSelectedService(serviceList[0]);
            } else {
                setSelectedService(null);
            }
        } catch (error: any) {
            setServices([]);
            setSelectedService(null);

            toast.error(
                error?.response?.data?.message ||
                error?.response?.message ||
                "Something went wrong"
            );
        } finally {
            setServiceLoading(false);
        }
    }, [setSelectedService]);

    useEffect(() => {
        if (activeCountry) {
            getServiceData();
        } else {
            setServices([]);
        }
    }, [activeCountry, getServiceData, setSelectedService]);

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
                {serviceLoading ? (
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
                ) : services.length > 0 ? ((Array.isArray(services) ? services : []).map((service, index) => (
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
                                message={
                                    activeCountry
                                        ? "No services found."
                                        : "Please select a country to view services."
                                }
                            />
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}