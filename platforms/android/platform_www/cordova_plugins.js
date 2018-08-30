cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-datetimepicker.plugin",
    "file": "plugins/cordova-plugin-datetimepicker/www/plugin.js",
    "pluginId": "cordova-plugin-datetimepicker",
    "clobbers": [
      "DateTimePicker"
    ],
    "runs": true
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-fcm.FCMPlugin",
    "file": "plugins/cordova-plugin-fcm/www/FCMPlugin.js",
    "pluginId": "cordova-plugin-fcm",
    "clobbers": [
      "FCMPlugin"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-datetimepicker": "1.0.0",
  "cordova-plugin-device": "2.0.2",
  "cordova-plugin-fcm": "2.1.2"
};
// BOTTOM OF METADATA
});