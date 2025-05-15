import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
} from 'chart.js'
import { Pie, Line } from 'react-chartjs-2'
import { faker } from "@faker-js/faker"

import { useSelector } from 'react-redux'

import { useState, useEffect } from 'react'
import { getStats } from '../store/actions/toy.actions'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale, ArcElement, Tooltip, Legend)

export function Dashboard() {
  //TODO - bring relevant stats for graph
  const toyData = useSelector(storeState => storeState.toyModule.toyStats)

  useEffect(() => {
    getStats()
  }, [])

  //TODO bring Data
  const priceChartData =
    toyData && toyData.avgPricePerLabel
      ? {
          labels: Object.keys(toyData.avgPricePerLabel),
          datasets: [
            {
              label: 'Avg Price per Label',
              data: Object.values(toyData.avgPricePerLabel),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        }
      : null

  const lineChartData =
    toyData && toyData.lineChartData
      ? {
          labels: toyData.lineChartData.map(entry => entry.date),
          datasets: [
            {
              label: 'Sales Over Time',
              data: toyData.lineChartData.map(entry => entry.value),
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              tension: 0.3, // smooth curves
              fill: true,
            },
          ],
        }
      : null

  const inventoryChartData =
    toyData && toyData.avgPricePerLabel
      ? {
          labels: Object.keys(toyData.inStockPercentByLabel),
          datasets: [
            {
              label: 'Avg Price per Label',
              data: Object.values(toyData.inStockPercentByLabel),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        }
      : null

  if (!toyData || !Object.keys(toyData).length) return <div>Loading stats...</div>
  return (
    //TODO Display graph with data
    <section className="charts-section">
      <section className="pie-chart">
        <h1>Avg Price per Label</h1>
        <Pie data={priceChartData} />
      </section>
      <section className="pie-chart">
        <h1>In Stock % per Label</h1>
        <Pie data={inventoryChartData} />
      </section>
      <section className="line-chart">
        <h1>Sales Over Time</h1>
        <Line data={lineChartData} />
      </section>
    </section>
  )
}
