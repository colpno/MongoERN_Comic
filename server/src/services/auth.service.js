import bcrypt from 'bcryptjs';

import { sendMail } from '../helpers/sendMail.js';

const authService = {
  hashPassword: (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  },
  sendResetPasswordLink: (email, expiredTime, link) => {
    try {
      const subject = 'Link thay đổi mật khẩu';
      const html = `
      <div>
        <p>Hạn sử dụng link là <strong>${expiredTime} phút</strong>.</p>
      </div>
      <div style="padding: 1.5rem; backgroundColor: #ededed; margin-top: 3rem">
        <a
          href=${link}
          style="
            color: #ffffff;
            backgroundColor: #2d63c8;
            fontSize: 19px;
            border: 1px solid #2d63c8;
            borderRadius: 4px;
            padding: 15px 50px;
            cursor: pointer
          "
        >
          Thay đổi mật khẩu
        </a>
      </div>
    `;

      sendMail(email, subject, html);
    } catch (error) {
      throw new Error(error);
    }
  },
  sendActiveAccountLink: (email, expiredTime, link) => {
    try {
      const subject = 'Link xác thực tài khoản';
      const html = `
      <div>
        <p>Hạn sử dụng link là <strong>${expiredTime} phút</strong>.</p>
      </div>
      <div style="padding: 1.5rem; backgroundColor: #ededed; margin-top: 3rem">
        <a
          href=${link}
          style="
            color: #ffffff;
            backgroundColor: #2d63c8;
            fontSize: 19px;
            border: 1px solid #2d63c8;
            borderRadius: 4px;
            padding: 15px 50px;
            cursor: pointer
          "
        >
          Xác thực tài khoản
        </a>
      </div>
    `;

      sendMail(email, subject, html);
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default authService;
