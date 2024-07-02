import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Main.module.css";
import ApexChart from "../ApexChart/ApexChart";
import axios from "axios";
import PieChart from "../PieChart/PieChart";

function Main() {
  const [data, setData] = useState({
    totalUsers: 0,
    totalTags: 0,
    totalLinks: 0,
    totalBlogs: 0,
    userActivity: [],
    adminCount: 0,
    subAdminCount: 0,
    activeUsers: 0,
    inactiveUsers: 0,
  });

  const navigate = useNavigate();

  const fetchCounts = async () => {
    try {
      const [
        timeResponse,
        usersResponse,
        tagsResponse,
        linksResponse,
        blogsResponse,
      ] = await Promise.all([
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/`),
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/count/users`),
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tags`),
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/links`),
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/blog`),
      ]);

      console.log("Users Response Data:", timeResponse.data);

      const users = timeResponse.data;
      if (!users) {
        throw new Error("Users data is missing");
      }

      const userActivity = processUserActivity(users);
      const { adminCount, subAdminCount } = processAdminCounts(users);
      const { activeUsers, inactiveUsers } = processActiveUsers(users);

      console.log("Processed User Activity Data:", userActivity);

      setData({
        totalUsers: usersResponse.data.totalUsers || 0,
        totalTags: tagsResponse.data.length || 0,
        totalLinks: linksResponse.data.length || 0,
        totalBlogs: blogsResponse.data.length || 0,
        userActivity,
        adminCount,
        subAdminCount,
        activeUsers,
        inactiveUsers,
      });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const processUserActivity = (users) => {
    const activityMap = {};
    users.forEach((user) => {
      const [day, month, year] = user.lastLoggingTime.split(" ")[0].split("_");
      const date = new Date(`${year}-${month}-${day}`)
        .toISOString()
        .split("T")[0];

      if (!activityMap[date]) {
        activityMap[date] = 0;
      }
      activityMap[date]++;
    });

    return Object.keys(activityMap).map((date) => ({
      x: new Date(date).getTime(),
      y: activityMap[date],
    }));
  };

  const processAdminCounts = (users) => {
    let adminCount = 0;
    let subAdminCount = 0;

    users.forEach((user) => {
      if (user.role === "Admin") {
        adminCount++;
      } else if (user.role === "SubAdmin") {
        subAdminCount++;
      }
    });

    return { adminCount, subAdminCount };
  };

  const processActiveUsers = (users) => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    let activeUsers = 0;
    let inactiveUsers = 0;

    users.forEach((user) => {
      const [day, month, year] = user.lastLoggingTime.split(" ")[0].split("_");
      const lastLoginDate = new Date(`${year}-${month}-${day}`);

      if (lastLoginDate >= thirtyDaysAgo) {
        activeUsers++;
      } else {
        inactiveUsers++;
      }
    });

    return { activeUsers, inactiveUsers };
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className={style.main}>
      <div className={style.cards}>
        <div className={style.child} onClick={() => handleNavigate("/users")}>
          <h6>Users</h6>
          <p>{data.totalUsers}</p>
        </div>
        <div className={style.child} onClick={() => handleNavigate("/blog")}>
          <h6>Blogs</h6>
          <p>{data.totalBlogs}</p>
        </div>
        <div className={style.child} onClick={() => handleNavigate("/tags")}>
          <h6>Tags</h6>
          <p>{data.totalTags}</p>
        </div>
        <div className={style.child} onClick={() => handleNavigate("/links")}>
          <h6>Links</h6>
          <p>{data.totalLinks}</p>
        </div>
      </div>
      <div className={style.pieCharts}>
        {data.adminCount || data.subAdminCount ? (
          <div className={style.pieChartWrapper}>
            <PieChart
              series={[data.adminCount, data.subAdminCount]}
              labels={["Admins", "SubAdmins"]}
              title="Admin vs SubAdmin Count"
            />
          </div>
        ) : null}
        {data.activeUsers || data.inactiveUsers ? (
          <div className={style.pieChartWrapper}>
            <PieChart
              series={[data.activeUsers, data.inactiveUsers]}
              labels={["Active Users", "Inactive Users"]}
              title="Active vs Inactive Users"
            />
          </div>
        ) : null}
      </div>
      <div className={style.chartWrapper}>
        <ApexChart userActivity={data.userActivity} />
      </div>
    </div>
  );
}

export default Main;
