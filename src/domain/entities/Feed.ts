export interface FeedProps {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    source: string;
    url: string;
    title: string;
    content: string;
    author: string;
    weight?: number;
}

export class Feed {
    
    public readonly id: string;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public source: string;
    public url: string;
    public title: string;
    public content: string;
    public author: string;
    public weight: number;

    private constructor(props: FeedProps) {
        this.id = props.id || Feed.generateId();
        this.source = props.source;
        this.url = props.url;
        this.title = props.title;
        this.content = props.content;
        this.author = props.author;
        this.weight = props.weight || 0;
    }

    private static generateId(): string {
        return Math.random().toString(36).substring(2, 15);
    }

    public static create(props: FeedProps): Feed {
        return new Feed({
            id: props.id,
            createdAt: props.createdAt,
            updatedAt: props.updatedAt,
            source: props.source!,
            url: props.url!,
            title: props.title!,
            content: props.content!,
            author: props.author!,
            weight: props.weight,
        });
    }

    public toPlainObject(): FeedProps {
        return {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            source: this.source,
            url: this.url,
            title: this.title,
            content: this.content,
            author: this.author,
            weight: this.weight,
        };
    }
    
}
