import debug from 'debug';
import $ from 'jquery';
const dbg = debug('splash:gyro');

export default new class Gyro {
  constructor() {
    if (!window.DeviceOrientationEvent) {
      throw new Error('DeviceOrientation is not supported');
    }
  }

  init() {
    dbg('init');
    window.addEventListener('deviceorientation', this.deviceOrientationHandler.bind(this), false);
  }

  deviceOrientationHandler(e) {
    dbg(e);

    $('.gamma').text(e.gamma);
    $('.beta').text(e.beta);
  }
};
