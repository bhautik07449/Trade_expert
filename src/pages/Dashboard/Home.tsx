import {
    Box
} from '@mui/material';
import InteractiveWorldMap from '../../component/Home/InteractiveWorldMap';
import Analytical from '../../component/Home/Analytical';
import Events from '../../component/Home/Events';
import OurProcess from '../../component/OurProcess';
import Values from '../../component/Values';
import AboutTestimonial from '../About/AboutTestimonial';
import OverPresences from '../../component/Home/OverPresences';

export default function Home() {

    return (
        <Box>
            <InteractiveWorldMap />
            <Analytical />
            <Events />
            <OverPresences />
            <OurProcess />
            <Values />
            <AboutTestimonial />
        </Box>
    );
}