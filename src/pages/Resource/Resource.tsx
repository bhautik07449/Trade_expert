import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CMSservice from "../../service/cms.service";
import { Typography, Box, CircularProgress } from "@mui/material";

interface Props {
    content: string;
}

export default function Resource() {
    const { slug } = useParams();
    const [list, setList] = useState<Props | null>(null);
    const [loading, setLoading] = useState(false);

    const decodeHTML = (html: string) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    const getData = async (slug: string) => {
        try {
            setLoading(true);
            const res = await CMSservice.getPage(slug);

            if (res) {
                setList(res?.data?.data);
            }
        } catch (error) {
            toast.error("Page data not found");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (slug) {
            getData(slug);
        }
    }, [slug]);

    return (
        <Box sx={{ p: 3 }}>
            {loading ? (
                <CircularProgress />
            ) : list?.content ? (
                <Typography
                    component="div"
                    dangerouslySetInnerHTML={{
                        __html: decodeHTML(list.content),
                    }}
                />
            ) : (
                <Typography>No content found</Typography>
            )}
        </Box>
    );
}