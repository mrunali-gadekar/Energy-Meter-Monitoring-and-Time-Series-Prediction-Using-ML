// src/components/Dashboard/DeviceForm.jsx

import React, { useState } from "react";
import axios from "axios";
import "./deviceform.css";

const DeviceForm = () => {
  const [devices, setDevices] = useState([]);
  const [currentDeviceName, setCurrentDeviceName] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");
  const [attributeNames, setAttributeNames] = useState([]);
  const [currentAttributeName, setCurrentAttributeName] = useState("");
  const [currentHexAddress, setCurrentHexAddress] = useState("");
  const [hexAddresses, setHexAddresses] = useState({});
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [portNumber, setPortNumber] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [groupName, setGroupName] = useState("");
  const [currentslaveId, setCurrentslaveId] = useState("");

  const handleDeviceSelection = async (deviceName) => {
    setSelectedDevice(deviceName);

    if (!attributeNames[deviceName]) {
      setAttributeNames((prevAttributeNames) => ({
        ...prevAttributeNames,
        [deviceName]: [],
      }));

      setHexAddresses((prevHexAddresses) => ({
        ...prevHexAddresses,
        [deviceName]: {},
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (!selectedDevice) {
        console.error("No device selected.");
        return;
      }

      const requestData = {
        devices: devices.map((device) => {
          const deviceData = {
            name: device.name,
            group: device.group,
            slaveId: device.slaveId,
            hexAddressInfo: attributeNames[device.name] || [],
            hexAddresses: hexAddresses[device.name] || {},
            portNumber: device.portNumber,
            ipAddress: device.ipAddress,
          };

          if (deviceData.hexAddressInfo.length > 0) {
            deviceData.hexAddressInfo.forEach((attribute) => {
              if (typeof attribute.min !== "undefined") {
                attribute.min = attribute.min;
              }
              if (typeof attribute.max !== "undefined") {
                attribute.max = attribute.max;
              }
            });
          }

          return deviceData;
        }),
      };

      console.log("Request Data:", requestData);

      const response = await axios.post(
        "http://localhost:57541/api/v1/add-device/upload-json-data",
        requestData
      );
      alert("Form Submitted Successfully");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleDeleteDevice = () => {
    if (selectedDevice) {
      const updatedDevices = devices.filter(
        (device) => device.name !== selectedDevice
      );
      setDevices(updatedDevices);
      setSelectedDevice("");
      setCurrentDeviceName("");
    } else {
      alert("Select Device before deleting..");
    }
  };

  const handleAddAttributeName = () => {
    if (currentAttributeName.trim() !== "") {
      setAttributeNames((prevAttributeNames) => {
        const updatedAttributeNames = { ...prevAttributeNames };
        updatedAttributeNames[selectedDevice] = [
          ...(updatedAttributeNames[selectedDevice] || []),
          {
            parameterName: currentAttributeName,
            hexAddress: currentHexAddress,
            min: minValue,
            max: maxValue,
          },
        ];
        return updatedAttributeNames;
      });

      setHexAddresses((prevHexAddresses) => {
        const updatedHexAddresses = { ...prevHexAddresses };
        updatedHexAddresses[selectedDevice] = {
          ...updatedHexAddresses[selectedDevice],
          [currentAttributeName]: currentHexAddress,
        };
        return updatedHexAddresses;
      });

      setCurrentAttributeName("");
      setCurrentHexAddress("");
      setMinValue("");
      setMaxValue("");
    }
  };

  const handlePortNumberChange = (e) => {
    setPortNumber(e.target.value);
  };

  const handleIpAddressChange = (e) => {
    setIpAddress(e.target.value);
  };

  const handleslaveIdChange = (e) => {
    setCurrentslaveId(e.target.value);
  };

  const handleHexAddressChange = (deviceName, attributeName, hexAddress) => {
    setHexAddresses((prevHexAddresses) => ({
      ...prevHexAddresses,
      [deviceName]: {
        ...prevHexAddresses[deviceName],
        [attributeName]: hexAddress,
      },
    }));
    setCurrentHexAddress(hexAddress);
  };

  const handleAddDevice = () => {
    if (
      currentDeviceName.trim() !== "" &&
      currentslaveId.trim() !== ""
    ) {
      const newDevice = {
        name: currentDeviceName,
        group: groupName,
        slaveId: currentslaveId,
        hexAddressInfo: [],
        portNumber: portNumber,
        ipAddress: ipAddress,
      };
      setDevices([...devices, newDevice]);

      setAttributeNames((prevAttributes) => ({
        ...prevAttributes,
        [currentDeviceName]: [],
      }));

      setCurrentDeviceName("");
      setPortNumber("");
      setIpAddress("");
      setGroupName("");
      setCurrentslaveId("");
    }
  };

  const handleDeleteAttribute = () => {
    if (selectedDevice && currentAttributeName.trim() !== "") {
      setAttributeNames((prevAttributeNames) => {
        const updatedAttributeNames = { ...prevAttributeNames };
        updatedAttributeNames[selectedDevice] = (
          updatedAttributeNames[selectedDevice] || []
        ).filter(
          (attribute) => attribute.parameterName !== currentAttributeName
        );
        return updatedAttributeNames;
      });

      setHexAddresses((prevHexAddresses) => {
        const updatedHexAddresses = { ...prevHexAddresses };
        delete updatedHexAddresses[selectedDevice][currentAttributeName];
        return updatedHexAddresses;
      });

      setCurrentAttributeName("");
      setCurrentHexAddress("");
    } else {
      alert("Select a device and type an attribute name before deleting.");
    }
  };

  return (
    <div>
      <h2>Device Form</h2>
      <div>
        <label>
          Device Name:
          <input
            type="text"
            className="input-field"
            value={currentDeviceName}
            onChange={(e) => setCurrentDeviceName(e.target.value)}
            />
          </label>
          <label>
            Group Name:
            <input
              type="text"
              className="input-field"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </label>
          <label bold-label>
            Port Number:
            <input
              type="number"
              className="input-field"
              value={portNumber}
              placeholder="0"
              onChange={handlePortNumberChange}
              min="0"
            />
          </label>
  
          <label bold-label>
            IP Address:
            <input
              type="text"
              className="input-field"
              value={ipAddress}
              placeholder="0"
              onChange={handleIpAddressChange}
              min="0"
            />
          </label>
          <label bold-label>
            Slave ID:
            <input
              type="number"
              className="input-field"
              value={currentslaveId}
              placeholder="0"
              onChange={handleslaveIdChange}
              min="0"
            />
          </label>
        </div>
        <div className="button-container">
          <div className="flex-container">
            <button
              className="add-button label-field"
              onClick={handleAddDevice}
            >
              Add Device
            </button>
            {selectedDevice && (
              <>
                <button
                  className="add-button label-field"
                  onClick={handleDeleteDevice}
                >
                  Delete Device
                </button>
              </>
            )}
          </div>
        </div>
  
        {devices.length > 0 && (
          <div>
            <div className="button-container">
              <div className="flex-container">
                <button
                  className="add-button label-field"
                  onClick={handleAddAttributeName}
                >
                  Add Attribute
                </button>
                <button
                  className="add-button label-field"
                  onClick={handleDeleteAttribute}
                >
                  Delete Attribute
                </button>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <label className="bold-label">
                    Device hexAddressInfo:
                    <ul className="no-list-style label-field">
                      {attributeNames[selectedDevice] &&
                        attributeNames[selectedDevice].map(
                          (attribute, index) => (
                            <li key={index}>
                              Attribute Name: {attribute.parameterName} &emsp;Hex
                              Address: {attribute.hexAddress} &emsp;Min Value:{" "}
                              {attribute.min} &emsp;Max Value: {attribute.max}
                            </li>
                          )
                        )}
                    </ul>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="button-container">
          <button className="add-button label-field" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  };
  
  export default DeviceForm;
  