import React, { useState } from "react";
import TimeLine from "./hesogio/timeLine";

const Hesogio = () => {
  const [selectedShift, setSelectedShift] = useState("HC");
  const [timeSlots, setTimeSlots] = useState([
    {
      name: "Ca làm việc A", // Đặt tên mặc định
      start: "08:00",
      end: "17:00",
      startbreakTime: "12:00",
      endbreakTime: "13:00",
      hourlyRate: 100,
      rangeTime: [
        {
          start: "08:00",
          end: "17:00",
          rate: 100,
        },
        {
          start: "17:00",
          end: null,
          rate: 150,
        },
      ],
    },
  ]);

  const handleShiftChange = (e) => {
    const shift = e.target.value;
    setSelectedShift(shift);

    // Set the number of time slots based on the selected shift
    let slots = 1;
    if (shift === "2CA") slots = 2;
    if (shift === "3CA") slots = 3;
    if (shift === "4CA") slots = 4;

    // Initialize time slots for each shift
    const initialTimeSlots = Array(slots).fill({
      name: "Ca làm việc A", // Đặt tên mặc định
      start: "08:00",
      end: "17:00",
      startbreakTime: "12:00",
      endbreakTime: "13:00",
      hourlyRate: 100,
      rangeTime: [
        {
          start: "08:00",
          end: "17:00",
          rate: 100,
        },
        {
          start: "17:00",
          end: null,
          rate: 150,
        },
      ],
    });
    setTimeSlots(initialTimeSlots);
  };

  const handleTimeChange = (index, field, value) => {
    const updatedSlots = [...timeSlots];
    updatedSlots[index] = { ...updatedSlots[index], [field]: value };
    setTimeSlots(updatedSlots);
    console.log(timeSlots);
  };

  const handleRangeTimeChange = (slotIndex, updatedRangeTime) => {
    const updatedSlots = [...timeSlots];
    updatedSlots[slotIndex] = {
      ...updatedSlots[slotIndex],
      rangeTime: updatedRangeTime,
    };
    setTimeSlots(updatedSlots);
    console.log(timeSlots);
  };
  return (
    <div className="sub-main">
      <div className="h2">Cài đặt chung</div>
      <div className="flex gap-2 w-full">
        <div className="white-box flex flex-col flex-1">
          <div className="config-item">
            <div className="details">
              <div className="name">Ca làm việc chung</div>
              <div className="description">
                Số ca làm việc của công ty bạn, mục này sẽ ảnh hưởng đến phần
                tính hệ số lương theo giờ làm
              </div>
            </div>
            <div className="options"></div>
          </div>
        </div>
        <div className="white-box flex flex-col flex-1">
          <div className="config-item">
            <div className="name">Ca làm việc chung</div>
            <div className="options">
              <select>
                <option>Hành chính</option>
                <option>Ca ngày/đêm</option>
                <option>3 Ca</option>
                <option>4 Ca</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="h2">Thiết lập chia ca</div>
      <div className="white-box">
        <div className="sub-head">
          <div className="flex flex-1 justify-between">
            <select value={selectedShift} onChange={handleShiftChange}>
              <option value="HC">Hành chính</option>
              <option value="2CA">2 Ca</option>
              <option value="3CA">3 Ca</option>
              <option value="4CA">4 Ca</option>
            </select>
            <button className="flex gap-2">
              <i class="fa-solid fa-gears" />
              Lưu cài đặt
            </button>
          </div>
        </div>
        <div className="sub-main">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th>Tên ca làm việc</th>
                <th>Hệ số (%)</th>
                <th>Bắt đầu</th>
                <th>Kết thúc</th>
                <th>Giờ nghỉ</th>
                <th>Hệ số theo giờ (%)</th>
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      className="named"
                      value={slot.name} // Cho phép người dùng thay đổi tên
                      onChange={(e) =>
                        handleTimeChange(index, "name", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="w-full border rounded"
                      value={slot.hourlyRate}
                      onChange={(e) =>
                        handleTimeChange(index, "hourlyRate", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      className="w-full border rounded"
                      value={slot.start}
                      onChange={(e) =>
                        handleTimeChange(index, "start", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      className="w-full border rounded"
                      value={slot.end}
                      onChange={(e) =>
                        handleTimeChange(index, "end", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <div className="breakTime">
                      <input
                        type="time"
                        value={slot.startbreakTime}
                        onChange={(e) =>
                          handleTimeChange(index, "breakTime", e.target.value)
                        }
                      />
                      -
                      <input
                        type="time"
                        value={slot.endbreakTime}
                        onChange={(e) =>
                          handleTimeChange(index, "breakTime", e.target.value)
                        }
                      />
                    </div>
                  </td>
                  <td>
                    <TimeLine
                      rangeTime={slot.rangeTime}
                      onRangeTimeChange={(updatedRangeTime) =>
                        handleRangeTimeChange(index, updatedRangeTime)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Hesogio;
