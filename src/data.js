
export const PRODUCTS = [
  {
    id: 1,
    name: "One8 Seam XVIII Signature",
    description: "First-ever cricket-inspired lifestyle sneaker. Co-created with Virat Kohli, with a surprise from him inside the box.",
    price: 9230,
    image: "https://one8.com/cdn/shop/files/V10018401_03_584334b3-39d7-4b9f-a406-06513a16829b.jpg?v=1781598069&width=769"
  },
  {
    id: 2,
    name: "One8 Seam Pavilion",
    description: "A laceless, cricket-inspired sneaker with a clean silhouette. Designed for effortless, everyday style.​",
    price: 6999,
    image: "https://one8.com/cdn/shop/files/V10021003_03_38cbc9a3-5956-4b91-9365-ab5434e90e96.jpg?v=1781598580&width=769"
  },
];

export const formatPrice = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};
