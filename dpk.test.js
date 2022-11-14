const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  const VALID_HASH = "1a9a9f9590fe8752d683774f42a0c07941fd30fb1932e29b7c6f883057bd78062a2118327b25a36fe0b0e223b242c8e2e19ebd1fdfdbd882e537035104887ee4";
  const INVALID_HASH = "1".repeat(300);

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns a valid sha3-512 hex hashed key when giving a pathfrase ", () => {
    const trivialKey = deterministicPartitionKey("KEY");
    expect(trivialKey).not.toBe("0");
    let pattern = /^[0-9a-fA-F]{128}$/;
    expect(pattern.test(trivialKey)).toBe(true);
  });

  it("Returns the same hash if given a valid hash through the partition Key ", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: VALID_HASH });
    expect(trivialKey).toBe(VALID_HASH);
  });

  it("Returns a valid hash if given an invalid hash through the partition Key", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: INVALID_HASH });
    let pattern = /^[0-9a-fA-F]{128}$/;
    expect(pattern.test(trivialKey)).toBe(true);
  });

});
