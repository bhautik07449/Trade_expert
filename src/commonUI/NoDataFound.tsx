import { Box, Typography } from "@mui/material";
import FolderOffOutlinedIcon from '@mui/icons-material/FolderOffOutlined';

interface NoDataFoundProps {
    message?: string;
}

export default function NoDataFound({ message = "No Data Found" }: NoDataFoundProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 8,
                px: 2,
                width: "100%",
                minHeight: "200px",
                bgcolor: "background.paper",
                borderRadius: 2,
                border: "1px dashed",
                borderColor: "divider",
                color: "text.secondary",
            }}
        >
            <FolderOffOutlinedIcon sx={{ fontSize: 64, mb: 2, color: "text.disabled" }} />
            <Typography variant="h6" fontWeight={500}>
                {message}
            </Typography>
            <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                There is currently no data available to display.
            </Typography>
        </Box>
    );
}
