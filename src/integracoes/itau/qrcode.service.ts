import { Injectable, Logger } from '@nestjs/common';
import { RequestRouterService } from './request.service'; // Corrigido

@Injectable()
export class QrcodeCobService {
    private readonly logger = new Logger(QrcodeCobService.name);

    constructor(
        private readonly itauService: RequestRouterService, // Corrigido nome e tipo
    ) { }

    async qrcode(txid: string): Promise<any> {
        try {
            return await this.itauService.get(`/cobv/${txid}/qrcode`);
        } catch (error) {
            this.handleRequestError(error);
        }
    }

    async emitQrcodeCobv(txid: string, data: any): Promise<any> {
        try {
            return await this.itauService.put(`/cobv/${txid}`, data);
        } catch (error) {
            this.handleRequestError(error);
        }
    }


    async getQrcodeCobv(txid: string): Promise<any> {
        try {
            return await this.itauService.get(`/cobv/${txid}`);
        } catch (error) {
            this.handleRequestError(error);
        }
    }

    async qrcodeCobv(): Promise<any> {
        try {
            return await this.itauService.get(`/cobv`);
        } catch (error) {
            this.handleRequestError(error);
        }
    }

    private handleRequestError(error: any): never {
        if (error.response && error.response.data) {
            throw new Error(JSON.stringify(error.response.data));
        }
        throw error;
    }
}
