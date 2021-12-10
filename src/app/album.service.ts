import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Album } from "./album";

@Injectable({
    providedIn: 'root'
})
export class AlbumService{
    private apiServerUrl =  environment.apiBaseUrl;
    
    constructor(private http: HttpClient){ }

    public getAlbums(): Observable<Album[]>{
        return this.http.get<any>(`${this.apiServerUrl}/album/all`);
    }

    public addAlbum(album: Album): Observable<Album>{
        return this.http.post<any>(`${this.apiServerUrl}/album/add`, album);
    }

    public updateAlbum(album: Album): Observable<Album>{
        return this.http.put<any>(`${this.apiServerUrl}/album/update`, album);
    }

    public deleteAlbum(albumId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/album/delete/${albumId}`);
    }
}