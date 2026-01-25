function sanitize(input) {
    // 1. Return early if not a 'truthy' object (handles null, strings, numbers, etc.)
    if (typeof input !== "object" || input === null) {
        return input;
    }

    // 2. Handle Arrays specifically to maintain their structure
    if (Array.isArray(input)) {
        return input.map((item) => sanitize(item));
    }

    // 3. Handle Objects
    for (const key of Object.keys(input)) {
        if (key.startsWith("$") || key.includes(".")) {
            delete input[key];
        } else {
            // Recursively sanitize the value
            input[key] = sanitize(input[key]);
        }
    }

    return input;
}

// Test case
let input = {
    a: "hello",
    b: {
        b1: "hello",
        $badKey: "remove me",
        "bad.key": "remove me too",
        b2: {
            hack: "$.123", // This stays (it's a value, not a key)
        },
    },
};

console.log(sanitize(input));
