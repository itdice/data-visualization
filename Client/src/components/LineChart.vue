<script setup>
import { Line } from "vue-chartjs";
import { ref } from "vue";

import { useChartStore } from "@/stores/chart.js";
const chartStore = useChartStore();

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const chartOptions = ref({
  responsive: true,
});
</script>

<template>
  <Line id="my-chart-id" :options="chartOptions" :data="chartStore.chartData" />
</template>

<style scoped>

</style>