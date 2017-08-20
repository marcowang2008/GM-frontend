import { AppConfig } from '../app.config';

export class BaseService {
  BASE_URL = AppConfig.GM_SERVER;
  REQUEST_CONFIG = {
    header: {

    }
  };
}
