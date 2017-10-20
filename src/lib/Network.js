import { 
    NetworkLine as Line, 
    NetworkRing as Ring, 
    NetworkNode as Node } from './NetworkElement';

export class Network{
    constructor(entry=null){
        this.entry = entry;
    }
}

const ParseNetwork = (network=[], settings={}) => {
    if(!(network instanceof Array))
        network = [network];
    
    let networks = [];
    for(let root of network){
        switch(root.type){
            case 'single':
                return new Node(root);
            case 'ring':
                return new Ring(root);
            case 'line':
                return new Line(root);
            default:
                console.error('Missing or wrong node type');
                return;
        }
    }
};

export {
    ParseNetwork
};