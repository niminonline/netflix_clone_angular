import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { Movie } from 'src/app/model/movie';
import { environment } from 'src/environments/environment';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent {
  constructor(private dataService: DataService, private sanitizer:DomSanitizer) {}
  customMovie!:any;
  nowPlayingMovies!: Movie;
  popularMovies!: Movie;
  topRatedMovies!: Movie;
  upcomingMovies!: Movie;
  key!:string;
  videoLink!:string;
  sanitizedUrl!:SafeResourceUrl;


  ngOnInit() {
    this.getCustomMovie();
    this.getNowPlayingMovies();
    this.getPopularMovies();
    this.getTopRatedMovies();
    this.getUpcomingMovies();
  }

  getCustomMovie(){
    this.dataService.getUpcomingMovies().subscribe((res:any)=>{
      
      res=this.modifyData(res);
      this.customMovie= res.results[Math.round(Math.random()*res.results.length)];
      // console.log(this.customMovie.backdrop_path);
      

    },(err)=>(
      console.log('Unable to fetch latest movie',err)))

  }

  changeData(res:any):any{

    return (Math.round(Math.random()*res.results.length))
    if(!res.backdrop_path&& !res.poster_path){
      res.backdrop_path=null;
    }
 
    else if (!res.backdrop_path){
      res.backdrop_path= 'https://image.tmdb.org/t/p/original' +
      res.poster_path +
      '?api_key=' +
      environment.tmdb_api_key;
    }
    // else{
    //   res.backdrop_path= res.backdrop_path +
    //   '?api_key=' +
    //   environment.tmdb_api_key;
    // }
    return res;

  }

  getNowPlayingMovies() {
    this.dataService.getNowPlayingMovies().subscribe(
      (res: Movie) => {
        this.nowPlayingMovies = this.modifyData(res);
        
      },
      (err) => console.log('Unable to fetch now playing movies', err)
    );
  }

  getPopularMovies() {
    this.dataService.getPopularMovies().subscribe(
      (res: Movie) => {
        this.popularMovies = this.modifyData(res);
      },
      (err) => console.log('Unable  to fetch popular movies', err)
    );
  }

  getTopRatedMovies() {
    this.dataService.getTopRatedMovies().subscribe(
      (res: Movie) => {
        this.topRatedMovies = this.modifyData(res);
      },
      (err) => console.log('Unable  to fetch top rated movies', err)
    );
  }

  getUpcomingMovies() {
    this.dataService.getUpcomingMovies().subscribe(
      (res: Movie) => {
        this.upcomingMovies = this.modifyData(res);
      },
      (err) => console.log('Unable  to fetch upcoming movies', err)
    );
  }

  modifyData(movies: Movie): Movie {
    if (movies.results) {
      movies.results.map((item) => {
        item.backdrop_path =
          'https://image.tmdb.org/t/p/original' +
          item.backdrop_path +
          '?api_key=' +
          environment.tmdb_api_key;

        if (!item.title) {
          item.title = item?.name;
        }
      });
    }
    return movies;
  }
  
  launchVideo(id:number){
    this.dataService.getVideoLink(id).subscribe(res=>{
      this.key= res.results[0].key
      // this.key= res.results[Math.round(Math.random()*res.results.length)].key
      this.videoLink= `https://www.youtube.com/watch?v=${this.key}`
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoLink);
    // console.log(this.sanitizedUrl);
    window.open(this.videoLink.toString(), '_blank');
  })
  }

    
  
}
