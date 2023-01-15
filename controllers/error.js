const get404 = (req, res, next) => {
  res.status(404).render("404", { pageTitle: "PAGE NOT FOUND", path: "" });
};

module.exports = {
  get404,
};
