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

  getIncrementedVersion(args) {
    const { latestVersion } = args || {};

    this.log.warn(calver.inc('yyyy.mm.minor', '2021.1.0', 'calendar.minor'));

    try {
      this.log.warn(calver.inc(this.getFormat(), latestVersion, this.getInc()));
      return calver.inc(this.getFormat(), latestVersion, this.getInc());
    } catch {
      console.log(this.getFormat(), latestVersion, this.getInc());
      this.log.warn(`Failed to increment with "${this.getFormat()}", falling back to "${this.getFallbackInc()}".`);
      try {
        return calver.inc(this.getFormat(), latestVersion, this.getFallbackInc());
      } catch {
        this.log.error('Both primary and fallback increment failed. Returning latest version.');
        return latestVersion;
      }
    }
  }

  getIncrementedVersionCI() {
    return this.getIncrementedVersion(...arguments);
  }

  getIncrement() {
    return this.getIncrementedVersion(...arguments);
  }
}

module.exports = CalverPlugin;
