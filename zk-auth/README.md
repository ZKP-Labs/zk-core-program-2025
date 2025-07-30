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

- **Project Impact and Benefits** : Reflect on the key benefits and outcomes of the project. 
- **Notable Insights and Experiences** : Share the most interesting or surprising discoveries you made while working on the project. 
- **Challenges Faced** : Discuss the main difficulties encountered during the project. How did you overcome them, and what did you learn from those experiences?
- **Thoughts on Zero-Knowledge Proofs and Their Applications** : Provide your perspective on ZKPs — what you found compelling, challenging, or promising. Comment on their practical use cases and potential impact in fields such as privacy, blockchain, or secure computation.

## References

Standby

## Presentaion Slide
[ZKA_Group8](https://www.canva.com/design/DAGum_sHdH4/bLmtpLjg4mW0gjYubAHUiQ/edit?utm_content=DAGum_sHdH4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## Video Demo 

[ZKA_Group8_video](https://drive.google.com/drive/folders/1P_D-b-FUp3VEbzKnxhCrb0UpFcryNmxH?usp=sharing)