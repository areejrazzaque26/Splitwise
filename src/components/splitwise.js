import React, { useEffect, useState } from "react";

import "./spliwise.css";

function Splitwise() {
  const [billAmount, setBillAmount] = useState("");
  const [person, setPersons] = useState("");
  const [split, setSplit] = useState("");
  const [description, setDescription] = useState("");
  const [dates, setDate] = useState("");
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")));

  const handleDateChange = (e) => {
    const date = e.target.value;
    setDate(date);
  };

  const addDescription = (e) => {
    const describe = e.target.value;
    setDescription(describe);
  };

  const handleBillChange = (e) => {
    const amount = parseInt(e.target.value);
    setBillAmount(amount);
  };

  const handlePersons = (e) => {
    const people = parseInt(e.target.value);
    setPersons(people);
  };

  const splitAmount = () => {
    if (billAmount && person) {
      const splitAmount = billAmount / person;
      setSplit(splitAmount);
    } else {
      setSplit("");
    }
  };

  return (
    <div className="appS">
      <div className="splitwise">
        <div className="SplitBillApp">
          <div className="inputBoxesContainer">
            <div className="inputBoxes">
              <p>Date:</p>
              <input
                className="inputDate"
                placeholder="Enter date"
                onChange={handleDateChange}
              />
            </div>

            <div className="inputBoxes">
              <p>Bill:</p>
              <input
                className="inputBill"
                placeholder="Enter Bill"
                onChange={handleBillChange}
              />
            </div>
            <div className="inputBoxes">
              <p>Persons:</p>
              <input
                className="inputPeople"
                placeholder="Enter persons"
                onChange={handlePersons}
              />
            </div>
          </div>
          <button className="btn splitBill my-4" onClick={splitAmount}>
            Split Bill
          </button>
          <div className="descriptionBox">
            <input
              className="describe"
              onChange={addDescription}
              placeholder="Add Description"
            />
            <div className="displayDescription">{description}</div>
            <div className="usersDiv">
              {users?.length > 0
                ? users.map((user, i) => (
                    <ul key={i}>
                      <li>{user?.email}</li>
                    </ul>
                  ))
                : ""}
            </div>
          </div>
        </div>

        <div className="report">
          <div className="reportDiv1">
            <div className="dateReport">Date: {dates}</div>
            <div className="billReport">Bill: {billAmount}</div>
            <div className="peopleReport">No of people: {person}</div>
            <div className="splitReport">Bill per person: {split}</div>
          </div>
          <div className="reportDiv2">
            <div className="descriptionText">Description</div>
            <div className="description">{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Splitwise;
