export class Event{
    public color: string; 
    constructor(public id_agent, public id_site, public debut: string, public fin: string){
        this.color = this.getRandomColor(); 
    }
    getRandomColor() {
        let color = Math.floor(0x1000000 * Math.random()).toString(16);
        return '#' + ('000000' + color).slice(-6);
    }

}