import { Inter } from "@next/font/google";
import Image from 'next/image';
import HomePng from "assets/home.png";
import about1 from 'assets/about-1.png';
import about2 from 'assets/about-2.png';
import about3 from 'assets/about-3.png';
import blog1 from 'assets/blog 1.png';
import blog2 from 'assets/blog 2.png';
import blog3 from 'assets/blog 3.png';
import pta from 'assets/pta.jpg';
import minh from 'assets/minh.jpg';
import giap from 'assets/giap.jpg';
import trong from 'assets/trong.jpg';
import anh1 from 'assets/anh1.jpg';
import anh2 from 'assets/anh2.jpg';
import anh3 from 'assets/anh3.jpg';



const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <section id="home" className="home">
        <div className="row">
          <div className="images">
          <Image src={HomePng} width={528} height={528} />
          </div>
          <div className="content">
            <h1>
              <span>Luôn </span>bảo mật, <span>Luôn </span>riêng tư
            </h1>
            <p>Lưu trữ hồ sơ bệnh án phi tập trung.</p>
            <a href="#">
              <button className="button">Đọc thêm</button>
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <h1 className="heading">Về cơ sở của các bệnh viện.</h1>
        <ol>
          <li className="title">1.Bệnh viện Bạch Mai</li>
          <li className="title">2.Bệnh viện Hữu Nghị</li>
          <li className="title">3.Bệnh viện E Hà Nội</li>
          <li className="title">4.Bệnh viện Việt-Đức</li>
          <li className="title">5.Bệnh viện Đống Đa</li>
        </ol>

        <div className="box-container">
          <div className="box">
            <div className="images">
            <Image src={about1} width={528} height={528} />
              </div>
            <div className="content">
              <h3>dịch vụ xe cứu thương</h3>
              <p>
                Bản thân công ty đã là một công ty rất thành công. Từ nhu cầu của
                mọi người, anh ấy nhận được trách nhiệm lớn lao từ nỗi đau.
              </p>
              <a href="#">
                <button className="button">Chi tiết</button>
              </a>
            </div>
          </div>

          <div className="box">
            <div className="images">
            <Image src={about2} width={528} height={528} />
            </div>
            <div className="content">
              <h3>phòng cấp cứu</h3>
              <p>
                Bản thân công ty đã là một công ty rất thành công. Từ nhu cầu của
                mọi người, anh ấy nhận được trách nhiệm lớn lao từ nỗi đau.
              </p>
              <a href="#">
                <button className="button">Chi tiết</button>
              </a>
            </div>
          </div>

          <div className="box">
            <div className="images">
            <Image src={about3} width={528} height={528} />
            </div>
            <div className="content">
              <h3>kiểm tra miễn phí</h3>
              <p>
                Bản thân công ty đã là một công ty rất thành công. Từ nhu cầu của
                mọi người, anh ấy nhận được trách nhiệm lớn lao từ nỗi đau.
              </p>
              <a href="#">
                <button className="button">Chi tiết</button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="doctor" className="card" >
        <div className="container" style={{ width: '1440px' }} >
          <h1 className="heading">Đội của chúng tôi</h1>
          <h3 className="title">Chi tiết từng thành viên</h3>

          <div className="box-container">
            <div className="box" >
            <Image src={minh} width={528} height={528} />
              <div className="content">
                <a href="#">
                  <h2>Nguyễn Tuấn Minh</h2>
                </a>
                <div className="icons">
                  <a href="#" className="fab fa-facebook-f"></a>
                  <a href="#" className="fab fa-twitter"></a>
                  <a href="#" className="fab fa-instagram"></a>
                </div>
              </div>
            </div>

            <div className="box">
            <Image src={giap} width={528} height={528} />
              <div className="content">
                <a href="#">
                  <h2>Phạm Văn Giáp</h2>
                </a>
                <div className="icons">
                  <a href="#" className="fab fa-facebook-f"></a>
                  <a href="#" className="fab fa-twitter"></a>
                  <a href="#" className="fab fa-instagram"></a>
                </div>
              </div>
            </div>

            <div className="box">
            <Image src={pta} width={528} height={528} />
              <div className="content">
                <a href="#">
                  <h2>Phùng Thế Anh</h2>
                </a>
                <div className="icons">
                  <a href="#" className="fab fa-facebook-f"></a>
                  <a href="#" className="fab fa-twitter"></a>
                  <a href="#" className="fab fa-instagram"></a>
                </div>
              </div>
            </div>

            <div className="box">
            <Image src={trong} width={528} height={528} />
              <div className="content">
                <a href="#">
                  <h2>Phạm Văn Trọng</h2>
                </a>
                <div className="icons">
                  <a href="#" className="fab fa-facebook-f"></a>
                  <a href="#" className="fab fa-twitter"></a>
                  <a href="#" className="fab fa-instagram"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        style={{
          width: "800px",
          padding: "20px",
          justifyContent: "center",
          margin: "0 auto",
          boxShadow: "0 0 10px rgba(76, 175, 80, 0.5)",
          borderRadius: "15px",
        }}
      >
        <h1 style={{ justifyContent: "center",fontSize:"30px" }}>Đánh giá của bạn</h1>
        <h3 style={{ marginBottom: "15px", marginTop: "10px",fontSize:"15px" }}>
          Chúng tôi rất mong nhận được ý kiến đóng góp từ bạn để cải thiện dịch vụ tốt hơn.
        </h3>

        <form action="/submit-feedback" method="POST">
          <label htmlFor="name">Họ và Tên:</label>
          <br />
          <input type="text" id="name" name="name" placeholder="Nhập họ và tên của bạn" required />
          <br />
          <br />

          <label htmlFor="email">Email:</label>
          <br />
          <input type="email" id="email" name="email" placeholder="Nhập email của bạn" required />
          <br />
          <br />

          <label htmlFor="phone">Số điện thoại:</label>
          <br />
          <input type="tel" id="phone" name="phone" placeholder="Nhập số điện thoại của bạn" />
          <br />
          <br />

          <label htmlFor="comments">Ý kiến đóng góp:</label>
          <br />
          <textarea id="comments" name="comments" rows="5" placeholder="Viết đánh giá của bạn tại đây" required />
          <br />
          <br />

          <button type="submit" style={{ background: 'green' }}>Gửi đánh giá</button>

        </form>
      </div>

      <section id="review" className="review">
        <h1 className="heading">đánh giá của bệnh nhân chúng tôi</h1>
        <h3 className="title">những đánh giá</h3>

        <div className="box-container">
          <div className="box">
            <i className="fas fa-quote-left"></i>
            <p>
            "Blockchain giúp việc chia sẻ thông tin y tế giữa các bệnh viện nhanh chóng và an toàn hơn. Tôi đã từng phải chuyển viện và thấy quá trình này được thực hiện dễ dàng hơn nhờ công nghệ này."
            </p>

            <div className="images">
            <Image src={anh1} width={528} height={528} />

              <div className="info">
                <h3>Lê Minh Tuấn</h3>
                <span>Ngày : 20/11/2024</span>
              </div>
            </div>
          </div>

          <div className="box">
            <i className="fas fa-quote-left"></i>
            <p>
            "Tôi rất hài lòng với hệ thống này. Hồ sơ y tế của tôi luôn được cập nhật chính xác và không có sai sót. Blockchain giúp tôi yên tâm vì thông tin của mình không bị giả mạo hay chỉnh sửa."
            </p>

            <div className="images">
            <Image src={anh2} width={528} height={528} />

              <div className="info">
                <h3>Nguyễn Văn Hưng</h3>
                <span>Ngày : 26/12/2024</span>
              </div>
            </div>
          </div>

          <div className="box">
            <i className="fas fa-quote-left"></i>
            <p>
            "Tôi cảm thấy an tâm hơn khi biết rằng hồ sơ y tế của mình được bảo mật qua công nghệ Blockchain. Mọi thông tin đều được lưu trữ an toàn và không thể bị thay đổi, giúp tôi tin tưởng hơn vào chất lượng dịch vụ."
            </p>

            <div className="images">
            <Image src={anh3} width={528} height={528} />

              <div className="info">
                <h3>Nguyễn Minh Khôi</h3>
                <span>Ngày : 5/12/2024</span>
              </div>
            </div>
          </div>

        </div>
      </section>
      <section id="blog" className="blog">
        <h3 className="title">Sự kiện đề xuất</h3>

        <div className="box-container">
          <div className="box">
          <Image src={blog1} width={528} height={528} />
            <div className="content">
              <a href="#">
                <h2>Tiểu đường</h2>
              </a>
              <p>
                "Bệnh viện cam kết cung cấp giải pháp toàn diện cho bệnh tiểu
                đường thông qua các chương trình điều trị cá nhân hóa, bao gồm
                quản lý chế độ ăn uống, hoạt động thể chất, theo dõi đường
                huyết và điều trị bằng thuốc, nhằm giúp bệnh nhân kiểm soát bệnh
                tật hiệu quả và cải thiện chất lượng cuộc sống."
              </p>
              <a href="#">
                <button className="button">Chi tiết</button>
              </a>
            </div>
          </div>

          <div className="box">
          <Image src={blog2} width={528} height={528} />
            <div className="content">
              <a href="#">
                <h2>COVID-19 vaccine</h2>
              </a>
              <p>
                “Chúng tôi khuyến khích tất cả mọi người tiêm vaccine COVID-19
                để bảo vệ sức khỏe cộng đồng và ngăn ngừa sự lây lan của virus,
                đồng thời cung cấp các dịch vụ tiêm chủng an toàn và hiệu quả
                tại bệnh viện của chúng tôi.”
              </p>
              <a href="#">
                <button className="button">Chi tiết</button>
              </a>
            </div>
          </div>

          <div className="box">
          <Image src={blog3} width={528} height={528} />
            <div className="content">
              <a href="#">
                <h2>Phòng ngừa bệnh</h2>
              </a>
              <p>
                "Để phòng ngừa bệnh tật, bệnh viện chúng tôi cam kết cung cấp các
                chương trình kiểm tra sức khỏe định kỳ, tư vấn dinh dưỡng và
                hướng dẫn lối sống lành mạnh, nhằm giúp cộng đồng phát hiện sớm
                nguy cơ và duy trì sức khỏe tốt nhất."
              </p>
              <a href="#">
                <button className="button">Chi tiết</button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="footer">
        <div className="box">
          <h2 className="logo">
            <span>Quay </span>lại đầu trang
          </h2>
          <a href="#">Home</a>
        </div>

        <h1 className="credit">
          Được tạo bởi <span>MedicRec.</span> Nhằm hỗ trợ bệnh viện lưu trữ hồ
          sơ bệnh án phi tập trung.
        </h1>
      </section>
    </div>
  );
}