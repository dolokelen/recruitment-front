import { Box, Container } from "@chakra-ui/react";
import { defaults } from "chart.js/auto";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import "chart.js/auto";

//for responsiveness: width and heigh will be auto 
// defaults.maintainAspectRatio = false;
// defaults.responsive = true;

//For the charts titles globally
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.font.size = 20;
defaults.plugins.title.color = "black";

const MyChart = () => {
  return (
    <Container>
      <Box boxShadow="dark-lg" p="6" rounded="md" mt={16}>
        <Bar
          data={{
            labels: ["January", "February", "March"],
            datasets: [
              {
                label: "Revenue",
                data: [200, 300, 400],
                backgroundColor: "green",
                borderRadius: 25,
              },
              {
                label: "Lost",
                data: [180, 90, 100],
                backgroundColor: "red",
                borderRadius: 25,
              },
              {
                label: "Profit",
                data: [20, 210, 300],
                backgroundColor: "darkblue",
                borderRadius: 25,
              },
            ],
          }}
          options={{
            plugins: {
              title: { text: "Bar Revenue Sources" },
            },
          }}
        />
      </Box>

      <Box boxShadow="dark-lg" p="6" rounded="md" mt={16}>
        <Doughnut
          data={{
            labels: ["January", "May", "June", "April", "June"],
            datasets: [
              {
                label: "Revenue",
                data: [200, 300, 900, 3000, 1500],
                backgroundColor: ["purple", "blue", "red", "green", "gold"],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Doughnut Revenue Sources",
                font: { size: 20, family: "Serif" },
              },
              legend: { labels: { font: { size: 16, family: "Serif" } } },
            },
          }}
        />
      </Box>

      <Box boxShadow="dark-lg" p="6" rounded="md" mt={16}>
        <Pie
          data={{
            labels: ["January", "May", "June", "April", "June"],
            datasets: [
              {
                label: "Revenue",
                data: [200, 300, 900, 3000, 1500],
                backgroundColor: ["purple", "blue", "red", "green", "gold"],
              },
            ],
          }}
          options={{
            plugins: {
              title: { text: "Doughnut Revenue Sources" },
            },
          }}
        />
      </Box>

      <Box boxShadow="dark-lg" p="6" rounded="md" mt={16}>
        <Line
          data={{
            labels: ["January", "February", "March", "April", "May"],
            datasets: [
              {
                label: "Revenue",
                data: [400, 100, 400, 50, 1000],
                backgroundColor: "green",
                borderColor: "green",
              },
            ],
          }}
          options={{
            plugins: {
              title: { text: "Line Revenue Sources" },
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default MyChart;
