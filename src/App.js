import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [lineChecks, setLineChecks] = useState([]);
  const [checkAll, setCheckAll] = useState(false);

  const json = {
    data: [
      {
        name: "Africon Beignets",
        onPaused: true,
        deliveryStatus: "Live",
        bid: 50,
        budget: 150,
        spend: 450,
        impressions: 1000,
        clicks: 20,
        ctr: 2,
      },
      {
        name: "Africon coffee",
        onPaused: false,
        deliveryStatus: "In Review",
        bid: 50,
        budget: 150,
        spend: 450,
        impressions: 1000,
        clicks: 20,
        ctr: 2,
      },
    ],
  };

  useEffect(() => {
    setLineChecks(new Array(json.data.length).fill(false));
  }, [json.data.length]);

  useEffect(() => {
    setLineChecks(new Array(json.data.length).fill(checkAll));
  }, [checkAll]);

  // Create our number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const formatStatus = (lineItem, status) => {
    if (status === "onPaused") {
      // todo: change to enum
      return !lineItem[status] ? "false" : "true";
    }
    if (status === "bid" || status === "budget" || status === "spend") {
      return formatter.format(lineItem[status]);
    }

    return lineItem[status];
  };

  const checkLine = (idx) => {
    const copy = [...lineChecks];
    copy[idx] = !copy[idx];
    setLineChecks(copy);
    setCheckAll(false);
  };

  return (
    <div className="App">
      <table>
        <tr>
          <input
            type="checkbox"
            onClick={() => {
              setCheckAll(!checkAll);
            }}
            checked={checkAll}
          ></input>
          <th>Name</th>
          <th>On/Paused</th>
          <th>Delivery Status</th>
          <th>Bid</th>
          <th>Budget</th>
          <th>Spend</th>
          <th>Impressions</th>
          <th>Clicks</th>
          <th>CTR</th>
        </tr>
        <tbody>
          {json.data.map((lineItem, lineItemIdx) => {
            return (
              <tr key={lineItemIdx}>
                <input
                  type="checkbox"
                  onClick={() => {
                    checkLine(lineItemIdx);
                  }}
                  checked={lineChecks[lineItemIdx]}
                ></input>
                {Object.keys(lineItem).map((status, index) => (
                  <td key={index}>{formatStatus(lineItem, status)}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
