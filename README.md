# MD20302 - Cổng Thông Tin & Đánh Giá Nhóm

Dự án website quản lý bài báo cáo và đánh giá dự án cho lớp MD20302 (Học kỳ Spring 2026). Ứng dụng cho phép xem thông tin các nhóm, tải tài liệu và gửi đánh giá qua email.

## Tính năng chính

*   **Danh sách nhóm:** Hiển thị 4 nhóm dự án với thông tin chi tiết (Thành viên, chủ đề, mô tả).
*   **Xem chi tiết:** Giao diện xem tài liệu và thông tin nhóm.
*   **Tải tài liệu:** Chức năng tải tài liệu gốc (File text mô phỏng).
*   **Đánh giá:** Form đánh giá dự án với tiêu chí và nhận xét.
*   **Tích hợp Email:** Tự động gửi email thông báo đánh giá đến trưởng nhóm tương ứng.

## Danh sách nhóm & Email liên hệ

1.  **Mầm Nắng** (Thiện nguyện) - `anphattan222@gmail.com`
2.  **Team qua môn** (Quản trị dự án) - `anphattan2@gmail.com`
3.  **NGỌN ĐUỐC XANH** (Môi trường) - `minhnhat2k2135@gmail.com`
4.  **AI và quanh ta** (AI) - `lnhat1938@gmail.com`

## Cài đặt và Chạy (Local Development)

Dự án này được xây dựng bằng React và Tailwind CSS.

### Yêu cầu

*   Node.js (phiên bản 16 trở lên)
*   npm hoặc yarn

### Các bước cài đặt

1.  Tải source code về máy.
2.  Mở terminal tại thư mục dự án.
3.  Cài đặt các thư viện phụ thuộc:
    ```bash
    npm install
    ```
4.  Chạy dự án ở môi trường development:
    ```bash
    npm run dev
    ```
5.  Truy cập `http://localhost:5173` trên trình duyệt.

## Cấu trúc dự án

*   `App.tsx`: Component chính quản lý luồng ứng dụng.
*   `components/GroupCard.tsx`: Thẻ hiển thị thông tin tóm tắt của nhóm.
*   `components/DocumentViewer.tsx`: Trang chi tiết để xem và đánh giá dự án.
*   `constants.ts`: Dữ liệu tĩnh của các nhóm (Hardcoded data).
*   `types.ts`: Định nghĩa TypeScript interfaces.

---
© 2026 MD20302 Project Manager