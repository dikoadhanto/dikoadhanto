const STATE_HEAD_TABLE_REGIONAL = {
  container: [
    [
      { rowSpan: 2, label: "#" },
      { rowSpan: 2, label: "Regional" },
      { rowSpan: 2, label: "BBM Pricing" },
      { colSpan: 2, label: "Status Tangki" },
      { colSpan: 2, label: "Status Sensor" },
      { colSpan: 3, label: "BBM Monitoring" },
    ],
    [
      { label: "Total" },
      { label: "Kapasitas" },
      { label: "Total" },
      { label: "Failed" },
      { label: "Volume" },
      { label: "Percentage" },
      { label: "Alarm" },
    ],
  ],
};

const STATE_HEAD_TABLE_WITEL = {
  container: [
    [
      { rowSpan: 2, label: "#" },
      { rowSpan: 2, label: "Witel" },
      { rowSpan: 2, label: "BBM Pricing" },
      { colSpan: 2, label: "Status Tangki" },
      { colSpan: 2, label: "Status Sensor" },
      { colSpan: 3, label: "BBM Monitoring" },
    ],
    [
      { label: "Total" },
      { label: "Kapasitas" },
      { label: "Total" },
      { label: "Failed" },
      { label: "Volume" },
      { label: "Percentage" },
      { label: "Alarm" },
    ],
  ],
};

const STATE_HEAD_TABLE_LOCATION = {
  container: [
    [
      { rowSpan: 2, label: "#" },
      { rowSpan: 2, label: "Lokasi" },
      { rowSpan: 2, label: "ID RTU" },
      { rowSpan: 2, label: "RTU Name" },
      { rowSpan: 2, label: "Deskripsi RTU" },
      { colSpan: 2, label: "Status Tangki" },
      { rowSpan: 2, label: "BBM Pricing" },
      { rowSpan: 2, label: "Status Sensor" },
      { colSpan: 6, label: "BBM Monitoring" },
    ],
    [
      { label: "Tipe" },
      { label: "Kapasitas" },
      { label: "Volume" },
      { label: "Percentage" },
      { label: "Support" },
      { label: "Status" },
      { colSpan: 2, label: "Graph Sisa" },
    ],
  ],
};

const STATE_HEAD_TABLE_ALARM = {
  container: [
    [
      { label: "#" },
      { label: "Witel" },
      { label: "Lokasi" },
      { label: "Tipe Tangki" },
      { label: "Tipe Sensor" },
      { label: "Start Alarm" },
      { label: "Duration" },
      { label: "Pic" },
      { label: "Graph" },
    ],
  ],
};

const STATE_HEAD_TABLE_LIST_MD = {
  container: [
    [
      { label: "#" },
      { label: "NAMA MD" },
      { label: "MD IP" },
      { label: "LOKASI" },
      { label: "MODE  MD" },
      { label: "TIPE MD" },
      { label: "STATUS" },
      { label: "ACTION" },
    ],
  ],
};

const STATE_HEAD_TABLE_LIST_RTU = {
  container: [
    [
      { label: "#" },
      { label: "SNAME" },
      { label: "NAMA RTU" },
      { label: "RTU IP" },
      { label: "NAMA MD" },
      { label: "MD IP" },
      { label: "LOKASI" },
      { label: "ACTIONS" },
    ],
  ],
};

const STATE_HEAD_TABLE_LIST_PORT = {
  container: [
    [
      { label: "#" },
      { label: "NAMA PORT" },
      { label: "MODE PORT" },
      { label: "IDENTIFIER NAME" },
      { label: "UNIT" },
      { label: "CALIBRATION VALUE" },
      { label: "RULE" },
      { label: "ACTIONS" },
    ],
  ],
};

const STATE_HEAD_TABLE_USER = {
  container: [
    [
      { label: "#" },
      { label: "Username" },
      { label: "Nama" },
      { label: "Organisasi" },
      { label: "Role" },
      { label: "LDAP" },
      { label: "Active" },
      { label: "Actions" },
    ],
  ],
};

const STATE_HEAD_TABLE_TAGS = {
  container: [
    [
      { label: "#" },
      { label: "Tags" },
      { label: "Deskripsi" },
      { label: "Actions" },
    ],
  ],
};

const STATE_HEAD_TABLE_LIST_LOCATION = {
  container: [
    [
      { label: "#" },
      { label: "LOKASI" },
      { label: "ORGANISASI" },
      { label: "PIC" },
      { label: "SNAME" },
      { label: "ACTIONS" },
    ],
  ],
};

const STATE_HEAD_TABLE_LIST_TEMPELATE = {
  container: [
    [
      { label: "" },
      { label: "#" },
      { label: "RTU" },
      { label: "MODBUS" },
      { label: "TIPE PENGUKURAN" },
      { label: "DESKRIPSI" },
      { label: "MODE PORT" },
      { label: "TAGS" },
    ],
  ],
};

const STATE_HEAD_TABLE_BBM_PRICING = {
  container: [
    [
      { label: "#" },
      { label: "ORGANISASI" },
      { label: "HARGA BBM PER LITER" },
      { label: "ACTIONS" },
    ],
  ],
};

export {
  STATE_HEAD_TABLE_REGIONAL,
  STATE_HEAD_TABLE_LOCATION,
  STATE_HEAD_TABLE_WITEL,
  STATE_HEAD_TABLE_ALARM,
  STATE_HEAD_TABLE_LIST_MD,
  STATE_HEAD_TABLE_LIST_RTU,
  STATE_HEAD_TABLE_LIST_PORT,
  STATE_HEAD_TABLE_USER,
  STATE_HEAD_TABLE_TAGS,
  STATE_HEAD_TABLE_LIST_LOCATION,
  STATE_HEAD_TABLE_LIST_TEMPELATE,
  STATE_HEAD_TABLE_BBM_PRICING,
};
