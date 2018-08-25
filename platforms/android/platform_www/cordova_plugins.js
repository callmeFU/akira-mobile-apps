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
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-datetimepicker": "1.0.0"
};
// BOTTOM OF METADATA
});