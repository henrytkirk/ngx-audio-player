import { ViewChild, ElementRef } from "@angular/core";
import { MatSlider } from "@angular/material";

export class BaseAudioPlayerFunctions {

    @ViewChild('audioPlayer') player: ElementRef;
    timeLineDuration: MatSlider;

    loaderDisplay: boolean = false;
    isPlaying: boolean = false;
    currentTime: number = 0;
    duration: number = 0.01;
    
    currTimePosChanged(event) {
        this.player.nativeElement.currentTime = event.value;
    }

    bindPlayerEvent(): void {
        this.player.nativeElement.addEventListener('playing', () => {
            this.isPlaying = true;
            this.duration = Math.floor(this.player.nativeElement.duration);
        });
        this.player.nativeElement.addEventListener('pause', () => {
            this.isPlaying = false;
        });
        this.player.nativeElement.addEventListener('timeupdate', () => {
            this.currentTime = Math.floor(this.player.nativeElement.currentTime);
        });
        this.player.nativeElement.addEventListener('loadstart', () => {
            this.loaderDisplay = true;
        });
        this.player.nativeElement.addEventListener('loadeddata', () => {
            this.loaderDisplay = false;
            this.duration = Math.floor(this.player.nativeElement.duration);
        });
    };

    playBtnHandler(): void {
        if(this.loaderDisplay) {
            return;
        }
        if (this.player.nativeElement.paused) {
            this.player.nativeElement.play(this.currentTime);
        } else {
            this.currentTime = this.player.nativeElement.currentTime;
            this.player.nativeElement.pause();
        }
    };

    play(): void {
        setTimeout(() => {
            this.player.nativeElement.play();
        }, 0);
    };

}