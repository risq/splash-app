import debug from 'debug';
import $ from 'jquery';
const dbg = debug('splash:gyro');

export default class Gyro {
  constructor() {
    if (!window.DeviceOrientationEvent) {
      throw new Error('DeviceOrientation is not supported');
    }

    dbg('Init gyro');
    window.addEventListener('deviceorientation', this.deviceOrientationHandler.bind(this), false);
  }

  deviceOrientationHandler(e) {
    $('.gamma').text(e.gamma);
    $('.beta').text(e.beta);
  }
}
