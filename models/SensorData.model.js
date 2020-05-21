const mongoose = require("mongoose");
const config = require("../config/database");
const axios = require("axios")

const SensorDataSchema = mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Patient"
  },
  xooa_asset_id: {
    type: String,
    default: null
  },
  timestamps: { }
});

const SensorData = (module.exports = mongoose.model("SensorData", SensorDataSchema));

module.exports.create = function(SensorData, SensorInformation, callback) {
  axios.post(process.env.XOOA_URL+"assets?asset-type=sensor_data",
      {
        "properties":{
          "temperature": SensorInformation.temperature,
          "pulse": SensorInformation.pulse ? SensorInformation.pulse : null,
          "seizure": SensorInformation.seizure ? SensorInformation.seizure : false
        },
        "details": {
          "device_id": SensorInformation.device_id ? SensorInformation.device_id: "Unknown Device"
        },
        "location": {
          "latitude": SensorInformation.location.latitude ? SensorInformation.location.latitude : "0",
          "longitude": SensorInformation.location.longitude ? SensorInformation.location.longitude : "0"
        },
        "patient": {
          "id": SensorInformation.patient
        }
      },
      {
        headers: {
          Authorization: "Bearer "+process.env.XOOA_TOKEN,
        }
      }).then(response => {
    // console.log(response.data);
    SensorData.xooa_asset_id = response.data.id;
    SensorData.save(callback);
  }).catch(error => {
    console.log("This error occurred on BHIS: "+ error)
  })
};

module.exports.data = (sensorData, callback)=>{
    // console.log(sensorData)
    axios.get(process.env.XOOA_URL+"assets/"+sensorData.xooa_asset_id, {
        headers: {
            Authorization: "Bearer "+process.env.XOOA_TOKEN,
        }}).then(response => {
        callback(response.data);
    }).catch(error => {
        console.log("This error occurred on BHIS: "+ error)
    })
};