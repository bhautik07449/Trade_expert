import { Box } from "@mui/material"
import CardUi from "../commonUI/CardUi"

export default function ProductList() {
    return (
        <Box sx={{mb: 12}}>
            <CardUi
                title='All Season'
                label='Availability'
                onEnquire={(product) => {
                }}
                onRequestSample={(product) => {
                }}
            />

            <CardUi
                title='Current'
                label='Season'
                onEnquire={(product) => {
                }}
                onRequestSample={(product) => {
                }}
            />

            <CardUi
                title='Upcoming'
                label='Season'
                onEnquire={(product) => {
                }}
                onRequestSample={(product) => {
                }}
            />
        </Box>
    )
}