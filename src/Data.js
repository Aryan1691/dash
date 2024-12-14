const items = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `Product ${String.fromCharCode(65 + (index % 26))}${index + 1}`, // Product names like Product A1, B2, etc.
  likes: Math.floor(Math.random() * 1000) + 100, // Random likes between 100-1100
  shares: Math.floor(Math.random() * 500) + 50,  // Random shares between 50-550
  comments: Math.floor(Math.random() * 800) + 100, // Random comments between 100-900
  followers: Math.floor(Math.random() * 20000) + 5000, // Random followers between 5000-25000
  category: ["Tech", "Health", "Fashion", "Education", "Entertainment"][
    Math.floor(Math.random() * 5)
  ], // Random category
  location: [
    "USA",
    "India",
    "UK",
    "Germany",
    "Canada",
    "Australia",
    "France",
    "Japan",
    "China",
    "Brazil",
  ][Math.floor(Math.random() * 10)], // Random location
}));

export default items;
