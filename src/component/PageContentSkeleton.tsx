import { Box, Skeleton } from "@mui/material";

export default function PageContentSkeleton() {
    return (
        <Box sx={{ width: '100%' }}>
            <Skeleton animation="wave" height={30} sx={{ mb: 1 }} />
            <Skeleton animation="wave" height={30} sx={{ mb: 1 }} />
            <Skeleton animation="wave" height={30} sx={{ mb: 1 }} />
            <Skeleton animation="wave" height={30} sx={{ mb: 1 }} width="80%" />
        </Box>
    );
}
