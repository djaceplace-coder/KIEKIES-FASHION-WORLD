export function generateWhatsAppLink(
  title: string,
  sku: string,
  size: string,
  color: string,
  price: string
): string {
  const CONCIERGE_NUMBER = '1234567890'; // Typically injected via process.env
  const message = `Hi Kiekies! I'd like to place an order via the Personal Shopper:\n\n*${title}*\nSKU: ${sku}\nSize: ${size}\nColor: ${color}\nPrice: ${price}\n\nPlease provide payment details and shipping estimates.`;
  
  return `https://wa.me/${CONCIERGE_NUMBER}?text=${encodeURIComponent(message)}`;
}
