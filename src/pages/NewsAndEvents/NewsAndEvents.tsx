import {
    Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageMainLayout from "../../commonUI/PageMainLayout";
import EventDetailView from "./EventDetailView";
import HomePageservice from "../../service/homepages.service";

export default function NewsAndEvents() {
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('eventId');
    const [event, setEvent] = useState<any>(null);

    const getEventData = async (id: string) => {
        try {
            const res = await HomePageservice.getEventsByid(id);

            if (res) {
                setEvent(res?.data?.data || []);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
            setEvent([]);
        }
    };

    useEffect(() => {
        if (eventId) {
            getEventData(eventId);
        }
    }, [eventId]);

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
            }}
        >
            <PageMainLayout image="https://sourceseas.itcoders.in/img/front-end/csr-2.jpg" title="News & Events" slug="news_and_events" activeCountry="" setActiveCountry={() => { }} />

            <EventDetailView
                eventData={event}
            />
        </Box>
    );
}