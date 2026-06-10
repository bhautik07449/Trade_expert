// @ts-nocheck
import {
    Box,
    Grid,
    Paper,
    Typography,
    Divider,
    Tabs,
    Tab,
    CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CMSservice from "../../service/cms.service";
import NoDataFound from "../../commonUI/NoDataFound";

type ProjectSelectionProps = {
    activeCountry: string;
    selectedProject: any;
    setSelectedProject: (project: any) => void;
};

type Project = {
    id: string,
    title: string,
    description: string,
    image: string,
    specification: specifications[]
}

type specifications = {
    key: string,
    value: string
}

export default function ProjectSelection({ activeCountry, selectedProject, setSelectedProject }: ProjectSelectionProps) {
    const [projects, setProjects] = useState<Project[]>([])

    const [activeProject, setActiveProject] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const found = (Array.isArray(projects) ? projects : []).find((project) => String(project.id) === String(activeProject)) || null;
        setSelectedProject(found);
    }, [activeProject, projects, setSelectedProject]);


    const getProject = async (country?: string, category?: string) => {
        try {
            setLoading(true);
            const res = await CMSservice.getProject(country, category)
            if (res) {
                const fetchedProjects = res?.data?.data || [];
                setProjects(fetchedProjects)
                if (fetchedProjects.length > 0) {
                    setActiveProject(fetchedProjects[0].id)
                } else {
                    setActiveProject("")
                }
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.response?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProject(activeCountry)
    }, [activeCountry])

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
                Project Selection
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                    <CircularProgress />
                </Box>
            ) : projects.length === 0 ? (
                <NoDataFound message="Project does not exist for this location" />
            ) : (
                <>
                    <Box
                        sx={{
                            mb: 3,
                            borderBottom: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Tabs
                            value={activeProject}
                            onChange={(_, value) => setActiveProject(value)}
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                        >
                            {(Array.isArray(projects) ? projects : []).map((project) => (
                                <Tab
                                    key={project.id}
                                    value={project.id}
                                    label={project.title}
                                    sx={{
                                        fontWeight: 700,
                                        textTransform: "none",
                                        color: "secondary.main",
                                    }}
                                />
                            ))}
                        </Tabs>
                    </Box>

                    {selectedProject && (
                        <Paper
                            elevation={0}
                            sx={{
                                p: { xs: 2, md: 3 },
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: 3,
                                bgcolor: "background.paper",
                            }}
                        >
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            height: { xs: 220, md: 260 },
                                            borderRadius: 2,
                                            overflow: "hidden",
                                            border: "1px solid",
                                            borderColor: "divider",
                                            bgcolor: "background.default",
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={selectedProject.image}
                                            alt={selectedProject.title}
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                display: "block",
                                            }}
                                        />
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 12, md: 9 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: "secondary.main",
                                            fontWeight: 800,
                                            mb: 1,
                                        }}
                                    >
                                        {selectedProject.title}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "text.secondary",
                                            lineHeight: 1.8,
                                            mb: 2.5,
                                        }}
                                    >
                                        {selectedProject.description}
                                    </Typography>

                                    <Divider sx={{ mb: 2.5 }} />

                                    <Box
                                        sx={{
                                            border: "1px solid",
                                            borderColor: "divider",
                                            borderRadius: 2,
                                            overflow: "hidden",
                                        }}
                                    >
                                        {(Array.isArray(selectedProject?.specification) ? selectedProject?.specification : []).map((item, index) => (
                                            <Grid
                                                container
                                                key={index}
                                                sx={{
                                                    borderBottom:
                                                        index !== selectedProject.specification.length - 1
                                                            ? "1px solid"
                                                            : "none",
                                                    borderColor: "divider",
                                                }}
                                            >
                                                <Grid size={{ xs: 5, sm: 4 }}>
                                                    <Box
                                                        sx={{
                                                            height: "100%",
                                                            p: 1.5,
                                                            bgcolor: "background.default",
                                                            borderRight: "1px solid",
                                                            borderColor: "divider",
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                color: "secondary.main",
                                                                fontWeight: 700,
                                                                fontSize: 14,
                                                            }}
                                                        >
                                                            {item?.key}
                                                        </Typography>
                                                    </Box>
                                                </Grid>

                                                <Grid size={{ xs: 7, sm: 8 }}>
                                                    <Box sx={{ p: 1.5 }}>
                                                        <Typography
                                                            sx={{
                                                                color: "text.primary",
                                                                fontWeight: 500,
                                                                fontSize: 14,
                                                            }}
                                                        >
                                                            {item?.value}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    )}
                </>
            )}
        </Box>
    );
}