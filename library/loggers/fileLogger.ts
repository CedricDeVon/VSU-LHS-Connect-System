import * as log4js from "log4js";

import { NuxtConfigurationReader } from "../configurationReaders/nuxtConfigurationReader";

export class FileLogger {
  private static configurations = NuxtConfigurationReader.isEnvironmentNameNotProduction
    ? log4js.configure({
        appenders: { cheese: { type: "file", filename: "./logs/all.log" } },
        categories: { default: { appenders: ["cheese"], level: "debug" } },
      })
    : undefined;

  private static logger = NuxtConfigurationReader.isEnvironmentNameNotProduction ? log4js.getLogger() : undefined;

  public static logDebug(value: string, isLoggingEnabled: boolean = true): void {
    this.logger?.debug(value);
  }

  public static logInfo(value: string, isLoggingEnabled: boolean = true): void {
    this.logger?.info(value);
  }

  public static logWarning(value: string, isLoggingEnabled: boolean = true): void {
    this.logger?.warn(value);
  }

  public static logError(value: string, isLoggingEnabled: boolean = true): void {
    this.logger?.error(value);
  }
}
import * as log4js from "log4js";

import { NuxtConfigurationReader } from "../configurationReaders/nuxtConfigurationReader";

export class FileLogger {
  private static configurations = NuxtConfigurationReader.isEnvironmentNameNotProduction
    ? log4js.configure({
        appenders: { cheese: { type: "file", filename: "./logs/all.log" } },
        categories: { default: { appenders: ["cheese"], level: "debug" } },
      })
    : undefined;

  private static logger = NuxtConfigurationReader.isEnvironmentNameNotProduction ? log4js.getLogger() : undefined;

  public static logDebug(value: string, isLoggingEnabled: boolean = true): void {
    this.logger?.debug(value);
  }

  public static logInfo(value: string, isLoggingEnabled: boolean = true): void {
    this.logger?.info(value);
  }

  public static logWarning(value: string, isLoggingEnabled: boolean = true): void {
    this.logger?.warn(value);
  }

  public static logError(value: string, isLoggingEnabled: boolean = true): void {
    this.logger?.error(value);
  }
}
