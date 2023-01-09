const rolePermissions = [
  {
    id: "KgYo90hH-kHG1Gy",
    name: "administration",
  },
  {
    id: "v0FqqG78dn0oe2D",
    name: "administration_api",
  },
  {
    id: "pZ4Izxtz0NYuyNA",
    name: "administration_api_create",
  },
  {
    id: "mTKNtaoVBlAGyVN",
    name: "administration_api_delete",
  },
  {
    id: "8CkpaxV518rBrje",
    name: "administration_api_update",
  },
  {
    id: "Vdibur7NR_H84BC",
    name: "administration_api_view",
  },
  {
    id: "qyI2I3AgsLQIr4J",
    name: "administration_configs",
  },
  {
    id: "f6W_QN8R4ML2mYg",
    name: "administration_locations",
  },
  {
    id: "aw_z5vZ_MYiu9M8",
    name: "administration_locations_create",
  },
  {
    id: "Jc33OryYXZERI9h",
    name: "administration_locations_delete",
  },
  {
    id: "edwLHrKmxbeceRS",
    name: "administration_locations_types",
  },
  {
    id: "jk4K1x_5Fpq-T1W",
    name: "administration_locations_types_create",
  },
  {
    id: "NXHDeXLchCCmwRS",
    name: "administration_locations_types_delete",
  },
  {
    id: "sxYCPHqTsF0Q9SI",
    name: "administration_locations_types_update",
  },
  {
    id: "9qatkirCcxyln5o",
    name: "administration_locations_types_view",
  },
  {
    id: "7pATwi4ssBGEYGc",
    name: "administration_locations_update",
  },
  {
    id: "lM8EdFAhHJ8ZMcV",
    name: "administration_locations_view",
  },
  {
    id: "WVikuBCGXtWH8pr",
    name: "administration_logs",
  },
  {
    id: "aTYQgOloXBjrhzG",
    name: "administration_notifications",
  },
  {
    id: "ggMlnhZHRtcUOOU",
    name: "administration_notifications_create",
  },
  {
    id: "eYqO1Uu_RcP9dOv",
    name: "administration_notifications_delete",
  },
  {
    id: "FbSb_UdLeP01Fk0",
    name: "administration_notifications_update",
  },
  {
    id: "DxIUisVr88hBm2n",
    name: "administration_notifications_view",
  },
  {
    id: "sEKTzqymP0X7zd3",
    name: "administration_organizations",
  },
  {
    id: "FoUCR470aHvtzOT",
    name: "administration_organizations_create",
  },
  {
    id: "lnqL-yZKV9PqNtv",
    name: "administration_organizations_delete",
  },
  {
    id: "L5_lOaB8dK2Ov17",
    name: "administration_organizations_update",
  },
  {
    id: "h1mQY3FkCIqPqj6",
    name: "administration_organizations_view",
  },
  {
    id: "X8ksX0ODemzgtAn",
    name: "administration_permissions",
  },
  {
    id: "8ohhWrwBpGJ5Adm",
    name: "administration_permissions_create",
  },
  {
    id: "iANlyUs4ft8foBa",
    name: "administration_permissions_delete",
  },
  {
    id: "_d-mPDRP0z97Mtr",
    name: "administration_permissions_update",
  },
  {
    id: "3nWniTKE4lkfnLf",
    name: "administration_permissions_view",
  },
  {
    id: "k5BtGnfPCo71XJI",
    name: "administration_roles",
  },
  {
    id: "VrTk_8BQ5dc96iU",
    name: "administration_roles_create",
  },
  {
    id: "roKTKaGeGbM_gdF",
    name: "administration_roles_delete",
  },
  {
    id: "FG-NKCev2S5ePEN",
    name: "administration_roles_update",
  },
  {
    id: "GZ6Clx951KZH8ER",
    name: "administration_roles_view",
  },
  {
    id: "6Drp74joUImpv7J",
    name: "administration_telegram_group",
  },
  {
    id: "G8J06RAX9LQjrIa",
    name: "administration_telegram_group_create",
  },
  {
    id: "Vt6AYExqs3-wqlh",
    name: "administration_telegram_group_delete",
  },
  {
    id: "14KxTtbjqxzBvNp",
    name: "administration_telegram_group_update",
  },
  {
    id: "NdEIK6BFYMoVBFj",
    name: "administration_telegram_group_view",
  },
  {
    id: "EsThhVP-iqJdLs-",
    name: "administration_telegram_logs",
  },
  {
    id: "klVj3aD_Ofs_ADh",
    name: "administration_users",
  },
  {
    id: "RXWPeiVc6c_Bw9Q",
    name: "administration_users_create",
  },
  {
    id: "4VOA9oMuHhTKHmZ",
    name: "administration_users_delete",
  },
  {
    id: "w4oICM1rJL4ivnR",
    name: "administration_users_update",
  },
  {
    id: "sO_cUyd3klJ0md_",
    name: "administration_users_view",
  },
  {
    id: "W6bhdImyOQQeePO",
    name: "dashboard",
  },
  {
    id: "vMfrd2TS7L_Cdgf",
    name: "dashboard_bbm",
  },
  {
    id: "EMsc9vb79viUaGubBi1N",
    name: "dashboard_bbm_pricing",
  },
  {
    id: "VwFoXmVHFhN7LXfSQhTC",
    name: "dashboard_ip_rectifier_link",
  },
  {
    id: "djTMfHuz2dokK6h__R4t",
    name: "dashboard_location_monitoring",
  },
  {
    id: "Hxb3SgKQJ4tDhUfSsxEo",
    name: "dashboard_md_rtu_monitoring",
  },
  {
    id: "LAkaCroOHNxobx6myS9f",
    name: "dashboard_port_sensor_table",
  },
  {
    id: "UIJVkbl5rc1dc6WAAxot",
    name: "dashboard_rtu_operation",
  },
  {
    id: "30Sn5JzQZC7HRd0szHcN",
    name: "dashboard_tioc",
  },
  {
    id: "qWwyCiuELtsLZi1",
    name: "parameter",
  },
  {
    id: "IGiP9eqzVexQpdU",
    name: "parameter_devices_types",
  },
  {
    id: "CTLRT8f7g_JdInu",
    name: "parameter_devices_types_create",
  },
  {
    id: "87wf81ZZsvT6vB9",
    name: "parameter_devices_types_delete",
  },
  {
    id: "-rca8blfHY9qiYr",
    name: "parameter_devices_types_update",
  },
  {
    id: "0fTA0gldGfItcMB",
    name: "parameter_devices_types_view",
  },
  {
    id: "W_XMHY48NwaX-gf",
    name: "parameter_formulas",
  },
  {
    id: "-3KsyZXy1eef4nf",
    name: "parameter_formulas_create",
  },
  {
    id: "rDFbxsG0VJp0zve",
    name: "parameter_formulas_delete",
  },
  {
    id: "cDy5sTyf3vc3ZiY",
    name: "parameter_formulas_treshold",
  },
  {
    id: "QBbAy-gPXojPI9_",
    name: "parameter_formulas_treshold_create",
  },
  {
    id: "QFAFob1i2VcEI7o",
    name: "parameter_formulas_treshold_delete",
  },
  {
    id: "vP1-7nIiwZH1uCN",
    name: "parameter_formulas_treshold_update",
  },
  {
    id: "SO74sT2ANQ6eVo2",
    name: "parameter_formulas_treshold_view",
  },
  {
    id: "BUotK9QrOdLlqu4",
    name: "parameter_formulas_update",
  },
  {
    id: "93N1O6ZOZ28MKrf",
    name: "parameter_formulas_view",
  },
  {
    id: "dFHT8znur4cphw4",
    name: "parameter_md",
  },
  {
    id: "1Bx6nIkXjYTVWa_",
    name: "parameter_md_create",
  },
  {
    id: "ObaSgdFL7Auyu4O",
    name: "parameter_md_delete",
  },
  {
    id: "hiekah_uj_b0x5u",
    name: "parameter_md_update",
  },
  {
    id: "sGn-tPe7Y2rf8ix",
    name: "parameter_md_view",
  },
  {
    id: "2uEYqXE-P392Z97",
    name: "parameter_ports",
  },
  {
    id: "zOwlIUrHBccCZv9",
    name: "parameter_ports_create",
  },
  {
    id: "3sQZiqr7oTmmBvZ",
    name: "parameter_ports_delete",
  },
  {
    id: "qWNE6RJ2o29JEWX",
    name: "parameter_ports_tresholds",
  },
  {
    id: "TtvG2dcjnKq4RSL",
    name: "parameter_ports_tresholds_create",
  },
  {
    id: "9xNQSayw1HBZUzv",
    name: "parameter_ports_tresholds_delete",
  },
  {
    id: "RWSrtKFEE4naBx0",
    name: "parameter_ports_tresholds_update",
  },
  {
    id: "uMcC4Z3XjYXL1po",
    name: "parameter_ports_tresholds_view",
  },
  {
    id: "A_2a3I8J6VKYXCZ",
    name: "parameter_ports_update",
  },
  {
    id: "yktCYBovP16UIcE",
    name: "parameter_ports_view",
  },
  {
    id: "IPCbtGSqY9VZpBN",
    name: "parameter_rrd",
  },
  {
    id: "y7EDB-q_3_Rp7yW",
    name: "parameter_rrd_create",
  },
  {
    id: "Pl2y6k3EMSZrJve",
    name: "parameter_rrd_delete",
  },
  {
    id: "A5HiROmjGwhLwTE",
    name: "parameter_rrd_update",
  },
  {
    id: "-JaEJDoZcpCzKKx",
    name: "parameter_rrd_view",
  },
  {
    id: "wsXkwLxPLjGe8Pu",
    name: "parameter_rtu",
  },
  {
    id: "MQPOQJfZxaYruV1",
    name: "parameter_rtu_create",
  },
  {
    id: "Oj9dvcbaeBY1VI4",
    name: "parameter_rtu_delete",
  },
  {
    id: "gjfF18cHVECI2Il",
    name: "parameter_rtu_update",
  },
  {
    id: "OclcTXz4GtjzrLw",
    name: "parameter_rtu_view",
  },
  {
    id: "uq34hojUf-bMJMA",
    name: "parameter_severity",
  },
  {
    id: "7ijT1hsuQBo-amR",
    name: "parameter_severity_create",
  },
  {
    id: "ZuoPg_MTf1uoSt5",
    name: "parameter_severity_delete",
  },
  {
    id: "uJk9U34mluqOu54",
    name: "parameter_severity_update",
  },
  {
    id: "kl52VaYf-EU38F1",
    name: "parameter_severity_view",
  },
  {
    id: "kKUpubtU-YfTMTR",
    name: "parameter_tags",
  },
  {
    id: "TvOe5EW6GbNCz11",
    name: "parameter_tags_create",
  },
  {
    id: "vCfdfGRYkEg1Nw5",
    name: "parameter_tags_delete",
  },
  {
    id: "Bex56xh6G4dRQyx",
    name: "parameter_tags_update",
  },
  {
    id: "f5dM_FvL5m8h7QI",
    name: "parameter_tags_view",
  },
  {
    id: "lhz_8oDQ1JgFHRQ",
    name: "parameter_tanks",
  },
  {
    id: "qDXU8q6qTHA2TqM",
    name: "parameter_tanks_create",
  },
  {
    id: "ZfGZv7M_4RSt2x8",
    name: "parameter_tanks_delete",
  },
  {
    id: "I7nuBde9sQc3tr8",
    name: "parameter_tanks_forms",
  },
  {
    id: "1jdcmfiQejfgVI5",
    name: "parameter_tanks_forms_create",
  },
  {
    id: "5SQnyOSmG0FDVsC",
    name: "parameter_tanks_forms_delete",
  },
  {
    id: "8zS1ha2FljnqHPs",
    name: "parameter_tanks_forms_update",
  },
  {
    id: "cN_EwHBvtEPXzd8",
    name: "parameter_tanks_forms_view",
  },
  {
    id: "P4jXPY8S4sFfvs-",
    name: "parameter_tanks_update",
  },
  {
    id: "IH6yDUQVx2gdPVp",
    name: "parameter_tanks_view",
  },
  {
    id: "fFJFJiwBpnO6WsDsD-7u",
    name: "parameter_bbm_pricing",
  },
  {
    id: "e2B4i34fcg-HAFQTlLey",
    name: "parameter_ip_rectifier",
  },
  {
    id: "fQrGShObNQJ6PKIcK74g",
    name: "region_lokasi",
  },
  {
    id: "z4c0HKjapPzwsUclsbI7",
    name: "region_nasional",
  },
  {
    id: "ZhVNlLvfA5kHPWbgoz7u",
    name: "region_regional",
  },
  {
    id: "Vxghh0TxW70A6hDiNk2T",
    name: "region_witel",
  },
  {
    id: "aspJ9d7VKUcbrIT33UKz",
    name: "reporting",
  },
  {
    id: "mMQLVadeImkOokI_NXCQ",
    name: "reporting_availability_rtu",
  },
  {
    id: "IR-L6CRgD7cYXxdZTsKI",
    name: "reporting_detail_alarm",
  },
  {
    id: "DkgP4GOKrXbd4ma-8Kxc",
    name: "reporting_summary_alarm",
  },
];

export default rolePermissions;
