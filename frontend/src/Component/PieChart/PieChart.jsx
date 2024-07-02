import React from 'react';
import ReactApexChart from 'react-apexcharts';

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      donutChart: {
        series: props.series, // Example data: 70 active users, 30 non-active users
        options: {
          chart: {
            width: 380,
            type: 'donut',
            dropShadow: {
              enabled: true,
              color: '#111',
              top: -1,
              left: 3,
              blur: 3,
              opacity: 0.2
            }
          },
          stroke: {
            width: 0,
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  total: {
                    showAlways: true,
                    show: true
                  }
                }
              }
            }
          },
          labels: props.labels,
          dataLabels: {
            dropShadow: {
              blur: 3,
              opacity: 0.8
            }
          },
          fill: {
            type: 'pattern',
            opacity: 1,
            pattern: {
              enabled: true,
              style: ['verticalLines', 'squares', 'horizontalLines', 'circles','slantedLines'],
            },
          },
          states: {
            hover: {
              filter: 'none'
            }
          },
          theme: {
            palette: 'palette2'
          },
          title: {
            text: props.title
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      }
    };
  }

  render() {
    return (
      <div>
        <div id="donut-chart">
          <ReactApexChart options={this.state.donutChart.options} series={this.state.donutChart.series} type="donut" width={380} />
        </div>
      </div>
    );
  }
}

export default PieChart;
