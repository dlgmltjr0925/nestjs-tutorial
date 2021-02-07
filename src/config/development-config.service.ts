import { ConfigService } from './config.service';

export class DevelopmentConfigService implements ConfigService {
  hostname = 'dev.localhost.com';
}
