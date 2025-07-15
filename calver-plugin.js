'use strict';

const { Plugin } = require('release-it');
const calver = require('calver');

const DEFAULT_FORMAT = 'yy.mm.minor';
const DEFAULT_INCREMENT = 'calendar';
const FALLBACK_INCREMENT = 'minor';

class CalverPlugin extends Plugin {

  getFormat() {
    return this.getContext().format || DEFAULT_FORMAT;
  }

  getInc() {
    return this.getContext().increment || DEFAULT_INCREMENT;
  }

  getFallbackInc() {
    return this.getContext().fallbackIncrement || FALLBACK_INCREMENT;
  }

  /**
   * Normalize version by stripping leading zeros from numeric parts
   * Example: '2025.07.15.0.0' -> '2025.7.15.0.0'
   */
  normalizeVersion(version) {
    if (!version) return version;
    return version
      .split('.')
      .map((part) => String(Number(part))) // removes leading 0s
      .join('.');
  }

  getIncrementedVersion(args = {}) {
    const { latestVersion } = args;
    const format = this.getFormat();
    const inc = this.getInc();
    const fallbackInc = this.getFallbackInc();
    const normalizedVersion = this.normalizeVersion(latestVersion);

    try {
      return calver.inc(format, normalizedVersion, inc);
    } catch {
      this.log.warn(`Failed to increment with "${inc}", falling back to "${fallbackInc}".`);
      try {
        return calver.inc(format, normalizedVersion, fallbackInc);
      } catch {
        this.log.error('Both primary and fallback increment failed. Returning latest version.');
        return latestVersion;
      }
    }
  }

  getIncrementedVersionCI(...args) {
    return this.getIncrementedVersion(...args);
  }

  getIncrement(...args) {
    return this.getIncrementedVersion(...args);
  }
}

module.exports = CalverPlugin;
