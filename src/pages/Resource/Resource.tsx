import { useParams } from "react-router-dom";
import PageMainLayout from "../../commonUI/PageMainLayout";

export default function Resource() {
    const { slug } = useParams<{ slug: string }>();

    return (
        <PageMainLayout 
            slug={slug || ""} 
            image="https://sourceseas.itcoders.in/img/front-end/faq.jpg" 
            activeCountry="" 
            setActiveCountry={() => {}} 
        />
    );
}