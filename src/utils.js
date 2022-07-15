function sleep(dur) {
  return new Promise((resolve) => setTimeout(resolve, dur));
}

module.exports = {
  sleep,
};
