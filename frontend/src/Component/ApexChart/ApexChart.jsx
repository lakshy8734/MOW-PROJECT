import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    const filteredData = ApexChart.filterUserActivity(props.userActivity);

    this.state = {
      series: [
        {
          name: 'User Logins',
          data: filteredData || []
        }
      ],
      options: {
        chart: {
          type: 'area',
          height: 350,
          stacked: true,
          events: {
            selection: function (chart, e) {
              console.log(new Date(e.xaxis.min));
            }
          }
        },
        colors: ['#008FFB'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.6,
            opacityTo: 0.8,
            stops: [0, 90, 100]
          }
        },
        tooltip: {
          enabled: true,
          shared: true,
          intersect: false,
          x: {
            format: 'dd MMM yyyy'
          }
        },
        xaxis: {
          type: 'datetime',
          max: new Date().getTime() // Set the max value to the current date
        },
        yaxis: {
          opposite: false
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        }
      }
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const filteredData = ApexChart.filterUserActivity(nextProps.userActivity);
    if (filteredData !== prevState.series[0].data) {
      return {
        series: [
          {
            name: 'User Logins',
            data: filteredData
          }
        ]
      };
    }
    return null;
  }

  static filterUserActivity(userActivity) {
    const now = new Date().getTime();
    return userActivity.filter(activity => activity.x <= now);
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={350} />
      </div>
    );
  }
}

export default ApexChart;
