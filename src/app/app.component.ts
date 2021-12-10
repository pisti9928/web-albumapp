import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Album } from './album';
import { AlbumService } from './album.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public albums: Album[] = [];
  public editAlbum: Album;
  public deleteAlbum: Album;

  constructor(private albumService: AlbumService){ }

  ngOnInit(){
    this.getAlbums();
  }

  public getAlbums(): void{
    this.albumService.getAlbums().subscribe(
      (response: Album[]) => {
        this.albums = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddAlbum(addForm: NgForm): void{
    document.getElementById('add-album-form')?.click();
    this.albumService.addAlbum(addForm.value).subscribe(
      (response: Album) => {
        console.log(response);
        this.getAlbums();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onUpdateAlbum(album: Album): void{
    this.albumService.updateAlbum(album).subscribe(
      (response: Album) => {
        console.log(response);
        this.getAlbums();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteAlbum(albumId: number): void {
    this.albumService.deleteAlbum(albumId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAlbums();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

public searchAlbums(key: string): void {
  console.log(key);
  if(!key){
    this.getAlbums();
  }
  else{
    const results: Album[] = [];
    for (const album of this.albums) {
      if(album.artist.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      album.title.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      album.releaseDate.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      album.genre.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      album.rating.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(album);
      }  
    }
    this.albums = results;
  }
}

  public onOpenModalAdd(): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addAlbumModal');
    container?.appendChild(button);
    button.click();
  }

  public onOpenModal(album: Album , mode: string) : void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit'){
      this.editAlbum = album;
      button.setAttribute('data-target', '#updateAlbumModal');
    }
    else if (mode === 'delete'){
      this.deleteAlbum = album;
      button.setAttribute('data-target', '#deleteAlbumModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
