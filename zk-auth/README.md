# zk-auth

Enter the name of your project above and provide a brief description of your project including what is the impact for the ecosystem or society.

## Team Information
**Group:** [8]

**Members**

- Name: {Lê Bá Hiếu}
  - Discord Username: {lbhieu89}
  - Github Username: {LBHieu}
  - Role: {Leader}

- Name: {Trần Trương Nhật Huy}
  - Discord Username: {nhath026}
  - Github Username: {nhath026}
  - Role: {Member}

## Technical Report

Vấn đề thực tế
Trong hệ thống xác thực truyền thống, người dùng buộc phải cung cấp thông tin nhạy cảm như email, số điện thoại, hoặc mật khẩu để đăng nhập và đăng ký. Điều này tạo ra các rủi ro nghiêm trọng như:
- Rò rỉ dữ liệu người dùng do bị tấn công
- Các cuộc tấn công phishing, xác thực giả mạo
- Vi phạm quyền riêng tư, đặc biệt trong ứng dụng blockchain/web3

Động lực & giới hạn giải pháp hiện tại
- Động lực: Tạo một hệ thống xác thực phi tập trung, không cần chia sẻ thông tin cá nhân, vẫn đảm bảo tính hợp lệ.
- Giới hạn của giải pháp hiện tại: OAuth, OTP hay JWT đều dựa vào sự tin tưởng vào bên thứ ba và lưu trữ trạng thái người dùng, gây lộ thông tin khi bị xâm nhập.

Giải pháp đề xuất — ZKAuth
Hệ thống ZKAuth cho phép người dùng chứng minh danh tính mà không cần tiết lộ dữ liệu cá nhân, nhờ vào công nghệ Zero-Knowledge Proof (ZKP). Quy trình chính:
- Người dùng tạo bằng chứng ZKP trên điện thoại (qua app)
- Gửi bằng chứng này cho backend qua QR/code link
- Backend xác minh bằng chứng (không cần biết thông tin cá nhân)
- Nếu hợp lệ → cấp quyền truy cập

Thành phần kỹ thuật & công nghệ sử dụng
| Thành phần | Công nghệ sử dụng | 
| Frontend | Next.js, Tailwind CSS | 
| Backend | Node.js + Express, go-iden3-auth | 
| ZKP Circuit | Circom, SnarkJS, Groth16 | 
| Database | MongoDB Atlas | 

## Project Outcomes and Reflections

- **Bảo mật cao**: Không cần lưu thông tin nhạy cảm như email hay số điện thoại.
- **Riêng tư tuyệt đối**: Người dùng kiểm soát danh tính của mình.
- Việc tạo và debug circuit bằng Circom là thách thức nhưng rất trực quan nếu hiểu luồng logic.
- Ngạc nhiên khi hệ thống vẫn cho phép xác thực mà không cần lưu bất kỳ thông tin thật nào.

- Làm chủ Circom syntax và quy trình setup-trusted trong ZKP khá phức tạp.
- Khó khăn khi kết nối giữa frontend ↔ QR ↔ mobile ↔ backend.
- Xử lý các lỗi khi verify ZKP trong backend (Groth16 yêu cầu setup cẩn thận).

- Sử dụng repo mẫu, tham khảo tài liệu từ Iden3 & Polygon.
- Test mỗi phần riêng biệt trước khi tích hợp.


## References

- [Iden3 Documentation](https://iden3-docs.readthedocs.io/en/latest/)
- [Circom Guide](https://docs.circom.io/)
- [Plonk](https://zkplabs.network/blog/Introduce-PLONK-Revolutionizing-ZK-SNARK-Technology-for-Efficiency-and-Privacy)

## Presentaion Slide
[ZKA_Group8](https://www.canva.com/design/DAGum_sHdH4/bLmtpLjg4mW0gjYubAHUiQ/edit?utm_content=DAGum_sHdH4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## Video Demo 

[ZKA_Group8_video](https://drive.google.com/drive/folders/1P_D-b-FUp3VEbzKnxhCrb0UpFcryNmxH?usp=sharing)