import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Typography } from "@mui/material";

const FeatureDemo = () => {
const features = [
     {
          id: 1,
          title: "Timeline View",
          description: "Monitor your learning journey with a chronological timeline",
          image: `${process.env.PUBLIC_URL}/feature-timeline-view.png`,
     },
     {
          id: 2,
          title: "Rich Text Editor",
          description:
               "Create detailed and beautifully formatted learning notes with ease",
          image: `${process.env.PUBLIC_URL}/feature-rich-text-editor.png`,
     },
     {
          id: 3,
          title: "Search Tool",
          description:
               "Find your notes quickly using advanced search functionality",
          image: `${process.env.PUBLIC_URL}/feature-search-tool.png`,
     },
     {
          id: 4,
          title: "Organize with Categories and Labels",
          description:
               "Manage your learning materials efficiently with categories and labels",
          image: `${process.env.PUBLIC_URL}/feature-categories-and-labels.png`,
     },
     {
          id: 5,
          title: "Take Quiz",
          description:
               "Challenge yourself with AI-generated quizzes based on your learning materials",
          image: `${process.env.PUBLIC_URL}/feature-quiz.png`,
     },
];

  return (
    <Carousel>
      {features.map((feature) => (
        <Carousel.Item key={feature.id}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "primary.main" }}
              >
                {feature.description}
              </Typography>
            </div>
            <Box
              component="img"
              src={feature.image}
              alt="main-timeline-image"
              loading="lazy"
              sx={{
                width: "800px",
                height: "auto",
              }}
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default FeatureDemo;
