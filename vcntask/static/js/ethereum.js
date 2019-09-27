/* global Web3 */
/* global axios */

// const ffTest = '0xF398a69957b41cc0371DaC347D6Ad6E1E5AD5B8e';

// utility functions

const trunc = str => {
  return str.slice(0, 16) + '...';
};

const clearTxTable = () => {
  const txsTable = document.getElementById('lastTxs');
  let tableHeaderRowCount = 1;
  let rowCount = txsTable.rows.length;
  for (let i = tableHeaderRowCount; i < rowCount; i++) {
    txsTable.deleteRow(tableHeaderRowCount);
  }
};

const getWeb3Provider = () => {
  return typeof window.ethereum !== 'undefined' ? window.ethereum : null;
};

// button click handlers

document.getElementById('addrSubmit').onclick = () => {
  const walletAddress = document.getElementById('walletAddress').value;
  const walletData = document.getElementById('walletData');
  const txsTable = document.getElementById('lastTxs');
  const walletWarning = document.getElementById('walletDataWarning');
  clearTxTable();
  txsTable.style.display = 'none';
  walletData.style.display = 'none';
  walletWarning.style.display = 'none';
  console.log(`checking wallet ${walletAddress}`);
  axios.get(`/walletinfo/${walletAddress}`).then(response => {
    if (response.data.status == 'OK') {
      console.log(response.data.result.txs);
      walletData.style.display = 'block';
      txsTable.style.display = 'block';
      document.getElementById(
        'walletBalance'
      ).innerHTML = response.data.result.balance.toString().slice(0, 5);
      document.getElementById('usdBalance').innerHTML =
        '$' + response.data.result.usdBalance.toString().slice(0, 5);
      const txs = response.data.result.txs;
      txs.forEach(tx => {
        let newRow = txsTable.insertRow();
        newRow.innerHTML =
          `<td>${trunc(tx.hash)}</td><td>${tx.blockNumber}</td><td>${
            tx.timeStamp
          }` +
          `<td>${trunc(tx.from)}</td><td>${trunc(tx.to)}</td><td>${tx.value /
            1e18}</td>`;
      });
    } else {
      walletWarning.style.display = 'block';
    }
  });
};

document.getElementById('transferSubmitBtn').onclick = async () => {
  const toAddress = document.getElementById('toAddress').value;
  const amount = document.getElementById('ethAmount').value;
  const message = document.getElementById('transferResult');

  const web3Provider = getWeb3Provider();
  if (!web3Provider) {
    message.innerHTML = 'Metamask not detected';
    message.style.display = 'block';
    return;
  }

  message.style.display = 'none';
  console.log(`transferring ${amount} to ${toAddress}`);

  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      let accounts = await window.web3.eth.getAccounts();
      let transaction = {
        from: accounts[0],
        to: toAddress,
        value: window.web3.utils.toWei(amount, 'ether'),
      };
      window.web3.eth.sendTransaction(transaction, (error, res) => {
        message.style.display = 'block';
        if (error) {
          message.innerHTML = `Transaction error : ${error}`;
        } else {
          message.innerHTML = `Transaction sent. Hash: ${trunc(res)}`;
        }
        document.getElementById('toAddress').value = '';
        document.getElementById('ethAmount').value = '';
      });
    } catch (error) {
      message.innerHTML = `Catch Error: ${error}`;
    }
  }
};
