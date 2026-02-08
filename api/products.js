export default function handler(req, res) {
  const products = [
    { name: "Tarot Consult", price: "$45", link: "https://buy.stripe.com/4gMcN5bAo6Lg7ba7aIgnK02" },
    { name: "Tarot and Numerology Consult", price: "$55", link: "https://buy.stripe.com/14A3cv8oc4D8brqbqYgnK01" }
  ];
  res.status(200).json(products);
}
