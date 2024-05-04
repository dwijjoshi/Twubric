import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import moment from "moment/moment";
import { Bar, Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import users from "../../shared.json";
const Charts = () => {
  let dataLabels = [];
  let totalData = [];
  let friendsData = [];
  let influenceData = [];
  let chirpinessData = [];
  users.map((user) => {
    dataLabels.push(user.fullname);
    totalData.push(user.twubric.total);
    friendsData.push(user.twubric.friends);
    influenceData.push(user.twubric.influence);
    chirpinessData.push(user.twubric.chirpiness);
  });

  const totalDataChart = {
    labels: dataLabels,
    datasets: [
      {
        label: "Total Twubric Score",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: totalData,
      },
    ],
  };

  const friendsDataChart = {
    labels: dataLabels,
    datasets: [
      {
        label: "Friends Score",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: friendsData,
      },
    ],
  };

  const [mostInfluencialFollowers, setMostInfluencialFollowers] = useState();
  const [mostChirpyFollowers, setMostChirpyFollowers] = useState();
  const [oldFollowers, setOldFollowers] = useState();

  useEffect(() => {
    const influencialUsers = [...users];
    influencialUsers.sort((a, b) => {
      return b.twubric.influence - a.twubric.influence;
    });
    const topThreeInfluencialUsers = influencialUsers.slice(0, 3);
    setMostInfluencialFollowers(topThreeInfluencialUsers);

    const chirpyUsers = [...users];
    chirpyUsers.sort((a, b) => {
      return b.twubric.chirpiness - a.twubric.chirpiness;
    });
    const topThreeChirpyUsers = chirpyUsers.slice(0, 3);
    setMostChirpyFollowers(topThreeChirpyUsers);

    const earlyFollowers = [...users];
    earlyFollowers.sort((a, b) => {
      return (
        moment(a.join_date).format("YYYYMMDD") -
        moment(b.join_date).format("YYYYMMDD")
      );
    });
    const topThreeOldFollowers = earlyFollowers.slice(0, 3);
    setOldFollowers(topThreeOldFollowers);
  }, []);

  const parseDate = (date) => {
    const formattedDate = moment.unix(date).format("MMM DD,YYYY");
    return formattedDate;
  };

  const influenceDataChart = {
    labels: dataLabels,
    datasets: [
      {
        label: "Friends Score",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: influenceData,
      },
    ],
  };

  const chirpinessDataChart = {
    labels: dataLabels,
    datasets: [
      {
        label: "Friends Score",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: chirpinessData,
      },
    ],
  };
  console.log(totalData);
  return (
    <div className="">
      <div className="bg-gradient-to-r from-red-500 to-orange-500">
        <div className="text-white text-center py-2">
          Want to have a traditional look ? Get back to
          <Link
            to="/"
            className="underline underline-offset-2 font-bold text-lg"
          >
            {" "}
            Grid Version
          </Link>{" "}
        </div>
      </div>
      <div className="flex justify-between gap-6 px-4 mt-6">
        <div className="w-[60%] border-2 rounded-lg p-2 px-4 ">
          <div className="text-center w-full">Total Twubric Score</div>
          <Bar data={totalDataChart} />
        </div>
        <div className="w-[60%] border-2 rounded-lg p-2 px-4">
          <div className="text-center w-full">Friends Score</div>
          <Bar data={friendsDataChart} />
        </div>
      </div>
      <div className="flex justify-between gap-6 px-4 mt-6">
        <div className="w-[60%] border-2 rounded-lg p-2 px-4 ">
          <div className="text-center w-full">Influence Score</div>
          <Bar data={influenceDataChart} />
        </div>
        <div className="w-[60%] border-2 rounded-lg p-2 px-4">
          <div className="text-center w-full">Chirpiness Score</div>
          <Bar data={chirpinessDataChart} />
        </div>
      </div>
      <div className="w-full flex justify-between px-4 gap-6  mt-8 mb-8">
        <div className="w-full border-2 p-4 rounded-lg">
          <span className="font-semibold text-xl">
            Most Influencial Followers
          </span>
          <div className="">
            {mostInfluencialFollowers &&
              mostInfluencialFollowers.map((user) => {
                return (
                  <div className="my-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        className="h-10 rounded-full"
                        src={user.image}
                        alt=""
                      />
                      <span>{user.fullname}</span>
                    </div>
                    <span>Influence : {user.twubric.chirpiness}</span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="w-full border-2 p-4 rounded-lg">
          <span className="font-semibold text-xl">Most Chirpy Followers</span>
          <div className="">
            {mostChirpyFollowers &&
              mostChirpyFollowers.map((user) => {
                return (
                  <div className="my-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        className="h-10 rounded-full"
                        src={user.image}
                        alt=""
                      />
                      <span>{user.fullname}</span>
                    </div>
                    <span>Chirpiness : {user.twubric.chirpiness}</span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="w-full border-2 p-4 rounded-lg">
          <span className="font-semibold text-xl">Oldest Followers</span>
          <div className="">
            {oldFollowers &&
              oldFollowers.map((user) => {
                return (
                  <div className="my-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        className="h-10 rounded-full"
                        src={user.image}
                        alt=""
                      />
                      <span>{user.fullname}</span>
                    </div>
                    <span>Date : {parseDate(user.join_date)}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
