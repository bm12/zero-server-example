module.exports = async function weatherHandler(req, res) {
  const lang = req.params[0] || 'en';
  const resp = await fetch(`https://api.darksky.net/forecast/bc2ed98b03d767bd31aaa3bbbc84ad35/55.751244,37.618423?lang=${lang}`);
  const result = await resp.json();

  res.json(result.daily);
};
