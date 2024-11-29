import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { API, TYPE_PQRSD_LABELS, STATUS_LABELS } from "../../../constants";

export const Dashboardview = () => {
  const [chartData, setChartData] = useState({
    statusChart: {
      series: [],
      options: {
        chart: { type: 'pie' },
        labels: [],
        title: { text: 'Estados de PQRSD' },
      },
    },
    typeChart: {
      series: [],
      options: {
        chart: { type: 'bar' },
        xaxis: { categories: [] },
        title: { text: 'Tipos de PQRSD' },
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API.private + 'pqrsd/',{headers: API.authHeaders});
        generateCharts(response.data);
      } catch (error) {
        console.error("Error al traer las PQRSD:", error);
      }
    };
    fetchData();
  }, []);

  const generateCharts = (data) => {
    const statusCounts = data.reduce((acc, item) => {
      const status = STATUS_LABELS[item.status]
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const statusChartData = {
      series: Object.values(statusCounts),
      options: {
        chart: { type: 'pie' },
        labels: Object.keys(statusCounts),
        title: { text: 'Estados de PQRSD' },
      },
    };

    const typeCounts = data.reduce((acc, item) => {
      const type = TYPE_PQRSD_LABELS[item.type_pqrsd] || 'Desconocido';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const typeChartData = {
      series: [{
        name: 'Cantidad',
        data: Object.values(typeCounts)
      }],
      options: {
        chart: { type: 'bar' },
        xaxis: { 
          categories: Object.keys(typeCounts),
          title: { text: 'Tipos de PQRSD' }
        },
        yaxis: {
          title: { text: 'Cantidad' }
        },
      },
    };

    setChartData({ statusChart: statusChartData, typeChart: typeChartData });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Dashboard</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        <div style={{ width: "45%" }}>
          <Chart
            options={chartData.statusChart.options}
            series={chartData.statusChart.series}
            type="pie"
            height={350}
          />
        </div>
        <div style={{ width: "45%" }}>
          <Chart
            options={chartData.typeChart.options}
            series={chartData.typeChart.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboardview;
