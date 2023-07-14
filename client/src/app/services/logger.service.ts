import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogLevel } from '../models/LogLevel';

@Injectable({
    providedIn: 'root',
})
export class LoggerService {
    logLevel: LogLevel = new LogLevel();
    url = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    info(msg: string): void {
        this.logWith(this.logLevel.Info, msg);
    }

    warn(msg: string): void {
        this.logWith(this.logLevel.Warn, msg);
    }

    error(msg: string): void {
        this.logWith(this.logLevel.Error, msg);
    }

    private logWith(level: any, msg: string): void {
        if (level <= this.logLevel.Error) {
            switch (level) {
                case this.logLevel.None:
                    return console.log(msg);
                case this.logLevel.Info:
                    this.sendLog(msg, 'info').subscribe();
                    break;
                case this.logLevel.Warn:
                    this.sendLog(msg, 'warn').subscribe();
                    break;
                case this.logLevel.Error:
                    this.sendLog(msg, 'error').subscribe();
                    break;
                case this.logLevel.Debug:
                    this.sendLog(msg, 'debug').subscribe();
                    break;
                default:
                    console.debug(msg);
            }
        }
    }

    sendLog(message: string, level: string): Observable<any> {
        let data = { message: message, level: level };
        console.log(data);

        return this.httpClient.post<any>(this.url + `/api/logs/log`, data, {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        });
    }
}
