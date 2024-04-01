const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const formatPrice = (price: number) => {
  return formatter
    .format(price)
    .replace(/(\.\d*?)0+$/, '$1') //Removes zeros at the end
    .replace(/\.$/, ''); //Removes lone dot at the end;
};
export default formatPrice;
