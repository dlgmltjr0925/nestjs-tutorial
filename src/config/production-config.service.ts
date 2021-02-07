import { ConfigService } from './config.service';

export class ProductionConfigService implements ConfigService {
  hostname = 'prod.localhost.com';
}
