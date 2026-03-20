export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body || "{}");

    const lat = body.lat ?? null;
    const lon = body.lon ?? null;

    const logEntry = {
      lat,
      lon,
      receivedAt: Date.now(),
      raw: body,
      flags: []
    };

    if (!lat || !lon) {
      logEntry.flags.push("missing_coords");
    }

    if (lat === 0 && lon === 0) {
      logEntry.flags.push("zero_coords");
    }

    if (typeof lat !== "number" || typeof lon !== "number") {
      logEntry.flags.push("invalid_type");
    }

    console.log("EVENT LOG:", JSON.stringify(logEntry));

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        log: logEntry
      })
    };

  } catch (err) {
    console.error("SYSTEM ERROR:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    };
  }
}
