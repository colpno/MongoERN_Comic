export default function logout(req, res) {
  res
    .clearCookie('accessToken', {
      secure: true,
      sameSite: 'none',
    })
    .status(200)
    .json({ message: 'Đăng xuất thành công' });
}
