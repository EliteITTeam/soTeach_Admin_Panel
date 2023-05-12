import React from "react";
import { Navbar } from "../../components/common";
import Grid from "@mui/material/Grid";
import styles from "./Dashboard.module.scss";
import { Doughnut, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  green1,
  green2,
  green3,
  green4,
  green5,
  progress1,
  progress2,
  progress3,
  progress4,
  progress5,
} from "./../../assests";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

export const options1 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};
export const data = {
  labels: ["Geography", "Science", "Urdu", "English"],
  datasets: [
    {
      data: [10, 5, 7, 9],
      backgroundColor: ["#A5DCA8", "#2D582F", "#747474", "#0F2010"],
    },
  ],
};
export const circleData = {
  labels: ["Geography", "Science", "Urdu", "English"],
  datasets: [
    {
      data: [10, 5, 7, 9],
      backgroundColor: ["#E7FFE8", "#A5DCA8", "#747474", "#0F2010"],
    },
  ],
};
export const ageGroupData = {
  labels: ["13", "12", "11", "10"],
  datasets: [
    {
      data: [10, 5, 7, 9],
      backgroundColor: ["#A5DCA8", "#2D582F", "#747474", "#0F2010"],
    },
  ],
};
export const pieChartData = {
  labels: ["Female", "Male"],
  datasets: [
    {
      data: [10, 5],
      backgroundColor: ["#323232", "#747474"],
    },
  ],
};

const Dashboard = () => {
  return (
    <>
      <Navbar heading="Dashboard" />
      <div className={styles.mainGridContainer}>
        <Grid container>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <div className={styles.leftStatic}>
              <div>
                <img src={green1} alt="green1" />
              </div>
              <div className={styles.leftStatic_box}>
                <div>
                  <img src={progress5} alt="progress5" />
                </div>
                <div className={styles.leftStatic_box_p}>
                  <p className={styles.leftStatic_box_p_p1}>Beginner</p>
                  <p className={styles.leftStatic_box_p_p2}>
                    I want to learn the basics of English language
                  </p>
                </div>
              </div>
              <div className={styles.rightStatic_box}>
                <p>25 Students</p>
              </div>
            </div>
            <div className={styles.leftStatic1}>
              <div>
                <img src={green2} alt="green2" />
              </div>
              <div className={styles.leftStatic1_box}>
                <div>
                  <img src={progress1} alt="progress1" />
                </div>
                <div className={styles.leftStatic1_box_p}>
                  <p className={styles.leftStatic1_box_p_p1}>
                    Lower Intermediate
                  </p>
                  <p className={styles.leftStatic1_box_p_p2}>
                    I can already understand and put together written and spoken
                    sentences
                  </p>
                </div>
              </div>
              <div className={styles.rightStatic_box}>
                <p>15 Students</p>
              </div>
            </div>
            <div className={styles.leftStatic1}>
              <div>
                <img src={green3} alt="green3" />
              </div>
              <div className={styles.leftStatic1_box}>
                <div>
                  <img src={progress2} alt="progress2" />
                </div>
                <div className={styles.leftStatic1_box_p}>
                  <p className={styles.leftStatic1_box_p_p1}>Intermediate</p>
                  <p className={styles.leftStatic1_box_p_p2}>
                    I understand complex sentences and can get by when speaking
                  </p>
                </div>
              </div>
              <div className={styles.rightStatic_box}>
                <p>15 Students</p>
              </div>
            </div>
            <div className={styles.leftStatic1}>
              <div>
                <img src={green4} alt="green4" />
              </div>
              <div className={styles.leftStatic1_box}>
                <div>
                  <img src={progress3} alt="progress3" />
                </div>
                <div className={styles.leftStatic1_box_p}>
                  <p className={styles.leftStatic1_box_p_p1}>
                    Upper Intermediate
                  </p>
                  <p className={styles.leftStatic1_box_p_p2}>
                    I can express myself fluently and can understand almost
                    everything.
                  </p>
                </div>
              </div>
              <div className={styles.rightStatic_box}>
                <p>15 Students</p>
              </div>
            </div>
            <div className={styles.leftStatic1}>
              <div>
                <img src={green5} alt="green5" />
              </div>
              <div className={styles.leftStatic1_box}>
                <div>
                  <img src={progress4} alt="progress4" />
                </div>
                <div className={styles.leftStatic1_box_p}>
                  <p className={styles.leftStatic1_box_p_p1}>Advanced</p>
                  <p className={styles.leftStatic1_box_p_p2}>
                    I am extremely affluent in the spoken and written language
                    and just want to test myself.
                  </p>
                </div>
              </div>
              <div className={styles.rightStatic_box}>
                <p>15 Students</p>
              </div>
            </div>
          </Grid>
          {/* for with and height width={400} height={400} */}
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <div className={styles.barGraph}>
              <Bar options={options} data={data} />
              <center>
                <h2
                  stye={{
                    color: "#0F2010",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "1rem",
                  }}
                >
                  Subjects
                </h2>
              </center>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <div className={styles.doughuntGraph}>
              <Doughnut
                width={100}
                height={100}
                data={circleData}
                options={options1}
              ></Doughnut>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={styles.secondMainGridContainer}>
        <Grid container>
          {/* <Grid item xs={12} sm={12} md={4} lg={4}>
            <div className={styles.secondMainGridContainer_firstBox}>
              <table>
                <thead>
                  <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                  </tr>
                </thead>
                <tbody>
                  {monthDays.map((day, index) => (
                    <td key={index}>{day}</td>
                  ))}
                </tbody>
              </table>
            </div>
          </Grid> */}
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <div className={styles.secondMainGridContainer_secondBox}>
              <Bar options={options} data={ageGroupData} />
              <center>
                <h2
                  stye={{
                    color: "#0F2010",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "1rem",
                  }}
                >
                  Age Group
                </h2>
              </center>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <div className={styles.secondMainGridContainer_thirdBox}>
              <Pie
                data={pieChartData}
                options={options1}
                width={100}
                height={100}
              ></Pie>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
