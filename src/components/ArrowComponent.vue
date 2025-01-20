<script setup>
import { ref, onMounted, watch } from 'vue';

// Define the angle prop that will be passed to the component
const props = defineProps({
  angle: {
    type: Number,
    required: true,
  },
});

// Reference to the canvas
const canvas = ref(null);

// Function to draw the arrow
const drawArrow = (angle) => {
  const ctx = canvas.value.getContext('2d');
  const canvasWidth = canvas.value.width;
  const canvasHeight = canvas.value.height;

  // Clear the canvas before redrawing
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Convert angle from degrees to radians
  const radians = (angle * Math.PI) / 180;

  // Arrow length
  const arrowLength = 80;

  // Arrow start point (center of the canvas)
  const startX = canvasWidth / 2;
  const startY = canvasHeight / 2;

  // Calculate the end point based on the angle
  const endX = startX + arrowLength * Math.cos(radians);
  const endY = startY + arrowLength * Math.sin(radians);

  // Draw the arrow line
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw the arrowhead
  const arrowheadSize = 10;
  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(endX - arrowheadSize * Math.cos(radians - Math.PI / 6), endY - arrowheadSize * Math.sin(radians - Math.PI / 6));
  ctx.moveTo(endX, endY);
  ctx.lineTo(endX - arrowheadSize * Math.cos(radians + Math.PI / 6), endY - arrowheadSize * Math.sin(radians + Math.PI / 6));
  ctx.stroke();
};

// Ensure the canvas is drawn after the component is mounted
onMounted(() => {
  drawArrow(props.angle);
});

</script>

<template>
  <div>
    <canvas ref="arrowCanvas" width="200" height="200"></canvas>
  </div>
</template>

<style scoped>
canvas {
  border: 1px solid #000;
}
</style>