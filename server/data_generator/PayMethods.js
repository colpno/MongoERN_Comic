const randomPayMethods = () => {
  return [
    { id: '1', label: 'Thanh toán bằng Ví ZaloPay', system: 'Zalo' },
    { id: '2', label: 'Thanh toán bằng Ví MoMo', system: 'Momo' },
    {
      id: '3',
      label: 'Thẻ ATM nội địa / Internet banking (qua cổng ZaloPay)',
      system: 'ATM',
    },
    { id: '4', label: 'Thanh toán bằng SMS', system: 'SMS' },
  ];
};

export default randomPayMethods;
