import React, { useState, useEffect, useRef } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Annotation } from 'react-simple-maps';
import { Box, Paper, useTheme, IconButton, Typography, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus';
import { useNavigate } from 'react-router-dom';
import { geoCentroid } from 'd3-geo';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setSelectedCountry } from '../../store/slice/countrySlice';
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

export default function InteractiveWorldMap() {
    const [presences, setPresences] = useState<any[]>([]);

    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const selectedCountry = useSelector(
        (state: RootState) => state.country.selectedCountry
    );

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const baseZoom = isMobile ? 1.3 : isTablet ? 1.8 : 2.0;

    // const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [tooltipContent, setTooltipContent] = useState<string>('');
    const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [showTooltip, setShowTooltip] = useState(false);
    const [position, setPosition] = useState({ coordinates: [0, 0] as [number, number], zoom: 1 });
    const mapWrapperRef = useRef<HTMLDivElement>(null);

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
        setPosition(prev => ({ ...prev, zoom: baseZoom }));
    }, [baseZoom]);

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

    const normalizeCountryName = (name: string = "") =>
        name.trim().toLowerCase();

    const presenceCountries = presences.map((item: any) =>
        normalizeCountryName(item?.country || item?.name || item)
    );

    const isPresenceCountry = (countryName: string) =>
        presenceCountries.includes(normalizeCountryName(countryName));

    const isSelectedCountry = (countryName: string) =>
        normalizeCountryName(selectedCountry || "") === normalizeCountryName(countryName);

    return (
        <Box component="section" sx={{ width: '100%', mb: { xs: 3, md: 5 } }}>
            <Paper
                elevation={4}
                sx={{
                    backdropFilter: 'blur(12px)',
                    border: '1px solid',
                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                    overflow: 'hidden',
                    position: 'relative'
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
                    backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)',
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
                                        {geographies.map((geo) => {
                                            return (
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    onClick={() => {
                                                        const countryName = geo.properties.name;

                                                        dispatch(setSelectedCountry(countryName));
                                                        navigate(`/country/${countryName}`);
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
        </Box>
    );
}