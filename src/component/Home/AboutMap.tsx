import React, { useState, useEffect, useRef } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Annotation } from 'react-simple-maps';
import { Box, Paper, useTheme, IconButton, Typography, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus';
import { geoCentroid } from 'd3-geo';
import LabelTitle from '../../commonUI/labelTitle';
import CMSservice from '../../service/cms.service';
import { toast } from 'react-toastify';
import HomePageservice from '../../service/homepages.service';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const LARGE_COUNTRIES = new Set([
    'Russia', 'Canada', 'United States of America', 'China', 'Brazil',
    'Australia', 'India', 'Argentina', 'Kazakhstan', 'Algeria',
    'Saudi Arabia', 'Mexico', 'Indonesia', 'Sudan', 'Libya',
    'Iran', 'Mongolia', 'Peru', 'Chad', 'Niger',
    'Angola', 'Mali', 'South Africa', 'Colombia', 'Ethiopia',
    'Bolivia', 'Mauritania', 'Egypt', 'Tanzania', 'Nigeria',
    'Venezuela', 'Mozambique', 'Turkey', 'Pakistan', 'Zambia',
    'Myanmar', 'Afghanistan', 'France', 'Ukraine', 'Madagascar',
    'Germany', 'Sweden', 'Norway', 'Finland', 'Poland',
    'Spain', 'Thailand', 'Japan', 'Iraq', 'Morocco',
    'Cameroon', 'Papua New Guinea', 'Zimbabwe',
]);

const DISPLAY_NAMES: Record<string, string> = {
    'United States of America': 'USA',
    'Russian Federation': 'Russia',
    'Democratic Republic of the Congo': 'DR Congo',
    'Central African Republic': 'CAR',
    'Papua New Guinea': 'PNG',
    'United Arab Emirates': 'UAE',
    'United Kingdom': 'UK',
};

export default function AboutMap() {
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const baseZoom = isMobile ? 1.3 : isTablet ? 1.8 : 2.0;

    const [presences, setPresences] = useState<any[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('India');
    const [tooltipContent, setTooltipContent] = useState<string>('');
    const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [showTooltip, setShowTooltip] = useState(false);
    const [position, setPosition] = useState({ coordinates: [0, 0] as [number, number], zoom: 1 });
    const mapWrapperRef = useRef<HTMLDivElement>(null);
    const [delivery, setDelivery] = useState<any[]>([])

    useEffect(() => {
        setPosition(prev => ({ ...prev, zoom: baseZoom }));
    }, [baseZoom]);

    const getPresencesData = async () => {
        try {
            const response = await HomePageservice.getPresences();

            if (response) {
                setPresences(response?.data?.countries || []);
            }
        } catch (error: any) {
            console.log(error?.response?.data?.message || "Presences data not fetch");
        }
    };

    useEffect(() => {
        getPresencesData();
    }, []);

    useEffect(() => {
        const el = mapWrapperRef.current;
        if (!el) return;

        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        };

        el.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            el.removeEventListener('wheel', handleWheel);
        };
    }, []);

    const handleZoomIn = () => {
        if (position.zoom >= 8) return;
        setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
    };

    const handleZoomOut = () => {
        if (position.zoom <= baseZoom) return;
        setPosition((pos) => ({ ...pos, zoom: Math.max(baseZoom, pos.zoom / 1.5) }));
    };

    const handleReset = () => {
        setPosition({ coordinates: [0, 0], zoom: baseZoom });
    };

    const handleMoveEnd = (position: { coordinates: [number, number], zoom: number }) => {
        setPosition(position);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!mapWrapperRef.current) return;
        const rect = mapWrapperRef.current.getBoundingClientRect();
        setTooltipPos({ x: e.clientX - rect.left + 12, y: e.clientY - rect.top - 36 });
    };

    const labelFontSize = Math.max(2.5, Math.min(5, 4 / position.zoom));
    const isDark = theme.palette.mode === 'dark';

    const getDeveliryData = async (country: string) => {
        try {
            const res = await CMSservice.getDeliveryReach(country)

            if (res) {
                setDelivery(res?.data?.data)
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        if (selectedCountry) {
            getDeveliryData(selectedCountry)
        }
    }, [selectedCountry])

    const normalizeCountryName = (name: string = "") =>
        name.trim().toLowerCase();

    const presenceCountries =(Array.isArray(presences) ? presences : []).map((item: any) =>
        normalizeCountryName(item?.country || item?.name || item)
    );

    const isPresenceCountry = (countryName: string) =>
        presenceCountries.includes(normalizeCountryName(countryName));

    const isSelectedCountry = (countryName: string) =>
        normalizeCountryName(selectedCountry || "") === normalizeCountryName(countryName);

    return (
        <Box component="section" sx={{ width: '100%', mb: { xs: 3, md: 5 }, py: { xs: 5, md: 8 }, }}>
            <LabelTitle title='Our Presence &' label='Delivery Reach' />

            <Paper
                elevation={4}
                sx={{
                    bgcolor: "transparent",
                    background: "transparent",
                    boxShadow: "none",
                    border: "none",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <Box sx={{
                    position: 'absolute',
                    bottom: { xs: 16, sm: 24 },
                    right: { xs: 16, sm: 24 },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    zIndex: 10,
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                    p: 1,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                    <IconButton onClick={handleZoomIn} size="small" color="primary">
                        <AddIcon />
                    </IconButton>
                    <IconButton onClick={handleZoomOut} size="small" color="primary">
                        <RemoveIcon />
                    </IconButton>
                    <IconButton onClick={handleReset} size="small" color="primary">
                        <FilterCenterFocusIcon />
                    </IconButton>
                </Box>

                <Box
                    ref={mapWrapperRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setShowTooltip(false)}
                    sx={{
                        width: '100%',
                        height: { xs: '300px', sm: '350px', md: '500px', lg: '600px' },
                        position: 'relative',
                        touchAction: 'none'
                    }}>

                    {showTooltip && tooltipContent && (
                        <Box
                            sx={{
                                position: 'absolute',
                                left: tooltipPos.x,
                                top: tooltipPos.y,
                                pointerEvents: 'none',
                                zIndex: 20,
                                backgroundColor: isDark ? 'rgba(15,23,42,0.92)' : 'rgba(255,255,255,0.95)',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid',
                                borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                                borderRadius: '8px',
                                px: 1.5,
                                py: 0.75,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <Typography
                                variant="caption"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '0.78rem',
                                    color: isDark ? '#e2e8f0' : '#1e293b',
                                    letterSpacing: 0.3,
                                }}
                            >
                                {tooltipContent}
                            </Typography>
                        </Box>
                    )}

                    <ComposableMap
                        projectionConfig={{ scale: 140 }}
                        style={{ width: "100%", height: "100%" }}
                    >
                        <ZoomableGroup
                            zoom={position.zoom}
                            center={position.coordinates}
                            onMoveEnd={handleMoveEnd}
                            minZoom={baseZoom}
                            maxZoom={8}
                        >
                            <Geographies geography={geoUrl}>
                                {({ geographies }) => (
                                    <>
                                        {(Array.isArray(geographies) ? geographies : []).map((geo) => {
                                            return (
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    onClick={() => {
                                                        const countryName = geo.properties.name;

                                                        setSelectedCountry(countryName)
                                                    }}
                                                    onMouseEnter={() => {
                                                        setTooltipContent(geo.properties.name);
                                                        setShowTooltip(true);
                                                    }}
                                                    onMouseLeave={() => {
                                                        setShowTooltip(false);
                                                    }}
                                                    style={{
                                                        default: {
                                                            fill: isSelectedCountry(geo.properties.name)
                                                                ? theme.palette.secondary.dark
                                                                : isPresenceCountry(geo.properties.name)
                                                                    ? theme.palette.primary.main
                                                                    : isDark
                                                                        ? "#374151"
                                                                        : theme.palette.primary.light,
                                                            outline: "none",
                                                            stroke: isDark ? "rgba(255,255,255,0.05)" : "#FFFFFF",
                                                            strokeWidth: 0.5,
                                                            transition: "all 250ms",
                                                        },
                                                        hover: {
                                                            fill:
                                                                selectedCountry === geo.properties.name
                                                                    ? theme.palette.primary.main
                                                                    : theme.palette.primary.dark,
                                                            outline: "none",
                                                            cursor: "pointer",
                                                            transition: "all 250ms",
                                                        },
                                                        pressed: {
                                                            fill: theme.palette.secondary.dark,
                                                            outline: "none",
                                                        },
                                                    }}
                                                />
                                            );
                                        })}

                                        {!isMobile && geographies
                                            .filter(geo => LARGE_COUNTRIES.has(geo.properties.name))
                                            .map((geo) => {
                                                const centroid = geoCentroid(geo);
                                                const name = geo.properties.name as string;
                                                const displayName = DISPLAY_NAMES[name] || name;

                                                return (
                                                    <Annotation
                                                        key={`label-${geo.rsmKey}`}
                                                        subject={centroid as [number, number]}
                                                        dx={0}
                                                        dy={0}
                                                        connectorProps={{}}
                                                    >
                                                        <text
                                                            textAnchor="middle"
                                                            dominantBaseline="middle"
                                                            style={{
                                                                fontFamily: 'Inter, sans-serif',
                                                                fontSize: `${labelFontSize}px`,
                                                                fill: isDark ? 'rgba(255,255,255,0.65)' : 'rgba(30,41,59,0.75)',
                                                                fontWeight: 600,
                                                                pointerEvents: 'none',
                                                                userSelect: 'none',
                                                                letterSpacing: '0.2px',
                                                                paintOrder: 'stroke',
                                                                stroke: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)',
                                                                strokeWidth: `${labelFontSize * 0.5}px`,
                                                                strokeLinejoin: 'round',
                                                            }}
                                                        >
                                                            {displayName}
                                                        </text>
                                                    </Annotation>
                                                );
                                            })
                                        }
                                    </>
                                )}
                            </Geographies>
                        </ZoomableGroup>
                    </ComposableMap>
                </Box>
            </Paper>

            <Box sx={{ textAlign: "center", mt: 3 }}>
                {(Array.isArray(delivery) ? delivery : []).map((list, index) => (
                    <Box key={index}>
                        <Typography
                            component="h2"
                            variant="h3"
                            sx={{
                                color: "text.primary",
                                fontWeight: 800,
                                fontSize: {
                                    xs: "22px",
                                    sm: "26px",
                                    md: "32px",
                                    lg: "36px",
                                },
                            }}
                        >
                            {list?.country}
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                textAlign: "center",
                                color: "text.secondary",
                                maxWidth: "680px",
                                mx: "auto",
                                mb: { xs: 4, md: 6 },
                                mt: { xs: 1, md: 1.5 },
                                fontSize: { xs: "0.88rem", sm: "1rem" },
                                lineHeight: 1.5,
                            }}
                        >
                            {list?.description}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box >
    );
}