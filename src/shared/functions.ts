export function isPasswordValid(pass: string): boolean {
  return process.env.PASSWORD == pass;
}

export function getFrameworkStatus(): string {
  if (GetResourceState("qb-core") !== "missing") {
    return "QB-Core";
  } else if (GetResourceState("es_extended") !== "missing") {
    return "ESX";
  } else if (GetResourceState("vRP") !== "missing") {
    return "vRP";
  } else {
    return "Standalone";
  }
}

export function getOnesyncStatus(): string {
  const status = GetConvar("onesync_enabled", "unknown");
  if (status == "true") {
    return "Onesync Infinity";
  } else if (status == "legacy") {
    return "Onesync Legacy";
  } else {
    return "None";
  }
}

export function getSQLScript(): string {
  if (GetResourceState("oxmysql") == "started") {
    return "OX-Mysql";
  } else if (GetResourceState("ghmattimysql") == "started") {
    return "Ghmattimysql";
  } else if (GetResourceState("mysql-async") == "started") {
    return "MySQL-Async";
  } else {
    return "Unknown";
  }
}
