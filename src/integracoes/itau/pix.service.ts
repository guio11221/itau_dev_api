import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PixService {
    constructor(private readonly http: HttpService) {
        
    }
}
