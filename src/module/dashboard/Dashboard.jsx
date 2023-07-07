import React, { useState, useEffect } from "react";
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
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateEvent,
  SubjectReport,
  CountByLevel,
  CountByGender,
  CountByAge,
  clearErrors,
  clearMessages,
} from "./../../store/actions";
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

const Dashboard = () => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const {
    message,
    errors,
    loading,
    subjectReport,
    levelReport,
    genderReport,
    ageReport,
  } = useSelector((state) => state.dashboardReducer);

  let subjectLabelsArray = [];
  let subjectDataArray = [];
  if (subjectReport.length > 0) {
    subjectReport.forEach((data) => {
      subjectLabelsArray.push(data.subject ? data.subject : "");
      subjectDataArray.push(data.count ? data.count : "");
    });
  }
  const data = {
    labels: subjectLabelsArray,
    datasets: [
      {
        data: subjectDataArray,
        backgroundColor: ["#A5DCA8", "#2D582F", "#747474", "#0F2010"],
      },
    ],
  };

  const circleData = {
    labels: subjectLabelsArray,
    datasets: [
      {
        data: subjectDataArray,
        backgroundColor: ["#E7FFE8", "#A5DCA8", "#747474", "#0F2010"],
      },
    ],
  };
  let levelBeginnerCount = 0;
  let levelLowerIntermediateCount = 0;
  let levelIntermediateCount = 0;
  let levelUperIntermediateCount = 0;
  let levelAdvancedCount = 0;
  if (levelReport.length > 0) {
    levelReport.forEach((data) => {
      if (data.level === "BEGINNER") {
        levelBeginnerCount = data.count;
      }
      if (data.level === "LOWER_INTERMEDIATE") {
        levelLowerIntermediateCount = data.count;
      }
      if (data.level === "INTERMEDIATE") {
        levelIntermediateCount = data.count;
      }
      if (data.level === "UPPER_INTERMEDIATE") {
        levelUperIntermediateCount = data.count;
      }
      if (data.level === "ADVANCED") {
        levelAdvancedCount = data.count;
      }
    });
  }
  let genderReportHeading = [];
  let genderReportCount = [];
  if (genderReport.length > 0) {
    genderReport.forEach((data) => {
      genderReportHeading.push(data?.gender ? data.gender : "");
      genderReportCount.push(data?.count ? data.count : "");
    });
  }

  const pieChartData = {
    labels: genderReportHeading,
    datasets: [
      {
        data: genderReportCount,
        backgroundColor: ["#323232", "#747474"],
      },
    ],
  };
  let ageReportCount = [];
  let ageReportHeading = [];
  if (ageReport.length > 0) {
    ageReport.forEach((data) => {
      ageReportCount.push(data?.count ? data.count : "");
      ageReportHeading.push(data?.age ? data.age : "");
    });
  }
  const ageGroupData = {
    labels: ageReportHeading,
    datasets: [
      {
        data: ageReportCount,
        backgroundColor: ["#A5DCA8", "#2D582F", "#747474", "#0F2010"],
      },
    ],
  };
  useEffect(() => {
    if (errors.length > 0) {
      toast.error(errors);
      dispatch(clearErrors());
    }
    if (message != "") {
      toast.success(message);
      dispatch(clearMessages());
    }
  }, [errors, message]);

  useEffect(() => {
    dispatch(SubjectReport());
    dispatch(CountByLevel());
    dispatch(CountByGender());
    dispatch(CountByAge());
  }, []);

  const result = { date, description };
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
                <p>{levelBeginnerCount} Students</p>
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
                <p>{levelLowerIntermediateCount} Students</p>
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
                <p>{levelIntermediateCount} Students</p>
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
                <p>{levelUperIntermediateCount} Students</p>
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
                <p>{levelAdvancedCount} Students</p>
              </div>
            </div>
          </Grid>
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
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <div
              style={{ marginTop: "3rem" }}
              className={styles.secondMainGridContainer_lastBox}
            >
              <h1>Schedule Events</h1>
              <br />
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <br />
              <input
                type="text"
                placeholder="Add description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  marginTop: "2rem",
                  padding: "1rem 3.3rem",
                  outline: "none",
                }}
              />
              <br />
              <button
                style={{
                  marginTop: "2rem",
                  padding: "0.5rem 8.5rem",
                  backgroundColor: "#A5DCA8",
                  outline: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  dispatch(
                    CreateEvent(result),
                    setDate(""),
                    setDescription("")
                  );
                }}
              >
                {loading ? "..." : "Submit"}
              </button>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
