import bcrypt from 'bcryptjs';

import { sendMail } from '../helpers/sendMail.js';

const authService = {
  hashPassword: (password) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error(error);
    }
  },
  sendResetPasswordLink: (email, expiredTime, link) => {
    try {
      const subject = 'Link thay đổi mật khẩu';
      const html = `
      <div>
        <p>Hạn sử dụng link là <strong>${expiredTime} phút</strong>.</p>
      </div>
      <div style="margin-top:1.5rem;display:flex;justify-content: center;padding: 0.4rem 0;">
        <a
          href=${link}
          style="color:#ffffff;background-color:#2d63c8;font-size:16px;border-radius:8px;padding:1rem 1.5rem;text-decoration: none;box-shadow: 1px 2px #082354;"
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
      <div style="margin-top:1.5rem;display:flex;justify-content: center;padding: 0.4rem 0;">
        <a
          href=${link}
          style="color:#ffffff;background-color:#2d63c8;font-size:16px;border-radius:8px;padding:1rem 1.5rem;text-decoration: none;box-shadow: 1px 2px #082354;"
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
