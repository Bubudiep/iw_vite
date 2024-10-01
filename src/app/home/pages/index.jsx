import React from "react";
import Chart from "react-apexcharts";

const Trangchu = () => {
  function generateMonthDays(month, year) {
    const daysInMonth = new Date(year, month, 0).getDate(); // Lấy số ngày trong tháng
    const daysList = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const formattedDay = String(day).padStart(2, "0"); // Định dạng ngày (VD: '01', '02')
      const formattedMonth = String(month).padStart(2, "0"); // Định dạng tháng (VD: '10')
      daysList.push(`${formattedDay}`);
    }
    console.log(daysList, daysInMonth, new Date(year, month, 0), year, month);
    return daysList;
  }
  const workChart = {
    options: {
      chart: {
        id: "basic-bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 5, // Bo tròn các góc của cột
          columnWidth: "80%", // Điều chỉnh độ rộng của cột nếu cần
        },
      },
      xaxis: {
        categories: generateMonthDays(
          new Date().getMonth() + 1,
          new Date().getFullYear()
        ),
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };
  return (
    <div className="main-sub">
      <div className="dashboard-container">
        <div className="flex-2cl">
          <div className="employeer-container">
            <div className="data-box">
              <div className="name">Tổng số nhân viên</div>
              <div className="value">
                <div className="logo">
                  <i className="fa-solid fa-user-group"></i>
                </div>
                <div className="intro">
                  99999<div className="unit">người</div>
                </div>
              </div>
              <div className="details">
                <div className="percent up">
                  <div className="logo">
                    <i className="fa-solid fa-arrow-up"></i>
                  </div>
                  <div className="text">5%</div>
                </div>
                <div className="msg">trong tháng vừa qua!</div>
              </div>
            </div>
            <div className="data-box">
              <div className="name">Bộ phận và phòng ban</div>
              <div className="value">
                <div className="logo">
                  <i className="fa-solid fa-users-line"></i>
                </div>
                <div className="intro">
                  99999<div className="unit">phòng ban</div>
                </div>
              </div>
              <div className="details">
                <div className="percent up">
                  <div className="logo">
                    <i className="fa-solid fa-seedling"></i>
                  </div>
                  <div className="text">Office</div>
                </div>
                <div className="msg">là phòng ban tiêu biểu!</div>
              </div>
            </div>
            <div className="data-box">
              <div className="name">Tổng số giờ làm việc</div>
              <div className="value">
                <div className="logo">
                  <i className="fa-solid fa-business-time"></i>
                </div>
                <div className="intro">
                  99999<div className="unit">giờ</div>
                </div>
              </div>
              <div className="details">
                <div className="msg">Vượt chỉ tiêu</div>
                <div className="percent up">
                  <div className="logo">
                    <i className="fa-solid fa-arrow-up"></i>
                  </div>
                  <div className="text">200 giờ công</div>
                </div>
              </div>
            </div>
            <div className="data-box">
              <div className="name">Số người đạt chuyên cần</div>
              <div className="value">
                <div className="logo">
                  <i className="fa-solid fa-stopwatch"></i>
                </div>
                <div className="intro">
                  6666<div className="unit">người</div>
                </div>
              </div>
              <div className="details">
                <div className="msg">Tỉ lệ so với tháng trước </div>
                <div className="percent up">
                  <div className="logo">
                    <i className="fa-solid fa-arrow-up"></i>
                  </div>
                  <div className="text">1.5%</div>
                </div>
              </div>
            </div>
          </div>
          <div className="data-box-1">
            <div className="title">
              Thống kê nhân viên đi làm tháng {new Date().getMonth() + 1}
            </div>
            <Chart
              options={workChart.options}
              series={workChart.series}
              type="bar"
              height={240}
              width="100%" // Sử dụng 100% để biểu đồ chiếm toàn bộ chiều rộng của container
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trangchu;
