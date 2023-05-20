import { Injectable } from "@angular/core";
import { Subject } from 'rxjs'
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators'
import { Post } from "./post.model";

@Injectable({providedIn :'root'})
export class PostsService {
    private posts :Post[]=[];
    private postsUpdated = new Subject<Post[]>() 

    constructor(private http: HttpClient){}
    
    getPosts() {
        this.http.get<{message:string,posts: any}>("http://localhost:3000/posts")
            .pipe(map((postData)=>{
                return postData.posts.map((post: any)=>{
                    return {
                        id: post._id,
                        title: post.title,
                        content: post.content
                    }
                })
            }))
            .subscribe((transformedPosts)=>{
                this.posts=transformedPosts;
                this.postsUpdated.next([...this.posts]);
            });
    }
    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const post :Post = {
            id: "1234",
            title: title,
            content: content
        }
        this.http.post<{message:string}>("http://localhost:3000/posts",post)
            .subscribe((data)=>{
                console.log(data.message);
                this.posts.push(post)
                this.postsUpdated.next([...this.posts]);
            });
        
    }
}