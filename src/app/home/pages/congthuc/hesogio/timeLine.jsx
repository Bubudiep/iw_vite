import React from "react";

const TimeLine = ({ rangeTime, onRangeTimeChange }) => {
  const handleTimeChange = (index, field, value) => {
    const updatedRangeTime = [...rangeTime];
    updatedRangeTime[index] = { ...updatedRangeTime[index], [field]: value };
    onRangeTimeChange(updatedRangeTime);
  };

  const handleAddTimeSegment = (index) => {
    if (rangeTime.length === 5) {
      alert("Chỉ cho phép tối đa 5 khung giờ");
      return;
    }
    const updatedRangeTime = [...rangeTime];
    const currentSegment = updatedRangeTime[index];

    if (currentSegment.start === null || currentSegment.end === null) return; // Skip if the segment is open-ended

    // Function to calculate the next split time, you can customize this logic
    const calculateMidpoint = (start, end) => {
      return (
        new Date(`1970-01-01T${start}:00`).getTime() +
        (new Date(`1970-01-01T${end}:00`).getTime() -
          new Date(`1970-01-01T${start}:00`).getTime()) /
          2
      );
    };

    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      const hours = date.getHours().toString().padStart(2, "0");
      return `${hours}:00`;
    };

    const midpoint = formatTime(
      calculateMidpoint(currentSegment.start, currentSegment.end)
    );

    // Create two new segments
    const newSegment1 = {
      start: currentSegment.start,
      end: midpoint,
      rate: currentSegment.rate,
    };
    const newSegment2 = {
      start: midpoint,
      end: currentSegment.end,
      rate: currentSegment.rate,
    };

    // Replace the current segment with the new ones
    updatedRangeTime.splice(index, 1, newSegment1, newSegment2);
    onRangeTimeChange(updatedRangeTime);
  };

  const handleDeleteTimeSegment = (index) => {
    const updatedRangeTime = rangeTime.filter((_, i) => i !== index);
    if (updatedRangeTime.length <= 1) {
      alert("Phải có ít nhất một khung giờ!");
      return;
    }
    onRangeTimeChange(updatedRangeTime);
  };

  return (
    <div className="timeline-bar">
      <div className="start"></div>
      {rangeTime.map((timeSegment, index) => (
        <div
          key={index}
          className={`box ${timeSegment.end === null ? "ot" : ""}`}
        >
          {timeSegment.end === null ? (
            // Case for open-ended range
            <div className="items ot">
              <div className="time">
                <input
                  type="text"
                  value={timeSegment.start}
                  onChange={(e) =>
                    handleTimeChange(index, "start", e.target.value)
                  }
                />
                <i className="fa-solid fa-infinity"></i>
              </div>
              <div className="split" />
              <div className="rage">
                <input
                  type="text"
                  value={timeSegment.rate}
                  onChange={(e) =>
                    handleTimeChange(index, "rate", e.target.value)
                  }
                />
              </div>
            </div>
          ) : (
            // Case for regular range
            <>
              <div className="items">
                <div className="time">
                  <input
                    type="text"
                    value={timeSegment.start}
                    onChange={(e) =>
                      handleTimeChange(index, "start", e.target.value)
                    }
                  />
                  <div></div>
                </div>
                <div className="split" />
                <div className="rage">
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={timeSegment.rate}
                      onChange={(e) =>
                        handleTimeChange(index, "rate", e.target.value)
                      }
                    />
                    <div
                      className="delete"
                      onClick={() => handleDeleteTimeSegment(index)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="add-items"
                onClick={() => handleAddTimeSegment(index)}
              >
                <i className="fa-solid fa-plus"></i>
              </div>
            </>
          )}
        </div>
      ))}
      <div className="end">
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </div>
  );
};

export default TimeLine;
