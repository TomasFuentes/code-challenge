const crypto = require("crypto");

function encodeData(data){
  const parsedData = JSON.stringify(data)
  return crypto.createHash("sha3-512").update(parsedData).digest("hex");
}

function isNotValidEncondig(data) {
  const MAX_PARTITION_KEY_LENGTH = 256;
  if (typeof data !== "string") return;
  return data.length > MAX_PARTITION_KEY_LENGTH;

}

function parsePartitionKey(partitionKey){
  return typeof partitionKey === "string" ?  partitionKey  : JSON.stringify(partitionKey);
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  let candidate;

  if (event) {
    candidate = event.partitionKey ? parsePartitionKey(event.partitionKey) : encodeData(event);

  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  if (isNotValidEncondig(candidate)) {
    candidate = encodeData(candidate);
  }
  return candidate;
};
