import { Injectable } from '@nestjs/common';
import { Message } from '@sae-nx-workspace/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
