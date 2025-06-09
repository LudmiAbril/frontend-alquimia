"use client";

import { Box, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { StatCircleCardProps } from "../Utils/typing";

export default function StatCircleCard({ icon, value, label }: StatCircleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: "50%",
          width: 180,
          height: 180,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          border: "4px solid #eaeaea",
          textAlign: "center",
        }}
      >
        <Box sx={{ mb: 2 }}>{icon}</Box>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Paper>
    </motion.div>
  );
}
