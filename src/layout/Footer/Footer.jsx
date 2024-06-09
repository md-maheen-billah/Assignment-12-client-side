import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import "../Footer/footer.css";
const Footer = () => {
  return (
    <div>
      <footer className="footer foote mt-6 footer-center p-4 bg-reddM text-whiteM">
        <aside>
          <h2 className="text-center text-2xl font-bold mt-2 mb-2">
            Destined <span className="text-blackM">Affinity</span>{" "}
          </h2>
          <p className="mb-2">
            Contact Information - md.maheen.billah.97@gmail.com
          </p>
          <p>Copyright © 2024 - All right reserved by Md. Maheen Billah</p>
          <div className="text-xl mt-6 mb-2 flex items-center justify-center gap-4">
            <a href="https://www.facebook.com/md.maheen.billah.97/">
              <FaFacebook />
            </a>
            <a href="https://www.linkedin.com/in/md-maheen-billah/">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/md.maheen.billah">
              <FaInstagram />
            </a>
          </div>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
