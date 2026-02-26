import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    List,
    ListItemText,
    ListItemButton,
} from "@mui/material";
import { useState } from "react";

export default function GetInTouch() {
    const [activeTab, setActiveTab] = useState("fill-form");
    console.log("activeTab", activeTab);

    return (
        <Box sx={{ bgcolor: "#f4f4f4", minHeight: "100vh", pb: 10 }}>
            <img
                src="https://sourceseas.itcoders.in/img/front-end/quality.jpg"
                alt="Quality Policies"
                style={{ width: "100%", minHeight: '200px', maxHeight: '400px', objectFit: "cover" }}
            />

            <Box sx={{ p: 3, textAlign: "center" }}>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, color: "#7cb342" }}
                >
                    Contact to Sourceseas
                </Typography>
            </Box>

            <Box sx={{ maxWidth: "1100px", mx: "auto", px: 3 }}>
                <Typography sx={{ mb: 2, textAlign: "center" }}>
                    Getting in touch with us to solve your query. If you have a
                    question, doubt, or want to share something, choose any of
                    the ways below to connect with us.
                </Typography>

                <ul>
                    <li>Directly dial us.</li>
                    <li>We are available 24/7 for live chat.</li>
                    <li>
                        Write to us at our mailing address or fill out the
                        inquiry form for a prompt reply.
                    </li>
                </ul>

                <Typography sx={{ mt: 2, textAlign: "center" }}>
                    We are just a single click away — whichever method you
                    choose to connect with us!
                </Typography>
            </Box>

            <Box
                sx={{
                    maxWidth: "1100px",
                    mx: "auto",
                    mt: 6,
                    px: 3,
                }}
            >
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                bgcolor: "#e9dfd6",
                            }}
                        >
                            <List>
                                {["Fill form", "By Call", "Chat With Us", "Email Us"].map(
                                    (text, index) => (
                                        <ListItemButton onClick={() => setActiveTab(text.toLowerCase().replace(" ", "-"))} key={index}
                                            selected={activeTab === text.toLowerCase().replace(" ", "-")}
                                            sx={{
                                                borderRadius: 2,
                                                mb: 1,
                                                "&.Mui-selected": {
                                                    bgcolor: "#7cb342",
                                                    color: "#fff",
                                                },
                                                "&.Mui-selected:hover": {
                                                    bgcolor: "#689f38",
                                                },
                                            }}
                                        >
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    ))
                                }
                            </List>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, md: 9 }}>
                        {activeTab === "fill-form" && (
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    bgcolor: "#e9dfd6",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        mb: 3,
                                        fontWeight: 600,
                                    }}
                                >
                                    <span style={{ color: "#7cb342" }}>
                                        Write
                                    </span>{" "}
                                    to Us
                                </Typography>

                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="First Name"
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Last Name"
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            type="email"
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Phone"
                                            type="tel"
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <TextField
                                            fullWidth
                                            label="Message"
                                            multiline
                                            rows={5}
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                bgcolor: "#7cb342",
                                                px: 4,
                                                "&:hover": {
                                                    bgcolor: "#689f38",
                                                },
                                            }}
                                        >
                                            Send
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        )}

                        {activeTab === "by-call" && (
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    bgcolor: "#e9dfd6",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        mb: 3,
                                        fontWeight: 600,
                                    }}
                                >
                                    <span style={{ color: "#7cb342" }}>
                                        Call
                                    </span>{" "}
                                    Us
                                </Typography>

                                <Typography variant="body1">
                                    Need Assitance in Buying or need clarification on products.
                                </Typography>

                                <Typography variant="body1">
                                    call or whatsapp us at (+91) 9925099215
                                </Typography>
                            </Paper>
                        )}

                        {activeTab === "chat-with us" && (
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    bgcolor: "#e9dfd6",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        mb: 3,
                                        fontWeight: 600,
                                    }}
                                >
                                    <span style={{ color: "#7cb342" }}>
                                        Chat
                                    </span>{" "}
                                    With Us
                                </Typography>

                                <Typography variant="body1">
                                    You can online chat with us for the frequently get the quote.
                                </Typography>

                                <Typography variant="body1">
                                    For that please click on the bottom right corner <b>"Leave Message"</b> box.
                                </Typography>
                            </Paper>
                        )}

                        {activeTab === "email-us" && (
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    bgcolor: "#e9dfd6",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        mb: 3,
                                        fontWeight: 600,
                                    }}
                                >
                                    <span style={{ color: "#7cb342" }}>
                                        Email
                                    </span>{" "}
                                    Us
                                </Typography>

                                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                    Sourceseas overseas Pvt. Ltd.
                                </Typography>

                                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                    Registered Office
                                </Typography>

                                <Typography variant="body1">
                                    C-604, Shree Nidhi Residency <br />Nr. Sudamachowk, <br /> Satelite Road, <br />Mota Varachha, Surat(Guj), <br />India - 3940101 <br /> +91 9925099215
                                </Typography>

                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}