class Component{
    constructor(id=null){
        this.id = id;
        this.member = [];
        this.children = [];
        Object.setPrototypeOf({setNetworkData: this.setNetworkData}, this);
    }

    setNetworkData(node){
        if(this.networkNodes)
            node.networkNodes.push(...this.networkNodes);
        this.networkNodes = node.networkNodes;
        this.networkEdges = node.networkEdges;

        this.setNetworkData = (node) => {
            node.networkNodes = this.networkNodes.push(...node.networkNodes);
            node.networkEdges = this.networkEdges.push(...node.networkEdges);
        };
    }
}

export class NetworkLine extends Component{
    constructor(attr){
        super(attr.id);
        this.attr = attr;

        for(let n of attr.member){
            let node = 'ring' == n.type ? 
                new NetworkRing(n) : 'line' == n.type ?
                new NetworkLine(n) : new NetworkNode(n);
            this.setNetworkData(node);

            if(0 != this.member.length)
                this.networkEdges.push({from: this.member.slice(-1)[0].id, to: node.id});
            this.member.push(node);
        }
    }
}

export class NetworkRing extends Component{
    constructor(attr){
        super(attr.id);
        
        this.attr = attr;
        for(let n of attr.member){
            let node = 'ring' == n.type ? 
                new NetworkRing(n) : 'line' == n.type ?
                new NetworkLine(n) : new NetworkNode(n);
            this.member.push(node);
            this.setNetworkData(node);
        }
        
        this.member.map((n, i) => {
            this.networkEdges.push({
                from: n.id,
                to: (i == this.member.length-1) ? 
                    this.member[0].id : this.member[i+1].id
            });
        });
    }
}

export default class NetworkNode extends Component{
    constructor(attr){
        super(attr.id);
        
        this.attr = attr;
        this.networkNodes = [Object.assign(attr, {label: attr.id})];
        this.networkEdges = [];
        
        if(attr.children && attr.children.length > 0){
            for(let n of attr.children){
                let node = 'single' == n.type ? 
                    new NetworkNode(n) : 'line' == n.type ?
                    new NetworkLine(n) : new NetworkRing(n);
                
                this.setNetworkData(node);
                this.children.push(node);
                if(node instanceof NetworkLine || node instanceof NetworkRing){
                    if(node.member && node.member.length > 0)
                        this.networkEdges.push({from: this.id, to: node.member[0].id});
                }
                else
                    this.networkEdges.push({from: this.id, to: n.id});
            }
            
        }
        
    }

}
