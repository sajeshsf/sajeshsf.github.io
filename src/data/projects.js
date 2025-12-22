import { slugify } from '../utils/slugify.js'

const projectsData = [
  {
    title: 'Cash Wizard Smart Safes · American Security',
    description:
      'An automated Cloud-connected cash management system enabling integration with financial institutions. Oversaw all aspects of the development and maintenance of the product line. Cloud Portal - Directed the maintenance and scaling (vertical and horizontal) of a safe management platform built on .NET MVC, microservices and AWS services (Global Accelerator, Load Balancer, API Gateway, SNS, Cognito, S3). Enabled secure, high-availability access across PCs, laptops, and field devices across the globe. Cloud-Based Report generation tool: Re-architected the cloud reporting module (originally a .NET microservice + MSSQL) that generated 13 reports across 15k+ smart safes. Reduced report generation time from 45 minutes to near-instantaneous by designing a new architecture using AWS Lambda, Amazon Aurora, DynamoDB, and Redis. Safe/Cash Wizard 2 - Ensured zero-downtime operations for 15,000+ deployed Cash Wizard 2 safes, overseeing product maintenance, feature releases, and real-time field support. The product is built on a multi-board architecture with NXP K60/K66 MCUs running MQX RTOS, enabling reliable, real-time control. Cash Wizard Touch/Pro/Ultra - Directed the transition from Cash Wizard 2 to next-gen Cash Wizard safes built on NXP i.MX9 SoC, driving modernization of hardware and software stack. Introduced React.js touchscreen interface to replace legacy dot-matrix UI, enhancing usability and customer adoption. Migrated from MQX RTOS to Yocto Linux and upgraded storage from Flash DB to SQLite3, enabling scalability and maintainability. Developed gRPC-enabled C firmware for high-performance communication across modules. Drove pilot rollout in the U.S and Bahamas, positioning the product line for long-term growth and market competitiveness.',
    stack: ['AWS', 'Yocto Linux', 'React', '.NET', 'NXP i.MX9', 'gRPC', 'MQX RTOS'],
    live: null,
    repo: null,
    year: '2023 – ongoing',
  },
  {
    title: 'NiOX Product Line · Travancore Analytics',
    description:
      'A one-stop solution for data acquisition and test automation. Managed all the phases of the novel product line from sales and engineering through production, establishing an indigenous, high-reliability solution benchmarked for aerospace grade performance. Niox1900 - Implemented and tested the FreeRTOS-based firmware (C, State Management, Data Acquisition, Commanding, Real-time System, Ethernet) for the STM32 controller. Participated in a 3-month on-site development (Custom Digital Protocols) and coordinated the 3-month integration testing of the system at the client facility. The system is used to qualify the Scan Mirror Assembly (SMA) and Filter Wheel Assembly (FWA) systems of India\'s leading space agency (ISRO). Niox2100 - Led the design and development (hardware, firmware, FPGA/RTL) of the Zynq-7000-based data acquisition and control system. NiOX2100 is completely developed in house right from mechanical design, circuit design, PCB design and manufacturing, board bring-up, wiring integration, etc.) and can be interfaced with up to 14 interface cards through MIL24308 connectors and has up to 128 analog channels and 160 digital IOs. Participated in 3-month on-site development (Custom Digital and MIL1553 Protocols) and coordinated the 3-month integration testing of the system at the client facility. The system is used to qualify the Solar Array Drive Assembly (SADA) of India\'s leading space agency (ISRO). Niox1553 - Led the design and development (hardware, firmware) of the small, portable, USB/Ethernet device (ESP32-based) that provides new levels of performance & flexibility for systems interfacing to a MIL-STD-1553 data bus. There are up to 2 dual redundant MIL-STD-1553 channels operating in BC, RT, or MT modes and 8 digital IOs. Niox2300 - Led the design and development (mechanical, power electronics, firmware) of the 3-phase BLDC motor drive with trapezoidal control and the associated data acquisition system for motor characterization. This is used qualify the BLDC motor used in electromechanical actuators (EMAs) for thrust vector control (TVC) in PSLV Second stage (PS2). Niox2400 - Led the design and development of a Battery Management System (BMS) based on the LTC6811 for packs up to 150 V/5Ah and 36 cells. The system is deployed to qualify onboard satellite battery packs. NiOXView – Led the design and development of .NET-based (WPF) real-time data visualization and control software for all the devices in the product line. Acquires and stores the data from the device and can issue commands to the device. The software can maintain different configurations and history data and perform fully automated test sequences as well.',
    stack: ['FreeRTOS', 'STM32', 'Zynq-7000', 'C/C++', 'MIL-1553', 'WPF', 'ESP32'],
    live: null,
    repo: null,
    year: '2018 – 2024',
  },
  {
    title: 'MechaSense (Previously HVACIntel) · Travancore Analytics',
    description:
      'An IoT-enabled HVAC monitoring and control platform. Orchestrated product line maintenance and expansion. HestiaPi-based POC - Developed a POC based on the completely open-source smart thermostat for household monitoring, which also has enhanced data security and privacy. Sense 1 - Led the design and development of the IOT-enabled HVAC monitoring platform with different pluggable interface cards like Hats of RaspberryPI. Designed and developed the ESP32-based hardware platform (KiCad, Proteus) with IEEE802.1 Wi-Fi and BLE, I2C, and SPI as sensor interfaces. The FreeRTOS-based firmware (C, JSON Configuration) is capable of constantly acquiring data and publishing the data to the remote MQTT server. Rev 8 - Led the design and development of the LTE/Wi-Fi system that offers an all-in-one hardware board catering to the needs of data acquisition in HVAC solutions. The solution enables the user to integrate multiple I2C based sensors to collect the relevant data. The acquired data is sent for analysis to the MQTT broker. The system also enables daisy chaining multiple boards to accommodate a larger number of sensors. Web Application - oversaw the development and maintenance of a React.js + Node.js microservices–based IoT web application for real-time monitoring, visualization, and control of HVAC systems across residential and industrial environments. Mobile App - React Native-based app that alerts the user regarding the statuses of devices being monitored. The application also aids in the initial pairing of the IOT device with WiFi/Bluetooth.',
    stack: ['ESP32', 'FreeRTOS', 'MQTT', 'React', 'Node.js', 'Raspberry Pi', 'React Native'],
    live: null,
    repo: null,
    year: '2019 – 2024',
  },
  {
    title: 'TigerView Extensions · Televere Systems',
    description:
      'A medical Imaging/PACS software that offers a variety of workflows. Modernized TigerView into a unified, cloud-native imaging ecosystem with improved usability, reliability, and multi-device accessibility. Managed the development of multiple tools and software extensions within the product line to enhance functionality. Tigerview Cloud Revamp - Architected and led the revamp of the legacy Dart/PHP-based cloud imaging platform to a scalable, multi-tenant .NET 6 + Angular web application supporting patient/doctor management in addition to DICOM image view, measurements, annotations, and advanced imaging tools (contrast, gamma, and ICE filters). Progressive Web App (PWA) and Mobile App - Integrated the revamp web application into a PWA and React Native mobile application, enabling unified experience on desktops, iPads, and smartphones. Dicom Gateway - Directed the development of a Windows Service–based DICOM Gateway that facilitated secure, real-time data exchange between local imaging devices and centralized cloud servers. Cloud Image Share - Led the design and development of the Angular/.NET 6 module allowing physicians to share medical images (Dicom) securely with patients and external specialists for second opinions. Patient Details Synchronization - Led the design and development of .NET 6-based (WPF) Patient Management Application that can display patient details, including DICOM files with one-to-two-way database (MySQL/MSSQL) synchronization with a conflict-resolving mechanism.',
    stack: ['.NET 6', 'Angular', 'CUDA', 'AWS', 'DICOM', 'React Native', 'WPF'],
    live: null,
    repo: null,
    year: '2019 – 2024',
  },
  {
    title: 'LEO 7-DOF Robotic Arm · VSSC / ISRO',
    description:
      'AI-driven robotic arm using visual servoing and motion prediction for autonomous operation in space. Designed and Oversaw the control software for 7 Degrees-of-Freedom robotic arm based on the NVIDIA Jetson Orin developed for space-grade applications, enabling precision motion and telemetry in harsh environments. Governed end-to-end project delivery, including requirement analysis, firmware architecture, and design reviews. Collaborated on the development of a deep learning–based object detection and Kalman filter–driven motion estimation system to track and intercept dynamic targets through real-time camera feedback. Engineered isolated power subsystems with multi-voltage domain management for signal and actuator safety. Implemented RS-485 and CAN-based motor control, with hard real-time telemetry and telecommand protocols to synchronize sensor feedback and command responses while ensuring deterministic real-time operation. Liaised the unit testing and validation, ensuring adherence to space hardware reliability standards.',
    stack: ['Jetson Orin', 'C++', 'CAN', 'RS-485', 'Computer Vision', 'Kalman', 'FreeRTOS'],
    live: null,
    repo: null,
    year: '2023',
  },
  {
    title: 'Sovereign Node & Osvauld Suite · Technical Advisor',
    description:
      'Advised the open-source Osvauld ecosystem on Rust-based peer-to-peer frameworks using Iroh, CRDT sync, Sequoia-PGP encryption, and UCAN authorization. Defined architecture, security posture, and release plans for privacy-first personal nodes. Guided architecture decisions, security design, and implementation strategy across multiple applications of the suite (Livnote, Libremot, Sthalam) including Sovereign Node, an always-on personal node platform for continuous peer connectivity using low-power hardware like a Raspberry Pi. Architected Rust-based peer-to-peer frameworks leveraging Iroh for distributed networking (DHT + NAT traversal) and CRDTs for real-time, conflict-free data synchronization. Implemented secure data pipelines with Sequoia-PGP encryption and UCAN token–based decentralized authorization, ensuring user-controlled privacy and identity sovereignty. Provided mentorship to the team, focusing on performance, modularization, and maintainability. Contributed to technical documentation, release planning, and open-source community alignment with MIT licensing standards.',
    stack: ['Rust', 'Iroh', 'CRDTs', 'Sequoia-PGP', 'UCAN', 'Open Source', 'Raspberry Pi'],
    live: null,
    repo: 'https://github.com/osvauld',
    year: '2023 – 2024',
  },
  {
    title: 'Xcross - Rapid Inspection · Creads',
    description:
      'An industrial CT scanner that aids in non-destructive measurement of heat exchangers. Architected and developed a high-performance WPF/.NET-based robotic motion control and fluoroscopic imaging system, integrating a 4-axis PWM motion controller, GigE X-ray detectors, and COM-based emitters for real-time imaging and automation. Performed on-site integration, testing, and qualification at Comco Corporation, Nagoya (Japan). Collaborated directly with hardware and mechanical teams to calibrate and validate the complete imaging pipeline. Implemented joystick-like motion control for 4D (X, Y, Z, rotation) positioning within the test jig, enabling both manual manipulation and automated predefined motion sequences with safety interlocks and homing calibration for precision testing. Boosted computational performance by designing a CUDA-based image processing module with imaging algorithms including binning, bad pixel correction, achieving substantial reductions in processing latency. Designed the data acquisition and control architecture, supporting half-scan and full 360° CT operations with scalable detector interfaces.',
    stack: ['WPF', '.NET', 'CUDA', 'GigE', 'Motion Control', 'Image Processing'],
    live: null,
    repo: null,
    year: '2022',
  },
  {
    title: 'Smartshoes · Own Wearables',
    description:
      'A smart shoe, which doubles as a fitness tracker aimed at recording various parameters like temperature, heart rate, and body weight, and analyzing GAIT during physical activities. Developed the firmware for the Nordic nrf series microcontroller, which runs Zephyr OS, which collects various sensor data and sends it to the mobile app via BLE, and provides over-the-air updates (OTA). Integrated the product\'s NXP MWPR-series microcontroller for wireless charging.',
    stack: ['Zephyr OS', 'Nordic nRF54', 'BLE', 'OTA', 'NXP MWPR', 'Embedded C'],
    live: null,
    repo: null,
    year: '2023',
  },
  {
    title: 'DentaVUE · Alerio',
    description:
      'DICOM-based patient management system with real-time fluoroscopic imaging. Designed and developed a DICOM-based Patient Management System using .NET 4.8 (WPF) with an MSSQL database. Integrated the GigE based detector to acquire fluoroscopic images and rendered them. Integrated a high-performance C++ image viewing and processing engine supporting color mapping, histogram equalization, contrast/brightness adjustment, and annotation tools. Implemented appointment scheduling and timeline-based access for doctors, improving workflow efficiency and clinical visibility.',
    stack: ['.NET 4.8', 'WPF', 'C++', 'MSSQL', 'DICOM', 'GigE'],
    live: null,
    repo: null,
    year: '2021',
  },
  {
    title: 'Mymmo · Travancore Analytics',
    description:
      'Automated detection of microcalcifications in digital mammograms, aiding early breast cancer diagnosis. Implemented and tested .NET-based (WPF) Application which also has an MSSQL database and a multistage image processing algorithm involving a MedianFilter, Convolution, etc. The Application also has a DICOM parsing module for mammograms and an algorithm to detect microcalcifications.',
    stack: ['.NET', 'WPF', 'MSSQL', 'Image Processing', 'Medical Imaging', 'DICOM'],
    live: null,
    repo: null,
    year: '2020',
  },
]

// Convert projects data to format with IDs
export const projects = projectsData.map((p) => ({
  id: slugify(p.title),
  title: p.title,
  headline: p.description,
  year: p.year,
}))
