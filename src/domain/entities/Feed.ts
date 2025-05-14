export interface FeedProps {
    id?: string;
    source: string;
    url: string;
    title: string;
    content: string;
    author: string;
}

export class Feed {
    
    public readonly id: string;
    public source: string;
    public url: string;
    public title: string;
    public content: string;
    public author: string;

    constructor(props: FeedProps) {
        this.id = props.id || this.generateId();
        this.source = props.source;
        this.url = props.url;
        this.title = props.title;
        this.content = props.content;
        this.author = props.author;
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 15);
    }
    
}
