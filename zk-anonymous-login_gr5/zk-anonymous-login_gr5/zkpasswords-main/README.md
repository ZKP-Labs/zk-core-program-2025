# ZKAuth: Zero-Knowledge Password Authentication

ZKAuth là một hệ thống xác thực người dùng dựa trên công nghệ Zero-Knowledge Proof (ZKP), cho phép người dùng chứng minh rằng họ biết một mật khẩu hợp lệ mà không cần gửi mật khẩu hoặc hash đến server. Điều này giúp bảo mật tuyệt đối thông tin đăng nhập, loại bỏ nguy cơ rò rỉ mật khẩu từ phía máy chủ, và là một bước tiến quan trọng trong việc nâng cao quyền riêng tư số.

ZKAuth mang tiềm năng lớn trong các hệ thống cần xác thực an toàn, ví dụ như ví blockchain, hệ thống tài chính, ứng dụng bảo mật doanh nghiệp, và các dịch vụ web đòi hỏi tính bảo mật cao.

---

## Team Information

**Group:** ZKAuth Team

**Members**

- Name: Hà Duy Nhất  
  - Discord Username: `haduynhat_49827`    
  - Role: Team Leader

- Name: Phạm Đăng Trình  
  - Role: Member

- Name: Trương Văn Thịnh  
  - Role: Member

- Name: Nguyễn Thanh Truyền  
  - Role: Member

- Name: Nguyễn Huỳnh Quang  
  - Role: Member
  
- Name: Nguyễn Đại Phát
  - Role: Member  
---

## Technical Report

### 🧩 Vấn đề thực tế

Các hệ thống xác thực hiện nay chủ yếu lưu trữ hash mật khẩu hoặc dựa vào server để xác minh mật khẩu. Điều này khiến mật khẩu người dùng có thể bị lộ nếu:

- Hash bị rò rỉ hoặc bẻ khóa
- Máy chủ bị tấn công hoặc có lỗ hổng
- Giao tiếp giữa client-server bị nghe lén

### 🧠 Giải pháp đề xuất

ZKAuth sử dụng **Zero-Knowledge Proof** để xác thực mật khẩu mà **không cần gửi hay lưu trữ bất kỳ dạng mật khẩu nào**.  
Quá trình xác minh chỉ dựa vào bằng chứng mật mã do client tạo ra — từ đó:

- Bảo vệ quyền riêng tư tuyệt đối
- Hạn chế tối đa các cuộc tấn công từ phía server hoặc mạng
- Loại bỏ hoàn toàn nhu cầu lưu trữ mật khẩu

### 🛠️ Thành phần kỹ thuật chính

- **Circom**: Thiết kế và biên dịch circuit cho mật khẩu.
- **SnarkJS (PLONK)**: Sinh proof và xác minh proof.
- **ExpressJS**: Server API xác minh proof.
- **HTML + JS thuần**: Giao diện người dùng đơn giản, dễ tương tác.
- **No password/hash storage**: Mỗi lần đăng nhập là một chứng minh mật mã mới (zero-knowledge).

---

## Project Outcomes and Reflections

### ✅ **Project Impact and Benefits**

- Tăng cường đáng kể bảo mật cho các hệ thống xác thực.
- Tránh rò rỉ dữ liệu nhạy cảm từ server.
- Làm tiền đề cho các hệ thống xác thực không cần mật khẩu truyền thống.

### 💡 **Notable Insights and Experiences**

- Việc mã hóa mật khẩu dưới dạng field elements để đưa vào circuit là điểm mấu chốt thú vị.
- Tận dụng `snarkjs.plonk.fullProve()` để sinh proof phía client là một trải nghiệm đặc biệt, giúp client chủ động kiểm soát thông tin.

### ⚠️ **Challenges Faced**

- Tối ưu hóa circuit để không vượt giới hạn chi phí.
- Hiểu rõ quá trình trusted setup và cách sinh zkey, đặc biệt là khi áp dụng PLONK.
- Gặp khó khăn khi chuyển từ `.sh`/`.bat` sang xử lý 100% bằng JS — nhưng đã giải quyết nhờ kiến thức về NodeJS child process & file system.

### 🔍 **Thoughts on Zero-Knowledge Proofs and Their Applications**

ZKP là công nghệ đột phá không chỉ trong lĩnh vực blockchain mà còn trong bảo mật nói chung. Việc xác thực mà không cần tiết lộ dữ liệu thực giúp:

- Tăng quyền riêng tư
- Hạn chế rò rỉ dữ liệu
- Mở ra mô hình “đăng nhập không cần mật khẩu”
- Ứng dụng tiềm năng trong tài chính, y tế, eKYC, voting và metaverse

---

## References

- [Circom Docs](https://docs.circom.io/)
- [SnarkJS GitHub](https://github.com/iden3/snarkjs)
- [Zero-Knowledge University](https://zku.one/)
- [zkPassword example (iden3)](https://github.com/iden3/examples)

---

## Presentation Slide

👉 Slide PDF: https://www.canva.com/design/DAGuiODynuE/zIcfjy7MPW3GFkqbuzelHw/edit?utm_content=DAGuiODynuE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton  

---

## Video Demo

🎥 YouTube: [https://www.youtube.com/watch?v=6KJdHLKjJ1U](https://www.youtube.com/watch?v=6KJdHLKjJ1U)  
🕒 Thời lượng: 37 giây

---

