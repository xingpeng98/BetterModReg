import web3 from './web3';
import ModRegSystem from './ModRegSystem.json';

const instance = new web3.eth.Contract(
    JSON.parse(ModRegSystem.interface),
    "0x2412774fdc5fb0FE3DC5eD73610Cb4a1b2152549"
);

export default instance;