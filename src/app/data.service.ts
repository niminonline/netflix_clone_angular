import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Movie } from './model/movie';
import { VideoList } from './model/video-list';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  url='https://api.themoviedb.org/3/movie/';


  getLatestMovie():Observable<any>{
     return this.http.get<any>(this.url+'latest?api_key='+environment.tmdb_api_key)
  }

  getNowPlayingMovies():Observable<Movie>{
    return this.http.get<Movie>(this.url+'now_playing?api_key='+environment.tmdb_api_key);
  }
  getPopularMovies():Observable<Movie>{
    return this.http.get<Movie>(this.url+'popular?api_key='+environment.tmdb_api_key);
  }

  getTopRatedMovies():Observable<Movie>{
    return this.http.get<Movie>(this.url+'top_rated?api_key='+environment.tmdb_api_key);
  }

  getUpcomingMovies():Observable<Movie>{
    return this.http.get<Movie>(this.url+'upcoming?api_key='+environment.tmdb_api_key);
  }

    getVideoLink(id:number):Observable<VideoList>{
      return this.http.get<VideoList>(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=9edb12972d8ec4affdcb8c3fb41eb40a`)
    } 

}
