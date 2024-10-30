import * as log4js from "log4js";

import { Logger } from './logger'
import { ConfigurationReaders } from "../configurationReaders/configurationReaders";

export class FileLogger extends Logger {
  private readonly _configurations = (ConfigurationReaders.nuxtConfigurationReader.isEnvironmentNameNotProduction)
    ? log4js.configure({
        appenders: { cheese: { type: "file", filename: "./logs/all.log" } },
        categories: { default: { appenders: ["cheese"], level: "debug" } },
      })
    : undefined;

  private readonly _logger = (ConfigurationReaders.nuxtConfigurationReader.isEnvironmentNameNotProduction) ? log4js.getLogger() : undefined;

  public logDebug(message: string, isLoggingEnabled: boolean = true): void {
    if (this._isloggingEnabled(isLoggingEnabled)) {
      this._logger?.debug(message);
    }
  }

  public logInfo(message: string, isLoggingEnabled: boolean = true): void {
    if (this._isloggingEnabled(isLoggingEnabled)) {
      this._logger?.info(message);
    }
  }

  public logWarning(message: string, isLoggingEnabled: boolean = true): void {
    if (this._isloggingEnabled(isLoggingEnabled)) {
      this._logger?.warn(message);
    }
  }

  public logError(message: string, isLoggingEnabled: boolean = true): void {
    if (this._isloggingEnabled(isLoggingEnabled)) {
      this._logger?.error(message);
    }
  }

  private _isloggingEnabled(isForcedLoggingEnabled: boolean = true) {
    return ConfigurationReaders.nuxtConfigurationReader.isEnvironmentNameNotProduction &&
    ConfigurationReaders.nuxtConfigurationReader.IS_FILE_LOGGING_ENABLED && isForcedLoggingEnabled;
  }
}
