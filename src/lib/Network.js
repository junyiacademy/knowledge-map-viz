import { NetworkLine, NetworkRing, NetworkNode } from './NetworkElement';

export class Network{
    constructor(entry=null){
        this.entry = entry;
    }
}

const ParseNetwork = (network) => {
    if(!(network instanceof Array))
        network = [network];
    
    let networks = [];
    for(let root of network){
        switch(root.type){
            case 'single':
                return new NetworkNode(root);
            case 'ring':
                return new NetworkRing(root);
            case 'line':
                return new NetworkLine(root);
            default:
                console.error('Missing or wrong node type');
                return;
        }
    }
};

export {
    ParseNetwork
};