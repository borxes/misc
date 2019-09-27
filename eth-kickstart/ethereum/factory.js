import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x769861d63C25A897A907f1FEecEa603cA4f8116C'
);

export default instance;
