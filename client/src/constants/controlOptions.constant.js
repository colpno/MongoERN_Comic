import { emitToast } from "features/Toast.jsx";

export const coinOptions = [
  { value: "1.00", label: "10 coin = $1" },
  { value: "2.00", label: "20 coin = $2" },
  { value: "5.00", label: "50 coin = $5" },
  { value: "10.00", label: "100 coin = $10" },
  { value: "20.00", label: "200 coin = $20" },
];

export const dollarToCoin = (dollar = "") => {
  try {
    const optionLabel = coinOptions.find((option) => option.value === dollar).label;
    const coin = Number.parseInt(optionLabel.split(" ")[0], 10);
    return coin;
  } catch (error) {
    emitToast(error, "error");
    return undefined;
  }
};
