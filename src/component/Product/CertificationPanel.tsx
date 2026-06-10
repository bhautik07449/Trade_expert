import * as React from "react";
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  useTheme,
  useMediaQuery,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { getImageUrl } from "../../utils/imageUtils";
import NoDataFound from "../../commonUI/NoDataFound";

export default function CertificationPanel({ product }: any) {
  const [tab, setTab] = React.useState(0);

  const specs = product?.specs || {};
  const keys = Object.keys(specs);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const seasonalIsImage = (val: any) => {
    if (!val) return false;

    if (typeof val === "string") {
      return (
        val.startsWith("http") ||
        /\.(jpeg|jpg|gif|png|webp)$/i.test(val)
      );
    }

    return false;
  };

  const renderValue = (value: any) => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }

    if (typeof value === "string" || typeof value === "number") {
      return value;
    }

    if (Array.isArray(value)) {
      return value.join(", ");
    }

    if (typeof value === "object") {
      return value?.name || JSON.stringify(value);
    }

    return String(value);
  };

  const activeSpecKey = tab >= 2 ? keys[tab - 2] : "";
  const activeSpecRows = activeSpecKey ? specs[activeSpecKey] || [] : [];

  return (
    <Paper
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        minHeight: 200,
        width: "100%",
        overflowX: "auto",
      }}
    >
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        orientation={isMobile ? "horizontal" : "vertical"}
        variant="scrollable"
        textColor="primary"
        indicatorColor="primary"
        sx={{
          minWidth: isMobile ? "100%" : 180,
          bgcolor: "primary.light",
          "& .MuiTab-root": {
            alignItems: "flex-start",
            color: "primary.dark",
            fontWeight: 700,
            textTransform: "none",
          },
        }}
      >
        <Tab label="Product Certification" />
        <Tab label="Seasonal Chart" />

        {(Array.isArray(keys) ? keys : []).map((key) => (
          <Tab
            key={key}
            label={key}
            id={`spec-tab-${key}`}
            aria-controls={`spec-panel-${key}`}
          />
        ))}
      </Tabs>

      <Box sx={{ p: { xs: 2, md: 3 }, flex: 1, width: "100%" }}>
        {tab === 0 && (
          <Box display="flex" justifyContent="center">
            {product?.certification ? (
              <Box
                component="img"
                src={getImageUrl(product?.certification)}
                alt="Certification logo"
                sx={{
                  width: { xs: 160, sm: 260, md: 360 },
                  height: { xs: 120, sm: 220, md: 360 },
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Box sx={{ py: 4 }}>
                <NoDataFound message="No certification available." />
              </Box>
            )}
          </Box>
        )}

        {tab === 1 && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {seasonalIsImage(product?.seasonalChart) ? (
              <Box
                component="img"
                src={getImageUrl(product?.seasonalChart)}
                alt="Seasonal Chart"
                sx={{
                  width: { xs: "100%", sm: 500 },
                  height: { xs: 200, sm: "auto" },
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Box sx={{ py: 4 }}>
                <NoDataFound message={product?.seasonalChart || "No seasonal chart available."} />
              </Box>
            )}
          </Box>
        )}

        {tab >= 2 && (
          <Box sx={{ width: "100%" }}>
            {activeSpecRows.length > 0 ? (
              <Table
                sx={{
                  width: "100%",
                  minWidth: { xs: 220, md: "100%" },
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  overflow: "hidden",
                  borderCollapse: "separate",
                  borderSpacing: 0,
                }}
              >
                <TableBody>
                  {(Array.isArray(activeSpecRows) ? activeSpecRows : []).map((row: any, idx: number) => (
                    <TableRow
                      key={idx}
                      sx={{
                        "&:nth-of-type(odd)": {
                          bgcolor: "background.default",
                        },
                        "&:hover": {
                          bgcolor: "primary.light",
                        },
                        "&:last-child td, &:last-child th": {
                          borderBottom: 0,
                        },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          width: { xs: "45%", md: "35%" },
                          fontWeight: 700,
                          color: "secondary.main",
                          bgcolor: "background.paper",
                          borderRight: "1px solid",
                          borderColor: "divider",
                          py: 1.8,
                          px: { xs: 2, md: 3 },
                          whiteSpace: "nowrap",
                        }}
                      >
                        {renderValue(row?.label)}
                      </TableCell>

                      <TableCell
                        sx={{
                          width: { xs: "55%", md: "65%" },
                          color: "text.secondary",
                          py: 1.8,
                          px: { xs: 2, md: 3 },
                          wordBreak: "break-word",
                        }}
                      >
                        {renderValue(row?.value)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  border: "1px dashed",
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 3,
                  textAlign: "center",
                }}
              >
                <NoDataFound message="No specification available." />
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
}