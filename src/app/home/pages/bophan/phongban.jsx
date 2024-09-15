import React from "react";
import { useParams } from "react-router-dom";

const Department = () => {
  const { deptName } = useParams();
  const decodedDeptName = decodeURIComponent(deptName);
  console.log(decodedDeptName);
  // Bạn có thể thêm logic để lấy thông tin chi tiết về bộ phận dựa trên decodedDeptName

  return (
    <div className="department-tab">
      <div className="flex gap-2">
        <div className="flex flex-col flex-1 max-w-[1200px] gap-2">
          <div className="department-name">
            Bảng tin bộ phận {decodedDeptName}
          </div>
          <div className="feed-box">
            <div className="news-box"></div>
            <div className="olds-box">
              <div className="items">
                <div className="logo">ảnh</div>
                <div className="details">
                  <div className="title">Tiêu đề</div>
                  <div className="description">Nội dung</div>
                </div>
              </div>
              <div className="items">
                <div className="logo">ảnh</div>
                <div className="details">
                  <div className="title">Tiêu đề</div>
                  <div className="description">Nội dung</div>
                </div>
              </div>
              <div className="items">
                <div className="logo">ảnh</div>
                <div className="details">
                  <div className="title">Tiêu đề</div>
                  <div className="description">Nội dung</div>
                </div>
              </div>
              <div className="items">
                <div className="logo">ảnh</div>
                <div className="details">
                  <div className="title">Tiêu đề</div>
                  <div className="description">Nội dung</div>
                </div>
              </div>
            </div>
          </div>
          <div className="department-name">Sơ đồ tổ chức</div>
          <div className="feed-box">
            <div className="news-box"></div>
          </div>
          <div className="department-name">Dự án</div>
          <div className="feed-box">
            <div className="news-box"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Department;
