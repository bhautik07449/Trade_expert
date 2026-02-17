import { useParams } from "react-router-dom";
import Gallery from "./Gallery";
import CSR from "./CSR";
import Career from "./Career";
import Faq from "./Faq";

export default function Resource() {
    const { slug } = useParams();

    return(
        <>
            {slug === "gallery" && <Gallery />}
            {slug === "csr" && <CSR />}
            {slug === "careers" && <Career />}
            {slug === "faq" && <Faq />}
        </>
    )
}