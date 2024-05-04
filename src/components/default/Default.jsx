import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { Toaster, toast } from "react-hot-toast";
import { FcUp } from "react-icons/fc";
import { FcDown } from "react-icons/fc";
import { Link } from "react-router-dom";

const Default = () => {
  const users = [
    {
      uid: 1,
      username: "sampleuser1",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      fullname: "Sample User One",
      twubric: {
        total: 3.5,
        friends: 1,
        influence: 1,
        chirpiness: 1.5,
      },
      join_date: 1358899200,
    },
    {
      uid: 2,
      username: "sampleuser2",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      fullname: "Sample User Two",
      twubric: {
        total: 5,
        friends: 1,
        influence: 1,
        chirpiness: 1.5,
      },
      join_date: 1355270400,
    },
    {
      uid: 3,
      username: "sampleuser3",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      fullname: "Sample User Three",
      twubric: {
        total: 7,
        friends: 1,
        influence: 1,
        chirpiness: 1.5,
      },
      join_date: 1289433600,
    },
    {
      uid: 4,
      username: "sampleuser4",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      fullname: "Sample User Four",
      twubric: {
        total: 9,
        friends: 2,
        influence: 3,
        chirpiness: 4,
      },
      join_date: 1300838400,
    },
    {
      uid: 5,
      username: "sampleuser5",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      fullname: "Sample User Five",
      twubric: {
        total: 9,
        friends: 1,
        influence: 4,
        chirpiness: 4,
      },
      join_date: 1230768000,
    },
    {
      uid: 6,
      username: "sampleuser6",
      image: "https://randomuser.me/api/portraits/men/6.jpg",
      fullname: "Sample User Six",
      twubric: {
        total: 6,
        friends: 2,
        influence: 3,
        chirpiness: 1,
      },
      join_date: 1252454400,
    },
    {
      uid: 7,
      username: "sampleuser7",
      image: "https://randomuser.me/api/portraits/women/7.jpg",
      fullname: "Sample User Seven",
      twubric: {
        total: 8,
        friends: 2,
        influence: 4,
        chirpiness: 2,
      },
      join_date: 1278201600,
    },
    {
      uid: 8,
      username: "sampleuser8",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      fullname: "Sample User Eight",
      twubric: {
        total: 7,
        friends: 2,
        influence: 3,
        chirpiness: 2,
      },
      join_date: 1331510400,
    },
    {
      uid: 9,
      username: "sampleuser9",
      image: "https://randomuser.me/api/portraits/men/9.jpg",
      fullname: "Sample User Nine",
      twubric: {
        total: 8,
        friends: 1,
        influence: 4,
        chirpiness: 3,
      },
      join_date: 1367971200,
    },
    {
      uid: 10,
      username: "sampleuser10",
      image: "https://randomuser.me/api/portraits/men/10.jpg",
      fullname: "Sample User Ten",
      twubric: {
        total: 5,
        friends: 1,
        influence: 1,
        chirpiness: 3,
      },
      join_date: 1228953600,
    },
  ];
  const [twubricUser, setTwubricUser] = useState(users);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const parseDate = (date) => {
    const formattedDate = moment.unix(date).format("MMM DD,YYYY");
    return formattedDate;
  };
  let tempOrder = true;
  const onSortBy = (sortByOption) => {
    if (sortByOption === sortBy) {
      setOrder(!order);
    } else {
      setOrder(true);
    }
    setSortBy(sortByOption);
  };

  const onDateSelected = (event, from) => {
    if (from === "start") {
      setStartDate(event.target.value);
    } else {
      setEndDate(event.target.value);
    }
  };

  useEffect(() => {
    if (startDate !== "" && endDate !== "") {
      const filteredUsers = users.filter((user) => {
        return moment(
          moment.unix(user.join_date).format("YYYY-MM-DD")
        ).isBetween(startDate, endDate);
      });

      setTwubricUser(filteredUsers);
    }
  }, [startDate, endDate]);

  const onRemoveClicked = (user) => {
    const filteredUsers = twubricUser.filter((individualUser) => {
      return individualUser.uid !== user.uid;
    });

    setTwubricUser(filteredUsers);
    toast.success(`${user.username} removed from the list.`);
  };

  useEffect(() => {
    users.sort((a, b) => {
      if (sortBy === "total") {
        if (order) {
          return a.twubric.total - b.twubric.total;
        } else {
          return b.twubric.total - a.twubric.total;
        }
      } else if (sortBy === "friends") {
        if (order) {
          return a.twubric.friends - b.twubric.friends;
        } else {
          return b.twubric.friends - a.twubric.friends;
        }
      } else if (sortBy === "influence") {
        if (order) {
          return a.twubric.influence - b.twubric.influence;
        } else {
          return b.twubric.influence - a.twubric.influence;
        }
      } else if (sortBy === "chirpiness") {
        if (order) {
          return a.twubric.chirpiness - b.twubric.chirpiness;
        } else {
          return b.twubric.chirpiness - a.twubric.chirpiness;
        }
      }
    });
    if (sortBy) {
      toast.success(
        `Users sorted by ${sortBy} ( ${order ? "Ascending" : "Descending"} )`
      );
    }
    setTwubricUser(users);
  }, [sortBy, order]);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="bg-gradient-to-r from-red-500 to-orange-500 mb-4">
        <div className="text-white text-center py-2">
          Had enough of this tabular and boring data? Have a look at the
          <Link
            to="/visual"
            className="underline underline-offset-2 font-bold text-lg"
          >
            {" "}
            Graphical Version
          </Link>{" "}
          instead.
        </div>
      </div>
      <div className="mb-4 px-6">
        <span>Sort By</span>
        <div className="flex justify-between border-2 divide-x-2 mt-2">
          <span
            className="p-2 w-full flex justify-between items-center cursor-pointer"
            onClick={() => onSortBy("total")}
          >
            <span>Twubric Score </span>
            {sortBy === "total" && (
              <div>{order === true ? <FcUp /> : <FcDown />}</div>
            )}
          </span>
          <span
            className="p-2 w-full flex justify-between items-center cursor-pointer"
            onClick={() => onSortBy("friends")}
          >
            Friends
            {sortBy === "friends" && (
              <div>{order === true ? <FcUp /> : <FcDown />}</div>
            )}
          </span>
          <span
            className="p-2 w-full flex justify-between items-center cursor-pointer"
            onClick={() => onSortBy("influence")}
          >
            Influence
            {sortBy === "influence" && (
              <div>{order === true ? <FcUp /> : <FcDown />}</div>
            )}
          </span>
          <span
            className="p-2 w-full flex justify-between items-center cursor-pointer"
            onClick={() => onSortBy("chirpiness")}
          >
            Chirpiness
            {sortBy === "chirpiness" && (
              <div>{order === true ? <FcUp /> : <FcDown />}</div>
            )}
          </span>
        </div>
      </div>

      <div className="px-6 mb-6">
        <span>Joined Between</span>
        <div className="flex flex-col  lg:flex-row justify-between border-2 divide-x-2 mt-2">
          <div className="w-full p-2 flex gap-8 items-center">
            <label htmlFor="">Start Date</label>
            <input
              type="date"
              onChange={() => onDateSelected(event, "start")}
            />
          </div>
          <div className="w-full p-2 flex gap-8 items-center">
            <label htmlFor="">End Date</label>
            <input type="date" onChange={() => onDateSelected(event, "end")} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-2 px-6 mb-6">
        {twubricUser.map((user) => {
          return (
            <div key={user.uid} className="divide-y-2 border-2 rounded-lg">
              <div className="flex justify-between px-2 py-2 items-center text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <img src={user.image} alt="" className="h-10 rounded-full" />
                  <span>{user.fullname}</span>
                </div>
                <span>{user.twubric.total}</span>
              </div>
              <div className="flex justify-between divide-x-2">
                <div className=" w-full text-center">
                  {user.twubric.friends} <br /> Friends
                </div>
                <div className=" w-full text-center">
                  {user.twubric.influence} <br /> Influence
                </div>
                <div className=" w-full text-center">
                  {user.twubric.chirpiness} <br /> Chirpness
                </div>
              </div>
              <div className="flex justify-between divide-x-2">
                <div className=" w-1/3 text-center">
                  {parseDate(user.join_date)}
                </div>
                <div
                  className=" w-2/3 text-right pr-2 cursor-pointer"
                  onClick={() => onRemoveClicked(user)}
                >
                  Remove
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Default;
