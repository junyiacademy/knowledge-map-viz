class NetworkComponent{
    constructor(attr=null){
        this.id = attr.id;
        
        let { children, member, type,  ...remainAttr } = attr;
        this.attr = remainAttr;
        this.type = type;

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

export {
    NetworkComponent as Component
};