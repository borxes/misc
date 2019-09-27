const axios = require('axios');
const keys = require('../config/keys');

const MAX_TXS = 3;

async function getPrice() {
  const priceData = await axios.get(
    `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${keys.etherscanKey}`
  );

  return priceData.data.result.ethusd;
}

async function getBalance(address) {
  const balanceData = await axios.get(
    'https://api.etherscan.io/api?module=account&action=balance&' +
      `address=${address}&tag=latest&apikey=${keys.etherscanKey}`
  );
  return balanceData.data.result;
}

async function getTxs(address) {
  const request =
    'https://api.etherscan.io/api?module=account&action=txlist' +
    `&address=${address}&startblock=0&endblock=9999999` +
    `&page=1&offset=${MAX_TXS}&sort=desc&apikey=${keys.etherscanKey}`;
  const txsData = await axios.get(request);
  return txsData.data.result;
}

module.exports = async app => {
  app.get('/walletinfo/:address?', async (req, res) => {
    if (req.params.address) {
      const response = {};
      response.price = await getPrice();
      response.balance = (await getBalance(req.params.address)) / 1e18;
      response.usdBalance = response.balance * response.price;
      response.txs = await getTxs(req.params.address);
      const status = response.balance ? 'OK' : 'Error';
      res.send({ status, result: response });
    } else res.send('Please supply wallet address.');
  });
};
